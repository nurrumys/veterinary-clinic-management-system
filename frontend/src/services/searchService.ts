import api from "./api";

import type { SearchResponse } from "../types/search";

export const search = async (
  query: string
): Promise<SearchResponse> => {
  const response = await api.get<SearchResponse>(
    "/search",
    {
      params: {
        q: query,
      },
    }
  );

  return response.data;
};