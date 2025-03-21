import { render, screen, act } from '@testing-library/react';
import { SearchProvider, SearchContext } from '../../context/SearchContext';
import { useContext } from 'react';

describe('SearchContext', () => {
  const TestComponent = () => {
    const context = useContext(SearchContext);

    if (!context) {
      return <div>Error: Context not found</div>;
    }

    return (
      <div>
        <p>Query: {context.query}</p>
        <button onClick={() => context.setQuery('new query')}>Change Query</button>
      </div>
    );
  };

  test('should provide initial context values', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    expect(screen.getByText(/Query:/)).toHaveTextContent('Query:');
  });

  test('should update context value when setQuery is called', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const button = screen.getByText('Change Query');
    act(() => {
      button.click();
    });

    expect(screen.getByText(/Query:/)).toHaveTextContent('Query: new query');
  });

  test('should handle missing context', () => {
    render(<TestComponent />);
    expect(screen.getByText('Error: Context not found')).toBeInTheDocument();
  });
});
