import { useState, useEffect, useRef, useMemo } from 'react';
import { IPhoto } from '../../../types';
import { useFetchPhotos, useMasonryLayout, useScrollHandler, useSearch } from '../../../hooks';
import { styled, Box } from '@mui/material';
import { LoadingBox } from '../../Components';
import { StyledComponents } from '../../../styles';
import PhotoBox from './PhotoBox';
import { APP_CONFIG } from '../../../config';

const { StyledBox } = StyledComponents;

const scrollBuffer = APP_CONFIG.SCROLL_BUFFER;
const containerHeight = APP_CONFIG.CONTAINER_HEIGHT;

export default function Home() {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [scrollTop, setScrollTop] = useState(0);
  const { query } = useSearch();
  const containerRef = useRef<HTMLDivElement>(null!);
  const { columns, totalHeight, containerWidth } = useMasonryLayout({ photos, containerRef });

  useEffect(() => {
    setPhotos([]);
    setPage(1);
  }, [query]);

  useScrollHandler({
    containerRef,
    totalHeight,
    containerHeight,
    scrollBuffer,
    setPage,
    setScrollTop
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await useFetchPhotos({
        setPhotos,
        query,
        page
      });
    };
    fetchData().then(() => setLoading(false));
  }, [query, page]);

  const visiblePhotos: IPhoto[] = useMemo(() => {
    return columns.flatMap((column) =>
      column.filter((item) => {
        const itemBottom = item.top + item.renderedHeight;
        return (
          itemBottom >= scrollTop - scrollBuffer &&
          item.top <= scrollTop + containerHeight + scrollBuffer
        );
      })
    );
  }, [columns, scrollTop, containerHeight, scrollBuffer]);

  return (
    <GridContainer ref={containerRef} containerWidth={containerWidth}>
      {loading && photos.length === 0 ? (
        <LoadingBox />
      ) : !loading && photos.length === 0 ? (
        <StyledBox>No photos found.</StyledBox>
      ) : (
        visiblePhotos.map((photo) => <PhotoBox key={photo.id} photo={photo} />)
      )}
    </GridContainer>
  );
}

const GridContainer = styled(Box, { shouldForwardProp: (prop) => prop !== 'containerWidth' })<{
  containerWidth: number;
}>(({ containerWidth }) => ({
  width: containerWidth + 20,
  height: containerHeight,
  overflowY: 'auto',
  position: 'relative',
  overflowX: 'hidden'
}));
