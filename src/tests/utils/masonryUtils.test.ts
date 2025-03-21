import { describe, it, expect } from 'vitest';
import { getColumnCount, calculateMasonryLayout } from '../../utils/masonryUtils';
import { MASONRY_CONFIG } from '../../config';
import { IPhoto } from '../../types';

describe('getColumnCount', () => {
  it('should return 1 when containerWidth is less than SMALL breakpoint', () => {
    const width = MASONRY_CONFIG.COLUMN_BREAKPOINTS.SMALL - 1;
    expect(getColumnCount(width)).toBe(1);
  });

  it('should return 2 when containerWidth is between SMALL (inclusive) and MEDIUM (exclusive)', () => {
    const width1 = MASONRY_CONFIG.COLUMN_BREAKPOINTS.SMALL;
    const width2 = MASONRY_CONFIG.COLUMN_BREAKPOINTS.MEDIUM - 1;
    expect(getColumnCount(width1)).toBe(2);
    expect(getColumnCount(width2)).toBe(2);
  });

  it('should return 3 when containerWidth is between MEDIUM (inclusive) and LARGE (exclusive)', () => {
    const width1 = MASONRY_CONFIG.COLUMN_BREAKPOINTS.MEDIUM;
    const width2 = MASONRY_CONFIG.COLUMN_BREAKPOINTS.LARGE - 1;
    expect(getColumnCount(width1)).toBe(3);
    expect(getColumnCount(width2)).toBe(3);
  });

  it('should return 4 when containerWidth is greater than or equal to LARGE', () => {
    const width = MASONRY_CONFIG.COLUMN_BREAKPOINTS.LARGE;
    expect(getColumnCount(width)).toBe(4);
  });
});

describe('calculateMasonryLayout', () => {
  it('should correctly layout a single photo', () => {
    const containerWidth = 1000;
    const columnCount = 2;
    const GAP = MASONRY_CONFIG.GAP;
    const expectedColWidth = (containerWidth - GAP * (columnCount - 1)) / columnCount;

    const photos: IPhoto[] = [
      {
        id: '1',
        src: { medium: 'url', large: 'url' },
        alt: 'A photo',
        title: '',
        dateTaken: '',
        photographer: 'John Doe',
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        renderedHeight: 0
      }
    ];

    const expectedRenderedHeight =
      expectedColWidth * (300 / 400) * MASONRY_CONFIG.PHOTO_SCALE_FACTOR;

    const { columns, totalHeight } = calculateMasonryLayout({
      photos,
      containerWidth,
      columnCount
    });

    expect(columns[0].length).toBe(1);
    expect(columns[1].length).toBe(0);

    const laidOutPhoto = columns[0][0];
    expect(laidOutPhoto.top).toBe(0);
    expect(laidOutPhoto.left).toBe(0); // first column, so left === 0.
    expect(laidOutPhoto.width).toBe(expectedColWidth);
    expect(laidOutPhoto.renderedHeight).toBeCloseTo(expectedRenderedHeight, 2);

    expect(totalHeight).toBeCloseTo(expectedRenderedHeight + GAP, 2);
  });

  it('should distribute multiple photos into columns', () => {
    const containerWidth = 1000;
    const columnCount = 2;
    const GAP = MASONRY_CONFIG.GAP;
    const expectedColWidth = (containerWidth - GAP * (columnCount - 1)) / columnCount;

    const photos: IPhoto[] = [
      {
        id: '1',
        src: { medium: 'url', large: 'url' },
        alt: 'First photo',
        title: '',
        dateTaken: '',
        photographer: 'John Doe',
        width: 400,
        height: 300,
        top: 0,
        left: 0,
        renderedHeight: 0
      },
      {
        id: '2',
        src: { medium: 'url', large: 'url' },
        alt: 'Second photo',
        title: '',
        dateTaken: '',
        photographer: 'Jane Doe',
        width: 800,
        height: 600,
        top: 0,
        left: 0,
        renderedHeight: 0
      }
    ];

    const renderedHeight1 = expectedColWidth * (300 / 400) * MASONRY_CONFIG.PHOTO_SCALE_FACTOR;
    const renderedHeight2 = expectedColWidth * (600 / 800) * MASONRY_CONFIG.PHOTO_SCALE_FACTOR;

    const { columns, totalHeight } = calculateMasonryLayout({
      photos,
      containerWidth,
      columnCount
    });

    expect(columns[0].length).toBe(1);
    expect(columns[1].length).toBe(1);

    const photo1 = columns[0][0];
    const photo2 = columns[1][0];

    expect(photo1.id).toBe('1');
    expect(photo1.top).toBe(0);
    expect(photo1.left).toBe(0);
    expect(photo1.width).toBe(expectedColWidth);
    expect(photo1.renderedHeight).toBeCloseTo(renderedHeight1, 2);

    expect(photo2.id).toBe('2');
    expect(photo2.left).toBeCloseTo(expectedColWidth + GAP, 2);
    expect(photo2.top).toBe(0);
    expect(photo2.width).toBe(expectedColWidth);
    expect(photo2.renderedHeight).toBeCloseTo(renderedHeight2, 2);

    const colHeight0 = renderedHeight1 + GAP;
    const colHeight1 = renderedHeight2 + GAP;
    const expectedTotal = Math.max(colHeight0, colHeight1);
    expect(totalHeight).toBeCloseTo(expectedTotal, 2);
  });
});
