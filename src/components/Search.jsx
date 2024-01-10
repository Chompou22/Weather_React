import { useState } from 'react';
import { AppBar, Toolbar, InputBase, IconButton } from '@mui/material';
import { IoSearch } from 'react-icons/io5';

// eslint-disable-next-line react/prop-types
const Search = ({ handleSearchCity }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearchCity(query);
    setQuery('');
  };

  console.log(query);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
      <AppBar
        position="static"
        sx={{
          background: '#f5f5f5',
          borderRadius: '30px',
          width: '380px',
        }}
      >
        <Toolbar>
          <form onSubmit={handleSubmit} style={{ display: 'flex' }}>
            <InputBase
              placeholder="City search.."
              type="text"
              value={query}
              onChange={handleChange}
              sx={{
                width: '280px',
                borderRadius: '30px',
                color: 'black',
                backgroundColor: '#f5f5f5',
                '&:focus': {
                  backgroundColor: '#fff',
                },
              }}
            />
            <IconButton
              type="submit"
              sx={{
                backgroundColor: '#f5f5f5',
                width: '32px',
                height: '32px',
                marginLeft: 'auto',
              }}
            >
              <IoSearch />
            </IconButton>
          </form>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Search;
