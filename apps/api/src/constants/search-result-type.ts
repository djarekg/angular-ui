export const SearchResultType = {
  user: 1,
  customer: 2,
  customerContact: 3,
} as const;

export type SearchResultType = (typeof SearchResultType)[keyof typeof SearchResultType];
