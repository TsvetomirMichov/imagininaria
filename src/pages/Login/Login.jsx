import React, { useState } from 'react';
import { Link as MuiLink, Box, Typography, TextField, Button } from '@mui/material';
import { auth, loginUser } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      loginUser(auth, email, password).then((credentials) => {
        localStorage.setItem('userId', credentials.user.uid);
        navigate('/')
      });
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <Box display="flex"  alignItems="center" mr={10} >
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%', padding: '16px' }}>
        <Typography variant="h4" align='left' gutterBottom>
        Become a creator
        </Typography>
        <Typography variant="body1" align="left" mb={5} gutterBottom>
        Showcase your creations on Imaginaria.
        </Typography>
        <div style={{ marginBottom: '16px' }}>
          <Typography variant="body1" fontWeight="bold">
            Email:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ backgroundColor: '#262626',minWidth:'20em' }}
          />
        </div>
        <div style={{ marginBottom: '1.5em', }}>
          <Typography variant="body1" fontWeight="bold">
            Password:
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
            style={{ backgroundColor: '#262626' }}
          />
        </div>
        <Button variant="contained" color="warning" type="submit" fullWidth>
          Sign In
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px' }}>
          <Typography variant="body1" fontWeight="bold" style={{ paddingRight: '8px' }}>
            Not a member?
          </Typography>
          <MuiLink sx={{
            color:'white',
          }}  href="/signup">Sign up now</MuiLink>
        </div>
      </form>
    </Box>
  );
};

export default LoginPage;
