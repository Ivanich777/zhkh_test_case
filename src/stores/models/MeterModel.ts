import { types } from 'mobx-state-tree';
import { EMeter, IMeter } from 'types/meter.types.ts';

export const MeterModel = types
  .model('Meter', {
    id: types.string,
    type: types.enumeration('EMeter', Object.values(EMeter)),
    installationDate: types.string,
    isAutomatic: types.boolean,
    initialValues: types.number,
    areaId: types.string,
    description: types.string,
  })
  .views((self) => ({
    get typeLabel() {
      return self.type === EMeter.ColdWater ? 'ХВС' : 'ГВС';
    },
  }));

export const createMeterModel = (meter: IMeter) => {
  return MeterModel.create(meter);
};
