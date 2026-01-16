import { apiClient } from './api';
import { areaToApp } from 'utils';
import { AreasResponse } from 'types/api.types.ts';
import { IArea } from 'types/area.types.ts';

export const areasService = {
  async getAreas(ids: string[]): Promise<IArea[]> {
    if (ids.length === 0) {
      return [];
    }

    const response = await apiClient.get<AreasResponse>('/areas/', {
      params: {
        /* TODO
            Здесь надо подумать как инклюдить только уникальные адреса, мб чере з сет коллекцию
            */
        id__in: ids.join(','),
      },
    });

    return response.data.results.map((area) => areaToApp(area));
  },
};
