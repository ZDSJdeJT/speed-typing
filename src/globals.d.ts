type Theme = 'dark' | 'light' | 'system';

type Pagination = {
  page: number;
  pageSize: number;
};

type PaginationResult<T> = {
  rows: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};
