import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1DB954' }}>
      <Toolbar>
        <Button 
          color="inherit" 
          component={Link} 
          to="/discover" 
          style={{ fontFamily: 'circular-bold' }}
        >
          Discover
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/forum" 
          style={{ fontFamily: 'circular-bold' }}
        >
          Forum
        </Button>
        <Button 
          color="inherit" 
          component={Link} 
          to="/inbox" 
          style={{ fontFamily: 'circular-bold' }}
        >
          Inbox
        </Button>
        <Box sx={{ flexGrow: 1 }} />
        <Button 
          color="inherit" 
          component={Link} 
          to="/myProfile" 
          style={{ fontFamily: 'circular-bold' }}
        >
          My Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
