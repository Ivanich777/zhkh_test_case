import { IMeter } from 'types/meter.types.ts';
import { MetersResponse } from 'types/api.types.ts';
import { meterToApp } from 'utils';
import { apiClient } from 'services/api.ts';

export const metersService = {
  async getMeters(
    limit: number = 20,
    offset: number = 0
  ): Promise<{
    count: number;
    next: string | null;
    previous: string | null;
    results: IMeter[];
  }> {
    const response = await apiClient.get<MetersResponse>('/meters/', {
      params: {
        limit,
        offset,
      },
    });

    return {
      count: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
      results: response.data.results.map((meter) => meterToApp(meter)),
    };
  },

  async deleteMeter(id: string) {
    await apiClient.delete(`/meters/${id}`);
  },
};
