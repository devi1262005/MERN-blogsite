import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Switch, Box, IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';

const Navbar = ({ darkMode, setDarkMode }) => {
  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 2 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Blog App
        </Typography>
        <Box>
          <Typography component="span" sx={{ marginRight: 1 }}>
            Dark Mode
          </Typography>
          <Switch checked={darkMode} onChange={handleToggle} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
