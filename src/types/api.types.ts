export interface Meter {
  id: string;
  _type: string[];
  area: {
    id: string;
  };
  is_automatic: boolean;
  communication: string;
  description: string;
  serial_number: string;
  installation_date: string;
  brand_name: string | null;
  model_name: string | null;
  initial_values: number[];
}

export interface MetersResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Meter[];
}

export interface Area {
  id: string;
  number: number;
  str_number: string;
  str_number_full: string;
  house: {
    address: string;
    id: string;
    fias_addrobjs: string[];
  };
}

export interface AreasResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Area[];
}
