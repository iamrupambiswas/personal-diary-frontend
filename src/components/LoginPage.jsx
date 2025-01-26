import { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and Password are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json(); // Assuming your backend sends token in the response

        // Store the auth token in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect the user to the diary page after login
        navigate('/');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('Error during login. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs" className="py-12">
      <Paper elevation={3} className="p-6 rounded-lg shadow-lg bg-white">
        <Typography variant="h4" className="text-center text-gray-800 mb-6">
          Login
        </Typography>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Login
          </Button>
        </form>

        <Grid container justifyContent="center" className="mt-4">
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Do not have an account?{' '}
              <span
                onClick={() => navigate('/sign-up')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Login;
