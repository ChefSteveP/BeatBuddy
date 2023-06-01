import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1DB954' }}>
      <Toolbar>
        <Button color="inherit" component={Link} to="/inbox">
          Inbox
        </Button>
        <Button color="inherit" component={Link} to="/forum">
          Forum
        </Button>
        <Button color="inherit" component={Link} to="/discover">
          Discover
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
