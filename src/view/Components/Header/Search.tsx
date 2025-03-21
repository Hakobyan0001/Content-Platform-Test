import { alpha, InputBase, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import useSearch from '../../../hooks/useSearch';
import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

export default function Search() {
  const { query, setQuery } = useSearch();
  const [inputState, setInputState] = useState('');

  const debouncedSearch = useRef(
    debounce((value: string) => {
      setQuery(value);
    }, 300)
  );

  useEffect(() => {
    if (inputState !== query) {
      debouncedSearch.current(inputState);
    }

    return () => {
      debouncedSearch.current.cancel();
    };
  }, [inputState, query]);

  return (
    <SearchComponent>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        value={inputState}
        onChange={(e) => setInputState(e.target.value)} // Update the search state
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchComponent>
  );
}

const SearchComponent = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));
