export enum EMeter {
  ColdWater = 'ColdWaterAreaMeter',
  HotWater = 'HotWaterAreaMeter',
}

export interface IMeter {
  id: string;
  type: EMeter;
  installationDate: string;
  isAutomatic: boolean;
  initialValues: number;
  areaId: string;
  description: string;
}
