import { useContext } from 'react';
import { ISearchContext } from '../types';
import { SearchContext } from '../context/SearchContext';

export default function useSearch(): ISearchContext {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }

  return context;
}
