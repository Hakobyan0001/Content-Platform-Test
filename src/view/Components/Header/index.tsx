import { AppBar, Toolbar, Typography } from '@mui/material';
import Search from './Search';

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photos
        </Typography>
        <Search />
      </Toolbar>
    </AppBar>
  );
}
