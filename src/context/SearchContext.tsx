import { createContext, useState, ReactNode } from 'react';
import { ISearchContext } from '../types';

export const SearchContext = createContext<ISearchContext | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState('');

  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
}
