// import React, { useState, useContext } from 'react'; 
// import { useForm } from 'react-hook-form';
// import { TextField, Button, Box, Typography } from '@mui/material';
// import AuthContext from '../context/AuthContext'; // Ensure this path is correct

// const Login = () => {
//   const { handleLogin } = useContext(AuthContext); // Import the handleLogin function from AuthContext
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [loginError, setLoginError] = useState('');

//   const onSubmit = async (data) => {
//     try {
//       await handleLogin(data); // Call handleLogin directly
//     } catch (error) {
//       setLoginError('Login failed. Please try again.'); // Handle error if needed
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>Login</Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           label="Email"
//           fullWidth
//           margin="normal"
//           {...register('email', { required: 'Email is required' })}
//           error={!!errors.email}
//           helperText={errors.email?.message}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           {...register('password', { required: 'Password is required' })}
//           error={!!errors.password}
//           helperText={errors.password?.message}
//         />
//         {loginError && <Typography color="error">{loginError}</Typography>}
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Login
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default Login;









import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // Ensure this path is correct

const Login = () => {
  const { handleLogin } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await handleLogin(data);
    } catch (error) {
      setLoginError('Login failed. Please try again.');
    }
  };

  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh" 
      bgcolor='background.paper'
    >
      <Paper 
        elevation={4} 
        sx={{
          padding: '40px',
          width: '100%',
          maxWidth: '400px',
          borderRadius: '12px',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom color="primary">
          Welcome Back
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Please login to continue
        </Typography>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          {loginError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {loginError}
            </Typography>
          )}
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            sx={{ mt: 3, py: 1.5 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            onClick={() => navigate('/signup')}
            sx={{ mt: 2, py: 1.5 }}
          >
            New User? Sign Up
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;