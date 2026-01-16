import { types, flow, Instance, applySnapshot } from 'mobx-state-tree';

import { MeterModel, createMeterModel } from './models/MeterModel';
import { AreaModel, createAreaModel } from './models/AreaModel';

import { areasService } from 'services/areasService';
import { metersService } from 'services/metersService';

import { IArea } from 'types/area.types';
import { IMeter } from 'types/meter.types';

export const RootStore = types
  .model('RootStore', {
    meters: types.array(MeterModel),
    areas: types.map(AreaModel),

    offset: types.optional(types.number, 0),
    limit: types.optional(types.number, 20),
    count: types.optional(types.number, 0),

    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })

  .views((self) => ({
    get hasMore() {
      return self.meters.length < self.count;
    },

    get totalPages() {
      return Math.ceil(self.count / self.limit);
    },

    get currentPage() {
      return Math.floor(self.offset / self.limit) + 1;
    },

    getAreaById(id: string) {
      return self.areas.get(id);
    },
  }))

  .actions((self) => {
    const setLoading = (loading: boolean) => {
      self.isLoading = loading;
    };

    const setError = (error: string | null) => {
      self.error = error;
    };

    const fetchAreas = flow(function* (ids: string[]) {
      const missingIds = ids.filter((id) => !self.areas.has(id));

      if (!missingIds.length) return;

      try {
        const areas = yield areasService.getAreas(missingIds);

        areas.forEach((area: IArea) => {
          self.areas.set(area.id, createAreaModel(area));
        });
      } catch (error) {
        console.error('Ошибка загрузки адресов:', error);
      }
    });

    const fetchMeters = flow(function* (
      offset: number = 0,
      mode: 'replace' | 'append' = 'replace'
    ) {
      setLoading(true);
      setError(null);

      try {
        const response = yield metersService.getMeters(self.limit, offset);

        const newMeters = response.results.map((meter: IMeter) =>
          createMeterModel(meter)
        );

        if (mode === 'replace') {
          applySnapshot(self.meters, newMeters);
        } else {
          self.meters.push(...newMeters);
        }

        self.offset = offset;
        self.count = response.count;

        const areaIds: string[] = Array.from(
          new Set(response.results.map((m: IMeter) => m.areaId))
        );

        if (areaIds.length > 0) {
          fetchAreas(areaIds);
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);

        setError(message || 'Ошибка загрузки счетчиков');
      } finally {
        setLoading(false);
      }
    });

    const loadNextPage = flow(function* () {
      if (self.isLoading || !self.hasMore) return;

      const nextOffset = self.offset + self.limit;

      yield fetchMeters(nextOffset, 'append');
    });

    const goToPage = flow(function* (page: number) {
      const newOffset = (page - 1) * self.limit;

      yield fetchMeters(newOffset, 'replace');
    });

    const deleteMeter = flow(function* (id: string) {
      try {
        yield metersService.deleteMeter(id);

        const index = self.meters.findIndex((m) => m.id === id);

        if (index !== -1) {
          self.meters.splice(index, 1);
          self.count -= 1;
        }

        if (self.meters.length < self.offset + self.limit && self.hasMore) {
          yield loadNextPage();
        }
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);

        setError(message || 'Ошибка удаления счетчика');
        throw error;
      }
    });

    return {
      setLoading,
      setError,
      fetchAreas,
      fetchMeters,
      loadNextPage,
      goToPage,
      deleteMeter,
    };
  });

export type RootStoreType = Instance<typeof RootStore>;

export const createRootStore = () =>
  RootStore.create({
    meters: [],
    areas: {},
    offset: 0,
    limit: 20,
    count: 0,
    isLoading: false,
    error: null,
  });
