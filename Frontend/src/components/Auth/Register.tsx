import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { registerUser } from '../../store/features/auth/authSlice';
import organizations from "../../../organizations.json"

import {
  Box,
  Select, 
  MenuItem,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  Paper,

} from '@mui/material';

const Register = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    organization: 'IDF - Center',
    location: '',
    side: 'idf'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }));
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(registerUser(formData));
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Register
          </Typography>

         {error && <Alert severity="error" sx={{ mb: 2, width: '100%' }}>{error}</Alert>}


          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              name="userName"
              autoComplete="username"
              autoFocus
              value={formData.userName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
              <Select
        value={formData.organization}
   
        sx={{
       
          width: 290,
          height: 50,
        }}
      >
         {organizations.map((x)=>(
          <MenuItem   key={x.name}>{x.name}  </MenuItem>
         ))}
     
      </Select>
             
        
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Registering...' : 'Register'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;