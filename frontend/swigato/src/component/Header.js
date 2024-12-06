// import React, { useEffect, useState } from 'react';
// import { Box, IconButton, Typography, Badge, Button } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import CallIcon from '@mui/icons-material/Call';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [cartCount, setCartCount] = useState(0); // State to hold the number of items in the cart
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//   const navigate = useNavigate();

//   // Fetch the cart items from localStorage and update the cart count
//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartCount(cartItems.length);
//   }, []); // Only run once on component mount

//   // Check if token exists in localStorage to set login state
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token); // Update login state based on token presence
//   }); // Only run once on component mount

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove the token from localStorage
//     setIsLoggedIn(false); // Update login state
//   };

//   // Handle Login (navigate to login page)
//   const handleLogin = () => {
//     navigate('/login'); // Navigate to the login page
//   };

//   return (
//     <Box 
//       sx={{ 
//         backgroundColor: '#ffffff', 
//         padding: '20px 0', 
//         borderBottom: '2px solid #f8b400', 
//         fontSize: 'small', 
//         fontFamily: `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
//         textAlign: 'center',
//         position: 'relative' 
//       }}
//     >
//       {/* Logo and Tagline */}
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <Typography 
//           variant="h1" 
//           sx={{ 
//             fontSize: '3.5em', 
//             fontWeight: 'bold', 
//             color: 'FireBrick', 
//             paddingRight: '84%', 
//             marginBottom: '-0.8%'
//           }}
//         >
//           Swigato
//         </Typography>
//       </Link>
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <Typography 
//           variant="h2" 
//           sx={{ 
//             fontSize: '1.2em', 
//             color: 'FireBrick', 
//             paddingRight: '85%', 
//             marginBottom: '-0.5%',
//             marginTop: '0.6%' 
//           }}
//         >
//           Have Your Meal !
//         </Typography>
//       </Link>

//       {/* Icon Buttons (Home, Cart, Contact, Profile, Login/Logout) */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           right: '20px',
//           transform: 'translateY(-50%)',
//           display: 'flex',
//           gap: '10px' 
//         }}
//       >
//         {/* Home Icon */}
//         <IconButton onClick={() => navigate('/')}>
//           <HomeIcon />
//         </IconButton>

//         {/* Cart Icon with Badge */}
//         <IconButton onClick={() => navigate('/checkout')}>
//           <Badge badgeContent={cartCount} color="primary">
//             <ShoppingCartIcon />
//           </Badge>
//         </IconButton>

//         {/* Contact Icon */}
//         <IconButton onClick={() => window.location.href = 'tel:+123456789'}>
//           <CallIcon />
//         </IconButton>

//         {/* Profile Icon */}
//         <IconButton onClick={() => navigate('/profile')}>
//           <AccountCircleIcon />
//         </IconButton>

//         {/* Logout Button */}
//         <Button 
//           variant="contained" 
//           onClick={handleLogout} 
//           disabled={!isLoggedIn} // Disabled if not logged in
//           sx={{ backgroundColor: '#ff5722' }}
//         >
//           Logout
//         </Button>

//         {/* Login Button */}
//         <Button 
//           variant="contained" 
//           onClick={handleLogin} 
//           disabled={isLoggedIn} // Disabled if logged in
//           sx={{ backgroundColor: '#4caf50' }}
//         >
//           Login
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Header;







// import React, { useEffect, useState } from 'react';
// import { Box, IconButton, Typography, Badge, Button, TextField } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import CallIcon from '@mui/icons-material/Call';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [cartCount, setCartCount] = useState(0); // State to hold the number of items in the cart
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

//   // Fetch the cart items from localStorage and update the cart count
//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartCount(cartItems.length);
//   }, []); // Only run once on component mount

//   // Check if token exists in localStorage to set login state
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token); // Update login state based on token presence
//   }); // Only run once on component mount

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove the token from localStorage
//     setIsLoggedIn(false); // Update login state
//   };

//   // Handle Login (navigate to login page)
//   const handleLogin = () => {
//     navigate('/login'); // Navigate to the login page
//   };

