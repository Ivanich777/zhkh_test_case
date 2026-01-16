import { useContext } from 'react';
import { StoreContext, RootStoreType } from './storeContext.tsx';

export const useStore = (): RootStoreType => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('context err');
  }

  return store;
};
