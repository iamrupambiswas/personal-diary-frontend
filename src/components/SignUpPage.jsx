import { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
          setError('All fields are required');
          return;
        }
      
        try {
          // Step 1: Sign up the user
          const signupResponse = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          });
      
          if (signupResponse.ok) {
            // Step 2: After successful sign-up, log in the user
            const loginResponse = await fetch('http://localhost:3000/api/users/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password }), // Use the same credentials to log in
            });
      
            if (loginResponse.ok) {
              const data = await loginResponse.json();
              console.log(data);
              // Step 3: Store token or user info in localStorage
              localStorage.setItem('authToken', data.token);
              localStorage.setItem('user', JSON.stringify(data.user));
              // Step 4: Navigate to the dashboard or diary page
              navigate('/');
            } else {
              setError('Login failed. Please try again.');
            }
          } else {
            setError('Signup failed. Please try again.');
          }
        } catch (error) {
          setError('Error during signup. Please try again.');
        }
};
  

  return (
    <Container maxWidth="xs" className="py-12">
      <Paper elevation={3} className="p-6 rounded-lg shadow-lg bg-white">
        <Typography variant="h4" className="text-center text-gray-800 mb-6">
          Sign Up
        </Typography>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

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
            Sign Up
          </Button>
        </form>

        <Grid container justifyContent="center" className="mt-4">
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <span
                onClick={() => navigate('/login')}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
