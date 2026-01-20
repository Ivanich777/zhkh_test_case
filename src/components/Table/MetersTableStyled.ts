import styled from 'styled-components';

const COLUMNS = '60px 160px 180px 200px 270px 400px 100px';

export const Layout = styled.div`
  width: 80vw;
  height: 90vh;
  border: 1px solid #e0e5eb;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Body = styled.div`
  flex: 1;
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
  white-space: nowrap;
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-size: 13px;
  line-height: 16px;
  color: #697180;
`;

export const DeleteButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  height: 40px;
  width: 40px;
  transform: translateY(-50%);

  background: none;
  border: none;
  cursor: pointer;

  opacity: 0;
  transition: opacity 0.15s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
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

  &:hover .delete-btn {
    opacity: 1;
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
