import { SearchResultType } from '@aui/api';

export type SearchResultItem = {
  id: string;
  itemId: string;
  type: SearchResultType;
  url: string;
  labelHtml: string | null;
  subLabelHtml?: string | null;
};
