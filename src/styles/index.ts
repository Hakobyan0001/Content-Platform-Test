import { styled, Box } from '@mui/material';

export const StyledComponents = {
  StyledBox: styled(Box)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '20px',
    fontWeight: 'bold'
  })
};
