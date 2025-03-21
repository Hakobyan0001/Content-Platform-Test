import { Box, CssBaseline, styled } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import routes from '../routes';

export default function App() {
  return (
    <StyledApp>
      <CssBaseline />
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </StyledApp>
  );
}

const StyledApp = styled(Box)({
  margin: '70px 0 20px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
