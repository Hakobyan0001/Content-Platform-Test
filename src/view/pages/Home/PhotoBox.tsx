import { styled, Box } from '@mui/material';
import { IPhoto } from '../../../types';
import { useNavigate } from 'react-router-dom';

interface IPhotoBoxProps {
  photo: IPhoto;
}

export default function PhotoBox({ photo }: IPhotoBoxProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/PhotoInfo/${photo.id}`, { state: photo });
  };

  return (
    <StyledPhotoBox
      id={photo.id.toString()}
      className="photo-box"
      top={photo.top}
      left={photo.left}
      width={photo.width}
      renderedHeight={photo.renderedHeight}>
      <StyledImage
        onClick={handleClick}
        src={photo.src.large}
        alt={photo.alt || photo.title}
        loading="lazy"
      />
    </StyledPhotoBox>
  );
}

const StyledPhotoBox = styled(Box, {
  shouldForwardProp: (prop: string) => !['top', 'left', 'width', 'renderedHeight'].includes(prop)
})<{
  top: number;
  left: number;
  width: number;
  renderedHeight: number;
}>(({ top, left, width, renderedHeight }) => ({
  position: 'absolute',
  boxSizing: 'border-box',
  top: `${top}px`,
  left: `${left}px`,
  width: `${width}px`,
  height: `${renderedHeight}px`,
  overflow: 'hidden',
  borderRadius: '10px'
}));

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '10px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
  }
});
