import { IPhoto } from '../types';
import { MASONRY_CONFIG } from '../config';

export interface IPhotoLayout extends IPhoto {
  top: number;
  left: number;
  width: number;
  renderedHeight: number;
}

export interface IMasonryLayoutProps {
  photos: IPhoto[];
  containerWidth: number;
  columnCount: number;
}

export interface IMasonryLayoutReturn {
  columns: IPhotoLayout[][];
  totalHeight: number;
}

export function getColumnCount(containerWidth: number): number {
  const { SMALL, MEDIUM, LARGE } = MASONRY_CONFIG.COLUMN_BREAKPOINTS;

  if (containerWidth < SMALL) return 1;
  if (containerWidth < MEDIUM) return 2;
  if (containerWidth < LARGE) return 3;
  return 4;
}

export function calculateMasonryLayout({
  photos,
  containerWidth,
  columnCount
}: IMasonryLayoutProps): IMasonryLayoutReturn {
  const colWidth = (containerWidth - MASONRY_CONFIG.GAP * (columnCount - 1)) / columnCount;
  const colHeights = Array(columnCount).fill(0);
  const colItems: IPhotoLayout[][] = Array.from({ length: columnCount }, () => []);

  photos.forEach((photo) => {
    const renderedHeight =
      colWidth * (photo.height / photo.width) * MASONRY_CONFIG.PHOTO_SCALE_FACTOR;
    const minIndex = colHeights.indexOf(Math.min(...colHeights));
    const top = colHeights[minIndex];

    colItems[minIndex].push({
      ...photo,
      top,
      left: minIndex * (colWidth + MASONRY_CONFIG.GAP),
      width: colWidth,
      renderedHeight
    });

    colHeights[minIndex] += renderedHeight + MASONRY_CONFIG.GAP;
  });

  return { columns: colItems, totalHeight: Math.max(...colHeights) };
}
