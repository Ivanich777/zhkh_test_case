import type { Area, Meter } from 'types/api.types.ts';
import type { IArea } from 'types/area.types.ts';
import { EMeter, IMeter } from 'types/meter.types.ts';
import coldIcon from '/assets/icons/HVS.svg';
import hotIcon from '/assets/icons/GVS.svg';

export const areaToApp = (areaApi: Area): IArea => {
  return {
    id: areaApi.id,
    fullAddress: `${areaApi.house.address}, ${areaApi.str_number_full}`,
  };
};

export const getMeterType = (type: string[]): EMeter => {
  if (type.includes('HotWaterAreaMeter')) {
    return EMeter.HotWater;
  } else return EMeter.ColdWater;
};

export const meterToApp = (meterApi: Meter): IMeter => {
  const type = getMeterType(meterApi._type);

  return {
    id: meterApi.id,
    type,
    installationDate: meterApi.installation_date,
    isAutomatic: meterApi.is_automatic ?? true,
    initialValues:
      meterApi.initial_values.length > 0 ? meterApi.initial_values[0] : 0,
    areaId: meterApi.area?.id,
    description: meterApi.description,
  };
};

export const getMeterIcon = (type: string) => {
  switch (type) {
    case 'ColdWaterAreaMeter':
      return coldIcon;

    case 'HotWaterAreaMeter':
      return hotIcon;

    default:
      return null;
  }
};
