import { types } from 'mobx-state-tree';
import { MeterModel } from './models/MeterModel';
import { AreaModel } from './models/AreaModel';

export const RootStore = types
  .model('RootStore', {
    meters: types.array(MeterModel),
    areas: types.map(AreaModel),
    offset: types.optional(types.number, 0),
    limit: types.optional(types.number, 20),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string),
  })

  .views((self) => ({
    get displayedMeters() {
      return self.meters.slice(0, self.limit);
    },
    get hasMore() {
      return self.meters.length >= self.limit;
    },
    getAreaById(id: string) {
      return self.areas.get(id);
    },
  }))

  .actions((self) => ({
    setLoading(loading: boolean) {
      self.isLoading = loading;
    },
    setError(error: string | null) {
      self.error = error;
    },
  }));

export type RootStoreType = typeof RootStore.Type;

export const createRootStore = () => {
  return RootStore.create({
    meters: [],
    areas: {},
    offset: 0,
    limit: 20,
    isLoading: false,
    error: null,
  });
};
