import { createContext } from 'react';
import { RootStoreType } from './RootStore';

export const StoreContext = createContext<RootStoreType | null>(null);

export type { RootStoreType };
