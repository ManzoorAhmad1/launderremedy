import { Fetch } from '@/utils/fetchWrapper';

const areaService = {
  _PREFIX: '/area/v1',

  async getAllAreas(activeOnly = false) {
    try {
      const url = activeOnly
        ? `${this._PREFIX}/get-all-areas?active=true`
        : `${this._PREFIX}/get-all-areas`;
      const res = await Fetch.get(url);
      if (res.code === 200) return res;
      throw new Error(res.message ?? 'Failed to get areas');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  async createArea(payload: {
    name: string;
    city: string;
    postcode_prefix?: string;
    description?: string;
    is_active?: boolean;
  }) {
    try {
      const res = await Fetch.post(`${this._PREFIX}/create-area`, payload);
      if (res.code === 201) return res;
      throw new Error(res.message ?? 'Failed to create area');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  async updateArea(
    id: string,
    payload: {
      name?: string;
      city?: string;
      postcode_prefix?: string;
      description?: string;
      is_active?: boolean;
    }
  ) {
    try {
      const res = await Fetch.patch(`${this._PREFIX}/update-area/${id}`, payload);
      if (res.code === 200) return res;
      throw new Error(res.message ?? 'Failed to update area');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },

  async deleteArea(id: string) {
    try {
      const res = await Fetch.delete(`${this._PREFIX}/delete-area/${id}`);
      if (res.code === 200) return res;
      throw new Error(res.message ?? 'Failed to delete area');
    } catch (error: any) {
      throw new Error(error.message ?? 'Something went wrong');
    }
  },
};

export default areaService;
