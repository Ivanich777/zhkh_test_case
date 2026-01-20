import styled from 'styled-components';

const COLUMNS = '60px 160px 0.8fr 200px 80px 120px 200px';

export const Layout = styled.div`
  width: 80vw;
  height: 90vh;
  border: 1px solid #e0e5eb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: ${COLUMNS};
  height: 36px;
  align-items: center;
  background: #f7f8f9;
  border-bottom: 1px solid #e0e5eb;
  flex-shrink: 0;
`;

export const Th = styled.div`
  padding: 6px 12px;
  font-weight: 500;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: ${COLUMNS};
  height: 52px;
  align-items: center;
  border-bottom: 1px solid #e0e5eb;

  &:hover {
    background: #f7f8f9;
  }
`;

export const Td = styled.div`
  padding: 6px 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Footer = styled.div`
  padding: 8px 12px;
  border-top: 1px solid #e0e5eb;
`;
