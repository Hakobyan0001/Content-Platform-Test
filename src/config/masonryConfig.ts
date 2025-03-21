interface IMasonryConfig {
  GAP: number;
  PHOTO_SCALE_FACTOR: number;
  MAX_CONTAINER_WIDTH: number;
  COLUMN_BREAKPOINTS: {
    SMALL: number;
    MEDIUM: number;
    LARGE: number;
  };
}

export const MASONRY_CONFIG: IMasonryConfig = {
  GAP: 10,
  PHOTO_SCALE_FACTOR: 0.8,
  MAX_CONTAINER_WIDTH: 1500,
  COLUMN_BREAKPOINTS: {
    SMALL: 600,
    MEDIUM: 900,
    LARGE: 1200
  }
};