//   // Handle Search (implement your search logic here)
//   const handleSearch = () => {
//     if (searchTerm) {
//       // Navigate to search results page or handle search
//       console.log(`Searching for: ${searchTerm}`); // Replace this with actual search handling
//     }
//   };

//   return (
//     <Box 
//       sx={{ 
//         backgroundColor: '#ffffff', 
//         padding: '20px 0', 
//         borderBottom: '2px solid #f8b400', 
//         fontSize: 'small', 
//         fontFamily: `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
//         textAlign: 'center',
//         position: 'relative' 
//       }}
//     >
//       {/* Logo and Tagline */}
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <Typography 
//           variant="h1" 
//           sx={{ 
//             fontSize: '3.5em', 
//             fontWeight: 'bold', 
//             color: 'FireBrick', 
//             paddingRight: '84%', 
//             marginBottom: '-0.8%' 
//           }}
//         >
//           Swigato
//         </Typography>
//       </Link>
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <Typography 
//           variant="h2" 
//           sx={{ 
//             fontSize: '1.2em', 
//             color: 'FireBrick', 
//             paddingRight: '85%', 
//             marginBottom: '-0.5%',
//             marginTop: '0.6%' 
//           }}
//         >
//           Have Your Meal !
//         </Typography>
//       </Link>

//       {/* Search Box */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-70px ' }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Handle search on Enter key
//           sx={{
//             width: '450px', // Set a width for the search box
//             backgroundColor: '#ffffff',
//             '& .MuiOutlinedInput-root': {
//               '& fieldset': {
//                 borderColor: '#f8b400', // Set border color
//               },
//               '&:hover fieldset': {
//                 borderColor: '#ff5722', // Change border color on hover
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#ff5722', // Change border color when focused
//               },
//             },
//           }}
//         />
//       </Box>

//       {/* Icon Buttons (Home, Cart, Contact, Profile, Login/Logout) */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           right: '20px',
//           transform: 'translateY(-50%)',
//           display: 'flex',
//           gap: '10px' 
//         }}
//       >
//         {/* Home Icon */}
//         <IconButton onClick={() => navigate('/')}>
//           <HomeIcon />
//         </IconButton>

//         {/* Cart Icon with Badge */}
//         <IconButton onClick={() => navigate('/checkout')}>
//           <Badge badgeContent={cartCount} color="primary">
//             <ShoppingCartIcon />
//           </Badge>
//         </IconButton>

//         {/* Contact Icon */}
//         <IconButton onClick={() => window.location.href = 'tel:+123456789'}>
//           <CallIcon />
//         </IconButton>

//         {/* Profile Icon */}
//         <IconButton onClick={() => navigate('/profile')}>
//           <AccountCircleIcon />
//         </IconButton>

//         {/* Logout Button */}
//         <Button 
//           variant="contained" 
//           onClick={handleLogout} 
//           disabled={!isLoggedIn} // Disabled if not logged in
//           sx={{ backgroundColor: '#ff5722' }}
//         >
//           Logout
//         </Button>

//         {/* Login Button */}
//         <Button 
//           variant="contained" 
//           onClick={handleLogin} 
//           disabled={isLoggedIn} // Disabled if logged in
//           sx={{ backgroundColor: '#4caf50' }}
//         >
//           Login
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Header;





// import React, { useEffect, useState } from 'react';
// import { Box, IconButton, Typography, Badge, Button, TextField, InputAdornment } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import CallIcon from '@mui/icons-material/Call';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ClearIcon from '@mui/icons-material/Clear';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = ({ products, onSearchMilk }) => {
//   const [cartCount, setCartCount] = useState(0); // State to hold the number of items in the cart
//   const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

//   // Fetch the cart items from localStorage and update the cart count
//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartCount(cartItems.length);
//   }); // Only run once on component mount

//   // Check if token exists in localStorage to set login state
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token); // Update login state based on token presence
//   }); // Only run once on component mount

//   // Handle Logout
//   const handleLogout = () => {
//     localStorage.removeItem('token'); // Remove the token from localStorage
//     setIsLoggedIn(false); // Update login state
//   };

