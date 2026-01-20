import { types, flow, Instance, applySnapshot } from 'mobx-state-tree';
import { MeterModel, createMeterModel } from './models/MeterModel';
import { AreaModel, createAreaModel } from './models/AreaModel';
import { metersService } from 'services/metersService';
import { areasService } from 'services/areasService';
import { IMeter } from 'types/meter.types';
import { IArea } from 'types/area.types';
import { getErrorMessage } from 'utils';

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
    get totalPages() {
      return Math.ceil(self.count / self.limit);
    },
    get currentPage() {
      return Math.floor(self.offset / self.limit) + 1;
    },
    getAreaById(id: string | null) {
      if (!id) return undefined;
      return self.areas.get(id);
    },
  }))
  .actions((self) => {
    const setLoading = (v: boolean) => (self.isLoading = v);
    const setError = (v: string | null) => (self.error = v);

    const fetchAreas = flow(function* (ids: string[]) {
      const missing = ids.filter((id) => !self.areas.has(id));
      if (!missing.length) return;

      try {
        const areas: IArea[] = yield areasService.getAreas(missing);
        areas.forEach((area) => self.areas.set(area.id, createAreaModel(area)));
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        setError(errorMessage);
      }
    });

    const fetchMeters = flow(function* (offsetForPage: number) {
      try {
        setLoading(true);
        setError(null);

        const response = yield metersService.getMeters(
          self.limit,
          offsetForPage
        );
        const meters = response.results.map(createMeterModel);

        applySnapshot(self.meters, meters);
        self.offset = offsetForPage;
        self.count = response.count;

        const areaIds: string[] = Array.from(
          new Set(response.results.map((m: IMeter) => m.areaId).filter(Boolean))
        );
        yield fetchAreas(areaIds);
      } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    });

    const goToPage = (page: number) => {
      const offset = (page - 1) * self.limit;
      fetchMeters(offset);
    };

    const deleteMeter = flow(function* (id: string) {
      try {
        yield metersService.deleteMeter(id);

        yield fetchMeters(self.offset);
      } catch (e) {
        const errorMessage = getErrorMessage(e);
        setError(errorMessage);
      }
    });

    return { fetchMeters, goToPage, fetchAreas, deleteMeter };
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
