import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SearchProvider } from '../../context/SearchContext'; 
import Search from '../../view/Components/Header/Search'; 
import { SearchContext } from '../../context/SearchContext';

vi.mock('lodash.debounce', () => {
  return {
    default: (fn: Function) => {
      const debouncedFn = (...args: any) => fn(...args);
      debouncedFn.cancel = vi.fn(); 
      return debouncedFn;
    }
  };
});

describe('Search Component', () => {
  test('should render the search input and icon', () => {
    render(
      <SearchProvider>
        <Search />
      </SearchProvider>
    );

    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
  });

  test('should update input value on change', () => {
    render(
      <SearchProvider>
        <Search />
      </SearchProvider>
    );

    const input = screen.getByPlaceholderText('Search…');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input).toHaveValue('test');
  });

  test('should call setQuery after debounce when input changes', async () => {
    const setQuerySpy = vi.fn();

    render(
      <SearchContext.Provider value={{ query: '', setQuery: setQuerySpy }}>
        <Search />
      </SearchContext.Provider>
    );

    const input = screen.getByPlaceholderText('Search…');
    
    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(setQuerySpy).toHaveBeenCalledWith('test'));
  });
});
