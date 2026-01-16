import { ReactNode } from 'react';
import { createRootStore } from 'stores/RootStore.ts';
import { StoreContext } from 'stores/storeContext.tsx';

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const store = createRootStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
