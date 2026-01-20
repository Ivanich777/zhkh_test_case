import React from 'react';
import { observer } from 'mobx-react-lite';
import { RootStoreType } from 'stores/RootStore';

import { Wrapper, PageButton, Dots } from './Pagination.styled';
import { usePagination } from 'hooks/usePagination.tsx';

interface IPaginationProps {
  store: RootStoreType;
}

export const Pagination: React.FC<IPaginationProps> = observer(({ store }) => {
  const { getPages, goToPage, currentPage, totalPages } = usePagination(store);
  if (totalPages <= 1) return null;

  return (
    <Wrapper>
      {getPages().map((p, i) =>
        p === 'dots' ? (
          <Dots key={`dots-${i}`}>...</Dots>
        ) : (
          <PageButton
            key={`page-${p}`}
            $active={p === currentPage}
            onClick={() => goToPage(p)}
          >
            {p}
          </PageButton>
        )
      )}
    </Wrapper>
  );
});
