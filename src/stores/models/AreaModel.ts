import { types } from 'mobx-state-tree';
import { IArea } from 'types/area.types';

export const AreaModel = types.model('Area', {
  id: types.string,
  fullAddress: types.string,
});

export const createAreaModel = (area: IArea) => AreaModel.create(area);
