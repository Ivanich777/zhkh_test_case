export enum EMeter {
  ColdWater = 'ColdWaterAreaMeter',
  HotWater = 'HotWaterAreaMeter',
}

export interface IMeter {
  id: number;
  type: EMeter;
  installation_date: string; // ISO date string
  is_automatic: boolean;
  initial_values: number;
  area_id: number | null;
  description: string | null;
}
