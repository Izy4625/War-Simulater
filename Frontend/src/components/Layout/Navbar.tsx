// src/components/Layout/Navbar.tsx
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store/store';
// import { logout } from '../../store/features/authSlice';
import BarChartIcon from '@mui/icons-material/BarChart';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>();
  // const { user } = useSelector((state: RootState) => state.auth);
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // dispatch(logout());
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer' 
          }}
          onClick={handleHome}
        >
          <HowToVoteIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            Programming Language Vote
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* {user && ( */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* {user.isAdmin && ( */}
              <Button 
                color="inherit" 
                startIcon={<BarChartIcon />}
                onClick={() => navigate('/stats')}
              >
                Stats
              </Button>
            {/* )} */}
            
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                onClick={handleMenuClick}
                color="inherit"
                size="large"
                aria-controls={open ? 'user-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <AccountCircleIcon />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem disabled>
                  <Typography variant="body2">
                    {/* Signed in as <strong>{user.username}</strong> */}
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>
          </Box>
        {/* )} */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;