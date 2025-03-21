import { useEffect, useMemo, useState } from 'react';
import { IPhoto } from '../types';
import { getColumnCount, calculateMasonryLayout } from '../utils/masonryUtils';
import { MASONRY_CONFIG } from '../config';

interface IUseMasonryLayoutReturn {
  columns: (IPhoto & { top: number; left: number; renderedHeight: number })[][];
  totalHeight: number;
  containerWidth: number;
}
interface IUseMasonryLayoutProps {
  photos: IPhoto[];
  containerRef: React.RefObject<HTMLDivElement> | null;
}

export default function useMasonryLayout({
  photos,
  containerRef
}: IUseMasonryLayoutProps): IUseMasonryLayoutReturn {
  const [containerWidth, setContainerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef?.current) {
        setContainerWidth(
          Math.min(containerRef.current.clientWidth, MASONRY_CONFIG.MAX_CONTAINER_WIDTH)
        );
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columnCount = useMemo(() => getColumnCount(containerWidth), [containerWidth]);

  const { columns, totalHeight } = useMemo(() => {
    if (photos.length === 0) {
      return { columns: [], totalHeight: 0 };
    }
    return calculateMasonryLayout({ photos, containerWidth, columnCount });
  }, [photos, containerWidth, columnCount]);

  return { columns, totalHeight, containerWidth };
}
