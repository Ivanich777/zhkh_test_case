import { RootStoreType } from 'stores/RootStore.ts';

interface IUsePagination {
  goToPage: (page: number) => void;
  getPages: () => (number | 'dots')[];
  totalPages: number;
  currentPage: number;
}

export const usePagination = (store: RootStoreType): IUsePagination => {
  const totalPages = Math.ceil(store.count / store.limit);

  const currentPage = Math.floor(store.offset / store.limit) + 1;

  const goToPage = (page: number) => {
    store.goToPage(page);
  };

  const getPages = () => {
    const pages: (number | 'dots')[] = [];

    const total = totalPages;
    const current = currentPage;

    const push = (p: number | 'dots') => pages.push(p);

    push(1);

    if (current > 3) push('dots');

    for (let i = current - 1; i <= current + 1; i++) {
      if (i > 1 && i < total) push(i);
    }

    if (current < total - 2) push('dots');

    if (total > 1) push(total);

    return Array.from(new Set(pages));
  };

  return {
    goToPage,
    getPages,
    totalPages,
    currentPage,
  };
};