//   // Handle Login (navigate to login page)
//   const handleLogin = () => {
//     navigate('/login'); // Navigate to the login page
//   };

//   // Handle search on typing
//   const handleSearchChange = (event) => {
//     const value = event.target.value;
//     setSearchTerm(value);
//     onSearchMilk(value); // Call the onSearchMilk function with the search term
//   };

//   // Clear search input
//   const clearSearch = () => {
//     setSearchTerm('');
//     onSearchMilk(''); // Reset search results to show all products
//   };

//   return (
//     <Box 
//       sx={{ 
//         backgroundColor: '#ffffff', 
//         padding: '20px 0', 
//         borderBottom: '2px solid #f8b400', 
//         fontSize: 'small', 
//         fontFamily: `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
//         textAlign: 'center',
//         position: 'relative' 
//       }}
//     >
//       {/* Logo and Tagline */}
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <Typography 
//           variant="h1" 
//           sx={{ 
//             fontSize: '3.5em', 
//             fontWeight: 'bold', 
//             color: 'FireBrick', 
//             paddingRight: '84%', 
//             marginBottom: '-0.8%' 
//           }}
//         >
//           Swigato
//         </Typography>
//       </Link>
//       <Link to="/" style={{ textDecoration: 'none' }}>
//         <Typography 
//           variant="h2" 
//           sx={{ 
//             fontSize: '1.2em', 
//             color: 'FireBrick', 
//             paddingRight: '85%', 
//             marginBottom: '-0.5%',
//             marginTop: '0.6%' 
//           }}
//         >
//           Have Your Meal !
//         </Typography>
//       </Link>

//       {/* Search Box */}
//       <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-70px ' }}>
//         <TextField
//           variant="outlined"
//           placeholder="Search Me!"
//           value={searchTerm}
//           onChange={handleSearchChange} // Handle search on typing
//           sx={{
//             width: '450px',
//             backgroundColor: '#ffffff',
//             '& .MuiOutlinedInput-root': {
//               borderRadius: '30px',
//               '& fieldset': {
//                 borderColor: '#f8b400',
//               },
//               '&:hover fieldset': {
//                 borderColor: '#ff5722',
//               },
//               '&.Mui-focused fieldset': {
//                 borderColor: '#ff5722',
//               },
//             },
//           }}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 {searchTerm && (
//                   <IconButton onClick={clearSearch} edge="end">
//                     <ClearIcon />
//                   </IconButton>
//                 )}
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Box>

//       {/* Icon Buttons (Home, Cart, Contact, Profile, Login/Logout) */}
//       <Box
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           right: '20px',
//           transform: 'translateY(-50%)',
//           display: 'flex',
//           gap: '10px' 
//         }}
//       >
//         {/* Home Icon */}
//         <IconButton onClick={() => navigate('/')}>
//           <HomeIcon />
//         </IconButton>

//         {/* Cart Icon with Badge */}
//         <IconButton onClick={() => navigate('/checkout')}>
//           <Badge badgeContent={cartCount} color="primary">
//             <ShoppingCartIcon />
//           </Badge>
//         </IconButton>

//         {/* Contact Icon */}
//         <IconButton onClick={() => window.location.href = 'tel:+123456789'}>
//           <CallIcon />
//         </IconButton>

//         {/* Profile Icon */}
//         <IconButton onClick={() => navigate('/profile')}>
//           <AccountCircleIcon />
//         </IconButton>

//         {/* Logout Button */}
//         <Button 
//           variant="contained" 
//           onClick={handleLogout} 
//           disabled={!isLoggedIn}
//           sx={{ backgroundColor: '#ff5722' }}
//         >
//           Logout
//         </Button>

//         {/* Login Button */}
//         <Button 
//           variant="contained" 
//           onClick={handleLogin} 
//           disabled={isLoggedIn}
//           sx={{ backgroundColor: '#4caf50' }}
//         >
//           Login
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Header;


import React, { useEffect, useState } from 'react';
import { Box, IconButton, Typography, Badge, Button, TextField, InputAdornment, Select, MenuItem } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CallIcon from '@mui/icons-material/Call';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // Import the dropdown icon
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode for decoding token

