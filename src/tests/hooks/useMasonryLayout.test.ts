import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import useMasonryLayout from '../../hooks/useMasonryLayout';
import { IPhoto } from '../../types';
import { calculateMasonryLayout, getColumnCount } from '../../utils/masonryUtils';

vi.mock('../../utils/masonryUtils', () => ({
  getColumnCount: vi.fn(),
  calculateMasonryLayout: vi.fn()
}));

describe('useMasonryLayout', () => {
  const photos: IPhoto[] = [
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

  const containerRef = { current: { clientWidth: 1200 } } as React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should calculate masonry layout correctly', () => {
    const mockedGetColumnCount = vi.fn().mockReturnValue(3);
    const mockedCalculateMasonryLayout = vi.fn().mockReturnValue({
      columns: [[{ ...photos[0], top: 0, left: 0, renderedHeight: 200 }]],
      totalHeight: 200
    });

    vi.mocked(getColumnCount).mockImplementation(mockedGetColumnCount);
    vi.mocked(calculateMasonryLayout).mockImplementation(mockedCalculateMasonryLayout);

    const { result } = renderHook(() =>
      useMasonryLayout({
        photos,
        containerRef
      })
    );

    expect(result.current.columns).toEqual([
      [{ ...photos[0], top: 0, left: 0, renderedHeight: 200 }]
    ]);
    expect(result.current.totalHeight).toBe(200);
    expect(result.current.containerWidth).toBe(1200);
    expect(mockedGetColumnCount).toHaveBeenCalledWith(1200);
    expect(mockedCalculateMasonryLayout).toHaveBeenCalledWith({
      photos,
      containerWidth: 1200,
      columnCount: 3
    });
  });

  it('should handle container resizing', async () => {
    const mockedGetColumnCount = vi.fn().mockReturnValue(4);
    const mockedCalculateMasonryLayout = vi.fn().mockReturnValue({
      columns: [[{ ...photos[0], top: 0, left: 0, renderedHeight: 250 }]],
      totalHeight: 250
    });

    vi.mocked(getColumnCount).mockImplementation(mockedGetColumnCount);
    vi.mocked(calculateMasonryLayout).mockImplementation(mockedCalculateMasonryLayout);

    const { result } = renderHook(() =>
      useMasonryLayout({
        photos,
        containerRef
      })
    );

    act(() => {
      containerRef.current = { ...containerRef.current, clientWidth: 800 } as HTMLDivElement;
      window.dispatchEvent(new Event('resize'));
    });

    expect(mockedGetColumnCount).toHaveBeenCalledWith(800);
    expect(mockedCalculateMasonryLayout).toHaveBeenCalledWith({
      photos,
      containerWidth: 800,
      columnCount: 4
    });
    expect(result.current.containerWidth).toBe(800);
  });

  it('should not call layout calculation if photos array is empty', () => {
    const mockedGetColumnCount = vi.fn().mockReturnValue(3);
    const mockedCalculateMasonryLayout = vi.fn().mockReturnValue({
      columns: [],
      totalHeight: 0
    });

    vi.mocked(getColumnCount).mockImplementation(mockedGetColumnCount);
    vi.mocked(calculateMasonryLayout).mockImplementation(mockedCalculateMasonryLayout);

    const containerRef = { current: { clientWidth: 1200 } } as React.RefObject<HTMLDivElement>;

    const { result } = renderHook(() =>
      useMasonryLayout({
        photos: [],
        containerRef
      })
    );

    expect(result.current.containerWidth).toBe(1200);
    expect(mockedCalculateMasonryLayout).not.toHaveBeenCalled();
  });
});
