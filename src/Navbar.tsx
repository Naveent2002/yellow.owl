import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, Box, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../src/Navbar.css';

interface NavbarProps {
  userName: string;
  profilePictureUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName, profilePictureUrl }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <AppBar position="fixed" style={{ backgroundImage: 'linear-gradient(105deg, #11d268, #4067e9)'}}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Students
          </Typography>
          <Box display="flex" alignItems="center">
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          role="presentation"
          onClick={handleDrawerToggle}
          onKeyDown={handleDrawerToggle}
          className="sidebar"
          style={{ width: 250}}
        >
          <Grid container alignItems="center">
            <Grid item>
              <Avatar src={profilePictureUrl} alt={userName} style={{ marginRight: 10, width: 60, height: 60 }} />
            </Grid>
            <Grid item>
              <Typography variant="h6">userName</Typography>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </div>
  );
};

export default Navbar;
