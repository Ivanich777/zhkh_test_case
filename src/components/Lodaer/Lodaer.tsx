import React from 'react';
import { LoaderWrapper, Spinner } from 'components/Lodaer/Loader.styled.tsx';

export const Loader: React.FC = () => (
  <LoaderWrapper>
    <Spinner />
  </LoaderWrapper>
);
