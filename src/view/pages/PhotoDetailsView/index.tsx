import { Box, Button, Skeleton, styled } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPhoto } from '../../../types';
import { useState, useEffect } from 'react';
import DetailsBox from './DetailsBox';

export default function PhotoDetailsView() {
  const navigate = useNavigate();
  const location = useLocation();
  const [photo, setPhoto] = useState<IPhoto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const statePhoto = location.state as IPhoto | undefined;
    if (statePhoto) {
      setTimeout(() => {
        setPhoto(statePhoto);
        setLoading(false);
      }, 0);
    } else {
      navigate(-1);
    }
  }, [location.state, navigate]);

  if (!photo) return null;

  return (
    <StyledContainer>
      {loading ? (
        <Skeleton variant="rectangular" width={700} height={600} sx={{ borderRadius: '8px' }} />
      ) : (
        <img
          src={photo?.src.large || photo?.src.medium}
          alt={photo?.alt || 'Photo'}
          style={{ borderRadius: '8px', maxWidth: '700px', maxHeight: '600px' }}
        />
      )}

      {loading ? <Skeleton variant="text" width={400} height={30} /> : <DetailsBox {...photo} />}

      <Button
        variant="contained"
        sx={{ backgroundColor: 'black' }}
        onClick={() => navigate(-1)}
        disabled={loading}>
        Back
      </Button>
    </StyledContainer>
  );
}

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#c9c9c9',
  padding: '10px',
  borderRadius: '10px'
});
