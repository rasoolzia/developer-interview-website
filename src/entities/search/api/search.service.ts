import { cachedRequest, cacheKeys } from "@/shared/api/cache";
import { searchRepository } from "@/shared/api/repositories";

import type { SearchItem } from "../model";

export async function getSearchItems(): Promise<SearchItem[]> {
  return cachedRequest(cacheKeys.searchIndex(), () =>
    searchRepository.getSearchIndex(),
  );
}
