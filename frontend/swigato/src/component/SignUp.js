// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [signupError, setSignupError] = useState('');
//   const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
//   const [countdown, setCountdown] = useState(60);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);

//   const navigate = useNavigate();

//   useEffect(() => {
//     let timer;
//     if (isOtpSent && isResendDisabled && countdown > 0) {
//       timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
//     } else if (countdown === 0) {
//       setIsResendDisabled(false);
//       setCountdown(60);
//     }
//     return () => clearInterval(timer);
//   }, [countdown, isOtpSent, isResendDisabled]);

//   const onSubmit = async (data) => {
//     try {
//       setSignupError('');
//       const role = isRestaurantOwner ? "OWNER" : "CUSTOMER";

//       const payload = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         password: data.password,
//         role
//       };

//       const response = await axios.post('http://localhost:8080/auth-app/signup', payload);
//       if (response.status === 200) {
//         setEmail(data.email);
//         setIsOtpSent(true);
//         setIsResendDisabled(true);
//         setCountdown(60);
//       }
//     } catch (error) {
//       setSignupError('Signup failed. Please try again.');
//     }
//   };

//   const resendOtp = async () => {
//     try {
//       setIsResendDisabled(true);
//       setCountdown(60);
//       await axios.post(`http://localhost:8080/auth-app/resend-otp?email=${encodeURIComponent(email)}`);
//     } catch (error) {
//       setSignupError('Failed to resend OTP. Please try again.');
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post(`http://localhost:8080/auth-app/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
//       if (response.status === 200) {
//         navigate('/login');
//       }
//     } catch (error) {
//       setSignupError('OTP verification failed. Please try again.');
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>Sign Up</Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           label="First Name"
//           fullWidth
//           margin="normal"
//           {...register('firstName', { required: 'First Name is required' })}
//         />
//         <TextField
//           label="Last Name"
//           fullWidth
//           margin="normal"
//           {...register('lastName', { required: 'Last Name is required' })}
//         />
//         <TextField
//           label="Email"
//           fullWidth
//           margin="normal"
//           {...register('email', { required: 'Email is required' })}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           {...register('password', { required: 'Password is required' })}
//         />
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={isRestaurantOwner}
//               onChange={() => setIsRestaurantOwner(!isRestaurantOwner)}
//             />
//           }
//           label="Do you want to register as a restaurant owner?"
//         />
//         {signupError && <Typography color="error">{signupError}</Typography>}
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Sign Up
//         </Button>
//       </form>
      
//       {isOtpSent && (
//         <Box mt={2}>
//           <Typography variant="h6">Enter the OTP sent to your email:</Typography>
//           <TextField
//             label="OTP"
//             fullWidth
//             margin="normal"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <Button variant="contained" color="primary" onClick={verifyOtp}>
//             Verify OTP
//           </Button>

//           <Box mt={2}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={resendOtp}
//               disabled={isResendDisabled}
//             >
//               Resend OTP {isResendDisabled && `(${countdown}s)`}
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Signup;







// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { TextField, Button, Box, Typography, FormControlLabel, Checkbox } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Signup = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [signupError, setSignupError] = useState('');
//   const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [email, setEmail] = useState('');
//   const [countdown, setCountdown] = useState(60);
//   const [isResendDisabled, setIsResendDisabled] = useState(true);
//   const [userData, setUserData] = useState(null); // Store user data temporarily
//   const navigate = useNavigate();

//   useEffect(() => {
//     let timer;
//     if (isOtpSent && isResendDisabled && countdown > 0) {
//       timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
//     } else if (countdown === 0) {
//       setIsResendDisabled(false);
//       setCountdown(60);
//     }
//     return () => clearInterval(timer);
//   }, [countdown, isOtpSent, isResendDisabled]);

//   const onSubmit = async (data) => {
//     try {
//       setSignupError('');
//       const role = isRestaurantOwner ? "OWNER" : "CUSTOMER";

//       // Prepare payload for signup
//       const payload = {
//         firstName: data.firstName,
//         lastName: data.lastName,
//         email: data.email,
//         password: data.password, // Hash this on backend if necessary
//         role,
//       };

//       // Post to the authentication endpoint
//       const response = await axios.post('http://localhost:8080/auth-app/signup', payload);
//       if (response.status === 200) {
//         // Store user data temporarily
//         setUserData({
//           firstName: data.firstName,
//           lastName: data.lastName,
//           email: data.email,
//           password: data.password, // Make sure to hash this on backend
//           phone: data.phone || null, // Include phone if provided
//         });

//         setEmail(data.email);
//         setIsOtpSent(true);
//         setIsResendDisabled(true);
//         setCountdown(60);
//       }
//     } catch (error) {
//       setSignupError('Signup failed. Please try again.');
//     }
//   };

//   const resendOtp = async () => {
//     try {
//       setIsResendDisabled(true);
//       setCountdown(60);
//       await axios.post(`http://localhost:8080/auth-app/resend-otp?email=${encodeURIComponent(email)}`);
//     } catch (error) {
//       setSignupError('Failed to resend OTP. Please try again.');
//     }
//   };

//   const verifyOtp = async () => {
//     try {
//       const response = await axios.post(`http://localhost:8080/auth-app/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
//       if (response.status === 200) {
//         // Post to the customer database endpoint after OTP verification
//         if (userData) {
//           const customerDataPayload = {
//             firstName: userData.firstName,
//             lastName: userData.lastName,
//             gender: 'Not specified', // Default value
//             profileImageUrl: null, // Default value
//             email: userData.email,
//             password: userData.password, // Make sure this is securely hashed in backend
//             customerAddress: [], // Default empty
//             phone: userData.phone,
//             customerOrders: [], // Default empty
//             favourites: [], // Default empty
//             customerCart: [], // Default empty
//             customerRating: {}, // Default empty
//           };

//           const customerResponse = await axios.post('http://localhost:8082/api/customers', customerDataPayload);
//           if (customerResponse.status === 200) {
//             navigate('/login'); // Redirect to login page after successful signup
//           } else {
//             setSignupError("Failed to save customer data. Please try again.");
//           }
//         }
//       }
//     } catch (error) {
//       setSignupError('OTP verification failed. Please try again.');
//     }
//   };

//   return (
//     <Box>
//       <Typography variant="h4" gutterBottom>Sign Up</Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           label="First Name"
//           fullWidth
//           margin="normal"
//           {...register('firstName', { required: 'First Name is required' })}
//         />
//         <TextField
//           label="Last Name"
//           fullWidth
//           margin="normal"
//           {...register('lastName', { required: 'Last Name is required' })}
//         />
//         <TextField
//           label="Email"
//           fullWidth
//           margin="normal"
//           {...register('email', { required: 'Email is required' })}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           fullWidth
//           margin="normal"
//           {...register('password', { required: 'Password is required' })}
//         />
//         <TextField
//           label="Phone" // Add this field to your form
//           fullWidth
//           margin="normal"
//           {...register('phone')} // Optional
//         />
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={isRestaurantOwner}
//               onChange={() => setIsRestaurantOwner(!isRestaurantOwner)}
//             />
//           }
//           label="Do you want to register as a restaurant owner?"
//         />
//         {signupError && <Typography color="error">{signupError}</Typography>}
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Sign Up
//         </Button>
//       </form>
      
//       {isOtpSent && (
//         <Box mt={2}>
//           <Typography variant="h6">Enter the OTP sent to your email:</Typography>
//           <TextField
//             label="OTP"
//             fullWidth
//             margin="normal"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <Button variant="contained" color="primary" onClick={verifyOtp}>
//             Verify OTP
//           </Button>

//           <Box mt={2}>
//             <Button
//               variant="outlined"
//               color="secondary"
//               onClick={resendOtp}
//               disabled={isResendDisabled}
//             >
//               Resend OTP {isResendDisabled && `(${countdown}s)`} 
//             </Button>
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Signup;











import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, FormControlLabel, Checkbox, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [signupError, setSignupError] = useState('');
  const [isRestaurantOwner, setIsRestaurantOwner] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isOtpSent && isResendDisabled && countdown > 0) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsResendDisabled(false);
      setCountdown(60);
    }
    return () => clearInterval(timer);
  }, [countdown, isOtpSent, isResendDisabled]);

  const onSubmit = async (data) => {
    try {
      setSignupError('');
      const role = isRestaurantOwner ? "OWNER" : "CUSTOMER";

      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role,
      };

      const response = await axios.post('http://localhost:8080/auth-app/signup', payload);
      if (response.status === 200) {
        setUserData({ ...data });
        setEmail(data.email);
        setIsOtpSent(true);
        setIsResendDisabled(true);
        setCountdown(60);
      }
    } catch (error) {
      setSignupError('Signup failed. Please try again.');
    }
  };

  const resendOtp = async () => {
    try {
      setIsResendDisabled(true);
      setCountdown(60);
      await axios.post(`http://localhost:8080/auth-app/resend-otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      setSignupError('Failed to resend OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/auth-app/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`);
      if (response.status === 200 && userData) {
        const customerDataPayload = {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
        };
        const customerResponse = await axios.post('http://localhost:8082/api/customers', customerDataPayload);
        if (customerResponse.status === 200) navigate('/login');
      }
    } catch (error) {
      setSignupError('OTP verification failed. Please try again.');
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 16 , pb: 16 , backgroundColor: 'background.paper'}}>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 400 }}>
        <Typography variant="h4" align="center" gutterBottom>Sign Up</Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="First Name"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register('firstName', { required: 'First Name is required' })}
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
          <TextField
            label="Last Name"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register('lastName', { required: 'Last Name is required' })}
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register('email', { required: 'Email is required' })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register('password', { required: 'Password is required' })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
          {/* <TextField
            label="Phone"
            fullWidth
            margin="normal"
            variant="outlined"
            {...register('phone')}
          /> */}
          <FormControlLabel
            control={<Checkbox checked={isRestaurantOwner} onChange={() => setIsRestaurantOwner(!isRestaurantOwner)} />}
            label="Register as a restaurant owner?"
          />
          {signupError && <Typography color="error" sx={{ mt: 1 }}>{signupError}</Typography>}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }}>
            Sign Up
          </Button>
        </form>

        {isOtpSent && (
          <Box mt={3}>
            <Typography variant="h6">Enter OTP:</Typography>
            <TextField
              label="OTP"
              fullWidth
              margin="normal"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2, py: 1.5 }} onClick={verifyOtp}>
              Verify OTP
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              sx={{ mt: 2, py: 1.5 }}
              onClick={resendOtp}
              disabled={isResendDisabled}
            >
              Resend OTP {isResendDisabled && `(${countdown}s)`}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Signup


