import { useEffect } from 'react';

export interface IUseScrollHandlerProps {
  containerRef: React.RefObject<HTMLDivElement> | null;
  totalHeight: number;
  containerHeight: number;
  scrollBuffer: number;
  setPage: (fn: (prevPage: number) => number) => void;
  setScrollTop: (scrollTop: number) => void;
}

export default function useScrollHandler({
  containerRef,
  totalHeight,
  containerHeight,
  scrollBuffer,
  setPage,
  setScrollTop
}: IUseScrollHandlerProps): void {
  useEffect(() => {
    if (!containerRef?.current) return;

    const handleScroll = () => {
      if (containerRef?.current) {
        const currentScrollTop = containerRef.current.scrollTop;
        setScrollTop(currentScrollTop);

        if (currentScrollTop + containerHeight + scrollBuffer >= totalHeight) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    const ref = containerRef.current;
    ref.addEventListener('scroll', handleScroll);

    return () => ref.removeEventListener('scroll', handleScroll);
  }, [totalHeight]);
}
