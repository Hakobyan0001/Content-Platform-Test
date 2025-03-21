import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('lodash.debounce', () => {
  return {
    default: (fn: Function) => {
      const debouncedFn = (...args: any) => fn(...args);
      debouncedFn.cancel = vi.fn();
      return debouncedFn;
    }
  };
});

vi.mock('pexels', () => ({
  createClient: vi.fn(() => ({
    photos: {
      curated: vi.fn().mockResolvedValue({
        photos: [
          {
            id: 1,
            src: { medium: 'url-small', large: 'url-regular' },
            alt: 'alt description',
            photographer: 'Pexels User',
            width: 0,
            top: 0,
            left: 0,
            renderedHeight: 0,
            height: 0
          }
        ]
      })
    }
  }))
}));

vi.mock('unsplash-js', () => ({
  createApi: vi.fn(() => ({
    search: {
      getPhotos: vi.fn().mockResolvedValue({
        type: 'success',
        response: {
          results: [
            {
              id: '2',
              urls: { small: 'url-small', regular: 'url-regular' },
              alt_description: 'alt description',
              created_at: '2023-01-01',
              user: { name: 'Unsplash User' },
              width: 0,
              height: 0,
              top: 0,
              left: 0,
              renderedHeight: 0
            }
          ]
        }
      })
    }
  }))
}));
