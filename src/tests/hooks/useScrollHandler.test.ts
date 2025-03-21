import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useScrollHandler } from '../../hooks';

describe('useScrollHandler', () => {
  let container: HTMLDivElement;
  let containerRef: React.RefObject<HTMLDivElement>;
  let setPage: (fn: (prevPage: number) => number) => void;
  let setScrollTop: (scrollTop: number) => void;

  const totalHeight = 1000;
  const containerHeight = 500;
  const scrollBuffer = 100;

  beforeEach(() => {
    container = document.createElement('div');
    Object.defineProperty(container, 'scrollTop', {
      value: 0,
      writable: true,
      configurable: true
    });
    Object.defineProperty(container, 'clientHeight', {
      value: containerHeight,
      configurable: true
    });
    containerRef = { current: container };

    setPage = vi.fn();
    setScrollTop = vi.fn();
  });

  it('should update scrollTop on scroll without triggering page increment', () => {
    renderHook(() =>
      useScrollHandler({
        containerRef,
        totalHeight,
        containerHeight,
        scrollBuffer,
        setPage,
        setScrollTop
      })
    );

    container.scrollTop = 0;
    act(() => {
      container.dispatchEvent(new Event('scroll'));
    });

    expect(setScrollTop).toHaveBeenCalledWith(0);
    expect(setPage).not.toHaveBeenCalled();
  });

  it('should increment page when scrolled to bottom threshold', () => {
    renderHook(() =>
      useScrollHandler({
        containerRef,
        totalHeight,
        containerHeight,
        scrollBuffer,
        setPage,
        setScrollTop
      })
    );

    container.scrollTop = 500;
    act(() => {
      container.dispatchEvent(new Event('scroll'));
    });

    expect(setScrollTop).toHaveBeenCalledWith(500);
    expect(setPage).toHaveBeenCalledWith(expect.any(Function));

    const updateFn = (setPage as ReturnType<typeof vi.fn>).mock.calls[0][0];
    expect(updateFn(1)).toBe(2);
  });

  it('should do nothing if containerRef is null', () => {
    renderHook(() =>
      useScrollHandler({
        containerRef: null,
        totalHeight,
        containerHeight,
        scrollBuffer,
        setPage,
        setScrollTop
      })
    );

    container.scrollTop = 300;
    act(() => {
      container.dispatchEvent(new Event('scroll'));
    });

    expect(setScrollTop).not.toHaveBeenCalled();
    expect(setPage).not.toHaveBeenCalled();
  });
});
