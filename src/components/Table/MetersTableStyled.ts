import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 80vw;
  height: 80vh;

  border: 1px solid #e0e5eb;
  border-radius: 12px;

  overflow: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead``;

export const Th = styled.th`
  text-align: left;
  padding: 6px 12px;
  font-weight: 500;
`;

export const HeaderRow = styled.tr`
  height: 52px;
  border-bottom: 1px solid #e0e5eb;
`;

export const Tr = styled.tr<{ selected?: boolean }>`
  height: 52px;
  border-bottom: 1px solid #e0e5eb;

  background: ${({ selected }) => (selected ? '#F7F8F9' : '#ffffff')};

  cursor: pointer;

  &:hover {
    background: #f7f8f9;
  }
`;

export const Td = styled.td`
  padding: 6px 12px;
`;
