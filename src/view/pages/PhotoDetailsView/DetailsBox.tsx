import { Typography, styled, Box } from '@mui/material';
import { IPhoto } from '../../../types';

export default function DetailsBox({ title, alt, photographer, dateTaken }: IPhoto) {
  const date = new Date(dateTaken).toDateString();
  return (
    <StyledPhotoDetailsBox>
      <Typography variant="h2" component="h2">
        {title || 'Untitled'}
      </Typography>
      <Typography variant="body1">{alt || 'No description available.'}</Typography>
      <Typography variant="subtitle1">Photographer: {photographer || 'Unknown'}</Typography>
      <Typography variant="subtitle2">Date Taken: {date || 'Unknown'}</Typography>
    </StyledPhotoDetailsBox>
  );
}

const StyledPhotoDetailsBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  textAlign: 'center'
});