const Header = ({ products, onSearchMilk, setThemePreference }) => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState(localStorage.getItem('themePreference') || 'system'); // Default to 'system'
  const navigate = useNavigate();

  // Check if token exists in localStorage to set login state
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  });

  // Function to fetch the cart items from the backend
  const fetchCartCount = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.sub;

      try {
        const response = await axios.get(`http://localhost:8082/api/customers/${userEmail}/cart`);
        const dishIds = response.data;
        setCartCount(dishIds.length);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  };

  // Fetch cart count if the user is logged in
  useEffect(() => {
    let interval;

    if (isLoggedIn) {
      fetchCartCount();
      interval = setInterval(fetchCartCount, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  } ); 
  

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setCartCount(0);
    console.clear();
  };

  // Handle Login
  const handleLogin = () => {
    navigate('/login');
  };

  // Handle search on typing
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearchMilk(value);
  };

  // Clear search input
  const clearSearch = () => {
    setSearchTerm('');
    onSearchMilk('');
  };

  // Handle theme change
  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);
    setThemePreference(newTheme); // Call the function to update the theme preference in your app
    localStorage.setItem('themePreference', newTheme); // Persist the theme preference
  };

  return (
    <Box 
      sx={{ 
        
        padding: '20px 0',
        borderBottom: '2px solid #f8b400',
        fontSize: 'small',
        fontFamily: `'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif`,
        textAlign: 'center',
        position: 'relative' 
      }}
    >
      {/* Logo and Tagline */}
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: '3.5em', 
            fontWeight: 'bold', 
            color: 'FireBrick', 
            paddingRight: '84%', 
            marginBottom: '-0.8%' 
          }}
        >
          Swigato
        </Typography>
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Typography 
          variant="h2" 
          sx={{ 
            fontSize: '1.2em', 
            color: 'FireBrick', 
            paddingRight: '85%', 
            marginBottom: '-0.5%',
            marginTop: '0.6%' 
          }}
        >
          Have Your Meal!
        </Typography>
      </Link>

      {/* Search Box */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '-70px' }}>
        <TextField
          variant="outlined"
          placeholder="Search Me!"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{
            width: '450px',
            // backgroundColor: 'background.paper',
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
              '& fieldset': {
                borderColor: '#f8b400', 
              },
              '&:hover fieldset': {
                borderColor: '#ff5722', 
              },
              '&.Mui-focused fieldset': {
                borderColor: '#ff5722', 
              },
            },
            '& input': {
              color: 'text.primary',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searchTerm && (
                  <IconButton onClick={clearSearch} edge="end">
                    <ClearIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Theme Selector and Icon Buttons */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
        }}
      >
        {/* Theme Selector */}
        <Select
          value={theme}
          onChange={handleThemeChange}
          displayEmpty
          sx={{
            backgroundColor: 'background.paper',
            '& .MuiSelect-icon': {
              color: 'text.primary',
            },
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f8b400',
            },
          }}
          IconComponent={ArrowDropDownIcon}
        >
          <MenuItem value="system">System</MenuItem>
          <MenuItem value="light">Light</MenuItem>
          <MenuItem value="dark">Dark</MenuItem>
        </Select>

        <IconButton onClick={() => navigate('/')}>
          <HomeIcon />
        </IconButton>

        <IconButton onClick={() => navigate('/checkout')}>
          <Badge badgeContent={cartCount} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <IconButton onClick={() => window.location.href = 'tel:+123456789'}>
          <CallIcon />
        </IconButton>

        <IconButton onClick={() => navigate('/profile')}>
          <AccountCircleIcon />
        </IconButton>

        <Button 
          variant="contained" 
          onClick={handleLogout} 
          disabled={!isLoggedIn}
          sx={{ backgroundColor: '#ff5722' }}
        >
          Logout
        </Button>

        <Button 
          variant="contained" 
          onClick={handleLogin} 
          disabled={isLoggedIn}
          sx={{ backgroundColor: '#4caf50' }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Header;







