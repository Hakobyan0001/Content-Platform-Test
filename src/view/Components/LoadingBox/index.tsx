import { CircularProgress } from '@mui/material';
import { StyledComponents } from '../../../styles';

const { StyledBox } = StyledComponents;

export default function LoadingBox() {
  return (
    <StyledBox>
      <CircularProgress />
    </StyledBox>
  );
}
