export enum EMeter {
  ColdWater = 'ColdWaterAreaMeter',
  HotWater = 'HotWaterAreaMeter',
}

export interface IMeter {
  id: string;
  type: EMeter;
  installationDate: string;
  isAutomatic: boolean | null;
  initialValues: number;
  areaId: string;
  description: string;
}
