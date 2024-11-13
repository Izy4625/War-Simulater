import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { loginUser } from '../../store/features/auth/authSlice';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Alert,
  Paper,
  Link,
  Divider
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(2, 0),
}));

const AuthLink = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
  gap: theme.spacing(0.5),
}));

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { status, error, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(loginUser(formData));
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <Container maxWidth="xs">
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Login
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
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Logging in...' : 'Login'}
          </Button>
        </Box>

        <StyledDivider />
        
        <AuthLink>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?
          </Typography>
          <Link
            component={RouterLink}
            to="/register"
            variant="body2"
            sx={{ ml: 1 }}
          >
            Register here
          </Link>
        </AuthLink>
      </StyledPaper>
    </Container>
  );
};

export default Login;