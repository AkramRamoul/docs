import { parseAsString, useQueryState } from "nuqs";

export function useSearch(key: string) {
  return useQueryState(
    key,
    parseAsString.withDefault("").withOptions({
      clearOnDefault: true,
    })
  );
}
