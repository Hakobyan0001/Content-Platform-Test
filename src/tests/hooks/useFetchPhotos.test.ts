import { renderHook, waitFor } from '@testing-library/react';
import { useFetchPhotos } from '../../hooks';
import { IPhoto } from '../../types';

describe('useFetchPhotos', () => {
  const setPhotos = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch photos from Unsplash when a query is provided', async () => {
    renderHook(() =>
      useFetchPhotos({
        setPhotos,
        query: 'nature',
        page: 1
      })
    );

    await waitFor(() => expect(setPhotos).toHaveBeenCalledTimes(1));

    const newPhotos: IPhoto[] = [
      {
        id: '2',
        src: { medium: 'url-small', large: 'url-regular' },
        alt: 'alt description',
        title: '',
        dateTaken: '2023-01-01',
        photographer: 'Unsplash User',
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        renderedHeight: 0
      }
    ];

    expect(setPhotos).toHaveBeenCalledWith(expect.any(Function));
    const setPhotosCall = setPhotos.mock.calls[0][0];
    const prevPhotos: IPhoto[] = [];
    const updatedPhotos = setPhotosCall(prevPhotos);
    expect(updatedPhotos).toEqual(newPhotos);
  });

  it('should fetch photos from Pexels when no query is provided', async () => {
    renderHook(() =>
      useFetchPhotos({
        setPhotos,
        query: '',
        page: 1
      })
    );

    await waitFor(() => expect(setPhotos).toHaveBeenCalledTimes(1));

    const newPhotos: IPhoto[] = [
      {
        id: 1,
        src: { medium: 'url-small', large: 'url-regular' },
        alt: 'alt description',
        title: '',
        dateTaken: '',
        photographer: 'Pexels User',
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        renderedHeight: 0
      }
    ];

    expect(setPhotos).toHaveBeenCalledWith(expect.any(Function));
    const setPhotosCall = setPhotos.mock.calls[0][0];
    const prevPhotos: IPhoto[] = [];
    const updatedPhotos = setPhotosCall(prevPhotos);

    expect(updatedPhotos).toEqual(newPhotos);
  });
});
