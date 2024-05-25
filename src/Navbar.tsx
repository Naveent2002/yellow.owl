// Navbar.tsx
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, Box, Grid } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import '../src/Navbar.css';

interface NavbarProps {
  userName: string;
  profilePictureUrl: string;
  onDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ userName, profilePictureUrl, onDrawerToggle }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
    onDrawerToggle();
  };

  return (
    <div>
      <AppBar
        position="fixed"
        style={{
          backgroundImage: 'linear-gradient(105deg, #11d268, #4067e9)',
          transition: 'transform 0.3s',
          transform: isDrawerOpen ? 'translateX(282px)' : 'translateX(0)',
          zIndex: 1300,
        }}
      >
        <Toolbar>
          {!isDrawerOpen && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Students
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerToggle}>
        <Box
          role="presentation"
          className="sidebar"
          style={{ width: 250, padding: 16 }}
        >
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <Avatar src={profilePictureUrl} alt={userName} style={{ width: 60, height: 60 }} />
            </Grid>
            <Grid item>
              <Grid container direction="column" alignItems="start">
                <Grid item>
                  <Typography variant="h6">Yellow Owl</Typography>
                </Grid>
                <Grid item>
                  <Button style={{ backgroundColor: 'transparent', color: 'rgb(198, 198, 198)' }}>Admin</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={15}
        style={{
          transition: 'padding-left 0.3s',
          paddingLeft: isDrawerOpen ? 20 : 0,
          zIndex: 1200,
        }}
      >
        <Typography variant="h4" gutterBottom>Students</Typography>
      </Box>
      <div style={{ paddingTop: 64 }} />
    </div>
  );
};

export default Navbar;
