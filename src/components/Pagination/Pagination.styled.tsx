import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  margin-top: 12px;
  padding: 0 4px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  min-width: 32px;
  height: 32px;

  border-radius: 8px;
  border: 1px solid #e0e5eb;

  background: ${({ $active }) => ($active ? '#F7F8F9' : '#ffffff')};

  cursor: pointer;

  &:hover {
    background: #f7f8f9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const Dots = styled.span`
  padding: 0 4px;
`;
