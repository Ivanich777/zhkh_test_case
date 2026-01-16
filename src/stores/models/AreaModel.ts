import { Instance } from 'mobx-state-tree';
import { types } from 'mobx-state-tree';
import { IArea } from 'types/area.types.ts';

export const AreaModel = types.model('Area', {
  id: types.string,
  fullAddress: types.string,
});

export const createAreaModel = (area: IArea) => {
  return AreaModel.create(area);
};

export type AreaModelType = Instance<typeof AreaModel>;
