import { fetchSearchIndex } from "@/shared/api/repositories";

import type { SearchItem } from "../model";

export async function getSearchItems(): Promise<SearchItem[]> {
  return fetchSearchIndex();
}
