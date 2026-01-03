export type ParsedSearch = {
  label: string;
  queryText?: string;
  searchUrl?: string;
  isUrl: boolean;
};

const normalizeLabel = (label: string) =>
  label
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function parseSearchInput(input: string): ParsedSearch {
  const value = input.trim();

  try {
    const parsedUrl = new URL(value);
    const isMl = parsedUrl.hostname.includes("mercadolibre");
    if (isMl) {
      const queryParam = parsedUrl.searchParams.get("q") || parsedUrl.searchParams.get("query");
      const pathLabel = parsedUrl.pathname
        .split("/")
        .filter(Boolean)
        .pop();
      const label = normalizeLabel(queryParam || pathLabel || parsedUrl.hostname);
      return {
        label: label || "Mercado Libre",
        searchUrl: value,
        isUrl: true,
      };
    }
  } catch (error) {
    // Not a URL, continue
  }

  return {
    label: normalizeLabel(value),
    queryText: value,
    isUrl: false,
  };
}
