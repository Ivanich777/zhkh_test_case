import { apiClient } from './api';
import { areaToApp } from 'utils';
import { AreasResponse } from 'types/api.types.ts';
import { IArea } from 'types/area.types.ts';

export const areasService = {
  async getAreas(ids: string[]): Promise<IArea[]> {
    if (ids.length === 0) {
      return [];
    }

    /** Todo
     * ПОДУМАТЬ НАД ОПТИМИЗАЦИЕЙ!!!
     * */

    const response = await apiClient.get<AreasResponse>('/areas/', {
      params: {
        id__in: ids,
      },
      paramsSerializer: {
        indexes: null,
      },
    });

    return response.data.results.map((area) => areaToApp(area));
  },
};
