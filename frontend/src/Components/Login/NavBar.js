import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1DB954' }}>
      <Toolbar>
      <Button color="inherit" component={Link} to="/discover">
          Discover
        </Button>
        <Button color="inherit" component={Link} to="/forum">
          Forum
        </Button>
        <Button color="inherit" component={Link} to="/inbox">
          Inbox
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/myProfile">
          My Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
