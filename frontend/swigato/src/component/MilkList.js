// import React from 'react';
// import { Grid } from '@mui/material';
// import MilkCard from './MilkCard';

// const MilkList = ({ milk }) => {
//   return (
//     <Grid container spacing={4} justifyContent="center">
//       {milk.map((item) => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
//           <MilkCard milk={item} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default MilkList

// import React from 'react';
// import { Grid, Typography } from '@mui/material';
// import MilkCard from './MilkCard';

// const MilkList = ({ milk }) => {
//   return (
//     <Grid container spacing={4} justifyContent="center">
//       {milk.map((restaurant) => (
//         <React.Fragment key={restaurant.id}>
//           <Grid item xs={12}>
//             <Typography variant="h5" align="center">
//               {restaurant.name}
//             </Typography>
//           </Grid>
//           {restaurant.dishes.map((dish) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={dish.id}>
//               <MilkCard milk={dish} />
//             </Grid>
//           ))}
//         </React.Fragment>
//       ))}
//     </Grid>
//   );
// };

// export default MilkList;

// import React, { useRef, useEffect, useState } from 'react';
// import { Grid, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import MilkCard from './MilkCard';

// const MilkList = ({ restaurants }) => {
//   const scrollRefs = useRef({});
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const scroll = (restaurantId, direction) => {
//     const scrollAmount = 200;
//     const scrollContainer = scrollRefs.current[restaurantId];
//     if (scrollContainer) {
//       // Get current scroll position
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

//       // Check if we're at the end of the list
//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const vibrantColors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500'];

//   // Combine dishes for seamless auto-scroll
//   const getAllDishes = (restaurant) => [...restaurant.dishes, ...restaurant.dishes];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (!isHovered) {
//         restaurants.forEach((restaurant) => scroll(restaurant.id, 1));
//       }
//     }, 3000); // Change dishes every 3 seconds

//     return () => clearInterval(intervalId);
//   }, [isHovered, restaurants]);

//   return (
//     <Grid container spacing={4} direction="column" alignItems="center">
//       {restaurants.map((restaurant, index) => (
//         <Grid item xs={12} key={restaurant.id} style={{ width: '100%' }}>
//           {/* Restaurant Section with Vibrant Background */}
//           <Box
//             p={3}
//             mb={5}
//             borderRadius={3}
//             style={{
//               backgroundColor: vibrantColors[index % vibrantColors.length],
//               width: isSmallScreen ? '100%' : '95%',
//               maxWidth: '1300px',
//               margin: 'auto',
//             }}
//           >
//             {/* Restaurant Name */}
//             <Typography variant="h5" align="center" gutterBottom>
//               {restaurant.name}
//             </Typography>

//             {/* Dishes Container with Scroll Arrows */}
//             <Box
//               display="flex"
//               alignItems="center"
//               position="relative"
//               width="100%"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               {/* Back Arrow */}
//               <IconButton
//                 onClick={() => scroll(restaurant.id, -1)}
//                 style={{ position: 'absolute', left: 0, zIndex: 1 }}
//                 disabled={restaurant.dishes.length <= 4}
//               >
//                 <ArrowBack />
//               </IconButton>

//               {/* Scrollable Dishes */}
//               <Box
//                 ref={(el) => (scrollRefs.current[restaurant.id] = el)}
//                 display="flex"
//                 overflow="hidden"
//                 flexWrap="nowrap"
//                 style={{
//                   marginLeft: 40,
//                   marginRight: 40,
//                   width: 'calc(100% - 80px)',
//                   maxWidth: '100%',
//                 }}
//               >
//                 {getAllDishes(restaurant).map((dish) => (
//                   <Box key={dish.id} flex="0 0 auto" width="200px" mr={2}>
//                     <MilkCard milk={dish} />
//                   </Box>
//                 ))}
//               </Box>

//               {/* Forward Arrow */}
//               <IconButton
//                 onClick={() => scroll(restaurant.id, 1)}
//                 style={{ position: 'absolute', right: 0, zIndex: 1 }}
//                 disabled={restaurant.dishes.length <= 4}
//               >
//                 <ArrowForward />
//               </IconButton>
//             </Box>
//           </Box>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default MilkList;

// import React, { useRef, useEffect, useState } from 'react';
// import { Grid, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import MilkCard from './MilkCard';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const MilkList = ({ restaurants }) => {
//   const scrollRefs = useRef({});
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate(); // Initialize navigate

//   const scroll = (restaurantId, direction) => {
//     const scrollAmount = 200;
//     const scrollContainer = scrollRefs.current[restaurantId];
//     if (scrollContainer) {
//       // Get current scroll position
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

//       // Check if we're at the end of the list
//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const vibrantColors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500'];

//   // Combine dishes for seamless auto-scroll
//   const getAllDishes = (restaurant) => [...restaurant.dishes, ...restaurant.dishes];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (!isHovered) {
//         restaurants.forEach((restaurant) => scroll(restaurant.id, 1));
//       }
//     }, 3000); // Change dishes every 3 seconds

//     return () => clearInterval(intervalId);
//   }, [isHovered, restaurants]);

//   return (
//     <Grid container spacing={4} direction="column" alignItems="center">
//       {restaurants.map((restaurant, index) => (
//         <Grid item xs={12} key={restaurant.id} style={{ width: '100%' }}>
//           {/* Restaurant Section with Vibrant Background */}
//           <Box
//             p={3}
//             mb={5}
//             borderRadius={3}
//             style={{
//               backgroundColor: vibrantColors[index % vibrantColors.length],
//               width: isSmallScreen ? '100%' : '95%',
//               maxWidth: '1300px',
//               margin: 'auto',
//             }}
//           >
//             {/* Restaurant Name - Clickable */}
//             <Typography 
//               variant="h5" 
//               align="center" 
//               gutterBottom
//               //onClick={() => navigate(`/restaurant/${restaurant.id}`)}
//               onClick={() => navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } })}
//  // Navigate on click
//               style={{ cursor: 'pointer' }} // Change cursor to pointer
//             >
//               {restaurant.name}
//             </Typography>

//             {/* Dishes Container with Scroll Arrows */}
//             <Box
//               display="flex"
//               alignItems="center"
//               position="relative"
//               width="100%"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               {/* Back Arrow */}
//               <IconButton
//                 onClick={() => scroll(restaurant.id, -1)}
//                 style={{ position: 'absolute', left: 0, zIndex: 1 }}
//                 disabled={restaurant.dishes.length <= 4}
//               >
//                 <ArrowBack />
//               </IconButton>

//               {/* Scrollable Dishes */}
//               <Box
//                 ref={(el) => (scrollRefs.current[restaurant.id] = el)}
//                 display="flex"
//                 overflow="hidden"
//                 flexWrap="nowrap"
//                 style={{
//                   marginLeft: 40,
//                   marginRight: 40,
//                   width: 'calc(100% - 80px)',
//                   maxWidth: '100%',
//                 }}
//               >
//                 {getAllDishes(restaurant).map((dish) => (
//                   <Box key={dish.id} flex="0 0 auto" width="200px" mr={2}>
//                     <MilkCard milk={dish} />
//                   </Box>
//                 ))}
//               </Box>

//               {/* Forward Arrow */}
//               <IconButton
//                 onClick={() => scroll(restaurant.id, 1)}
//                 style={{ position: 'absolute', right: 0, zIndex: 1 }}
//                 disabled={restaurant.dishes.length <= 4}
//               >
//                 <ArrowForward />
//               </IconButton>
//             </Box>
//           </Box>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default MilkList;

// import React, { useRef, useEffect, useState } from 'react';
// import { Grid, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import MilkCard from './MilkCard';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const MilkList = ({ restaurants }) => {
//   const scrollRefs = useRef({});
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate(); // Initialize navigate

//   const scroll = (restaurantId, direction) => {
//     const scrollAmount = 200;
//     const scrollContainer = scrollRefs.current[restaurantId];
//     if (scrollContainer) {
//       // Get current scroll position
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

//       // Check if we're at the end of the list
//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const vibrantColors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500'];

//   // Get all dishes without duplication
//   const getAllDishes = (restaurant) => [...restaurant.dishes];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (!isHovered) {
//         restaurants.forEach((restaurant) => scroll(restaurant.id, 1));
//       }
//     }, 3000); // Change dishes every 3 seconds

//     return () => clearInterval(intervalId);
//   }, [isHovered, restaurants]);

//   return (
//     <Grid container spacing={4} direction="column" alignItems="center">
//       {restaurants.map((restaurant, index) => (
//         <Grid item xs={12} key={restaurant.id} style={{ width: '100%' }}>
//           {/* Restaurant Section with Vibrant Background */}
//           <Box
//             p={3}
//             mb={5}
//             borderRadius={3}
//             style={{
//               backgroundColor: vibrantColors[index % vibrantColors.length],
//               width: isSmallScreen ? '100%' : '95%',
//               maxWidth: '1300px',
//               margin: 'auto',
//             }}
//           >
//             {/* Restaurant Name - Clickable */}
//             <Typography 
//               variant="h5" 
//               align="center" 
//               gutterBottom
//               onClick={() => navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } })} // Navigate on click
//               style={{ cursor: 'pointer' }} // Change cursor to pointer
//             >
//               {restaurant.name}
//             </Typography>

//             {/* Dishes Container with Scroll Arrows */}
//             <Box
//               display="flex"
//               alignItems="center"
//               position="relative"
//               width="100%"
//               onMouseEnter={() => setIsHovered(true)}
//               onMouseLeave={() => setIsHovered(false)}
//             >
//               {/* Back Arrow */}
//               <IconButton
//                 onClick={() => scroll(restaurant.id, -1)}
//                 style={{ position: 'absolute', left: 0, zIndex: 1 }}
//                 disabled={restaurant.dishes.length <= 4}
//               >
//                 <ArrowBack />
//               </IconButton>

//               {/* Scrollable Dishes */}
//               <Box
//                 ref={(el) => (scrollRefs.current[restaurant.id] = el)}
//                 display="flex"
//                 overflow="hidden"
//                 flexWrap="nowrap"
//                 style={{
//                   marginLeft: 40,
//                   marginRight: 40,
//                   width: 'calc(100% - 80px)',
//                   maxWidth: '100%',
//                 }}
//               >
//                 {getAllDishes(restaurant).map((dish) => (
//                   <Box key={`${restaurant.id}-${dish.id}`} flex="0 0 auto" width="200px" mr={2}>
//                     <MilkCard milk={dish} />
//                   </Box>
//                 ))}
//               </Box>

//               {/* Forward Arrow */}
//               <IconButton
//                 onClick={() => scroll(restaurant.id, 1)}
//                 style={{ position: 'absolute', right: 0, zIndex: 1 }}
//                 disabled={restaurant.dishes.length <= 4}
//               >
//                 <ArrowForward />
//               </IconButton>
//             </Box>
//           </Box>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default MilkList;




// import React, { useRef, useEffect, useState } from 'react';
// import { Grid, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import MilkCard from './MilkCard';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const MilkList = ({ restaurants = [] }) => { // Default to an empty array
//   const scrollRefs = useRef({});
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate(); // Initialize navigate

//   const scroll = (restaurantId, direction) => {
//     const scrollAmount = 200;
//     const scrollContainer = scrollRefs.current[restaurantId];
//     if (scrollContainer) {
//       // Get current scroll position
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

//       // Check if we're at the end of the list
//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const vibrantColors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500'];

//   // Get all dishes from a restaurant
//   const getAllDishes = (restaurant) => restaurant.dishes || []; // Safely return an empty array if dishes are undefined

//   // Function to render stars based on the rating
//   const renderStars = (rating) => {
//     const starCount = Math.floor(rating); // Get the whole number part of the rating
//     return [...Array(5)].map((_, index) => (
//       <span key={index} style={{ color: 'black' }}>
//         {index < starCount ? '★' : '☆'} {/* Black filled star or empty star */}
//       </span>
//     ));
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (!isHovered) {
//         restaurants.forEach((restaurant) => scroll(restaurant.id, 1));
//       }
//     }, 3000); // Change dishes every 3 seconds

//     return () => clearInterval(intervalId);
//   }, [isHovered, restaurants]);

//   return (
//     <Grid container spacing={4} direction="column" alignItems="center">
//       {restaurants.length > 0 ? ( // Check if restaurants array is not empty
//         restaurants.map((restaurant, index) => (
//           <Grid item xs={12} key={restaurant.id} style={{ width: '100%' }}>
//             {/* Restaurant Section with Vibrant Background */}
//             <Box
//               p={3}
//               mb={5}
//               borderRadius={3}
//               style={{
//                 backgroundColor: vibrantColors[index % vibrantColors.length],
//                 width: isSmallScreen ? '100%' : '95%',
//                 maxWidth: '1300px',
//                 margin: 'auto',
//               }}
//             >
//               {/* Restaurant Name with Ratings */}
//               <Box display="flex" alignItems="center" justifyContent="center">

//                 {/* Left Rating */}
//                 <Typography variant="h6" style={{ marginRight: '10px' , marginTop: '-10px'}}>
//                   {renderStars(restaurant.rating)} {/* Display the stars */}
//                 </Typography>

//                 {/* Restaurant Name - Clickable */}
//                 <Typography 
//                   variant="h5" 
//                   align="center" 
//                   gutterBottom
//                   onClick={() => navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } })} // Navigate on click
                  
//                   style={{ cursor: 'pointer' }} // Change cursor to pointer
//                 >
//                   {restaurant.name}
//                 </Typography>

//                 {/* Right Rating */}
//                 <Typography variant="h6" style={{ marginLeft: '10px' , marginTop: '-10px'}}>
//                   {renderStars(restaurant.rating)} {/* Display the stars */}
//                 </Typography>
//               </Box>

//               {/* Dishes Container with Scroll Arrows */}
//               <Box
//                 display="flex"
//                 alignItems="center"
//                 position="relative"
//                 width="100%"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 {/* Back Arrow */}
//                 <IconButton
//                   onClick={() => scroll(restaurant.id, -1)}
//                   style={{ position: 'absolute', left: 0, zIndex: 1 }}
//                   disabled={(getAllDishes(restaurant).length <= 4)} // Check length of dishes
//                 >
//                   <ArrowBack />
//                 </IconButton>

//                 {/* Scrollable Dishes */}
//                 <Box
//                   ref={(el) => (scrollRefs.current[restaurant.id] = el)}
//                   display="flex"
//                   overflow="hidden"
//                   flexWrap="nowrap"
//                   style={{
//                     marginLeft: 40,
//                     marginRight: 40,
//                     width: 'calc(100% - 80px)',
//                     maxWidth: '100%',
//                   }}
//                 >
//                   {getAllDishes(restaurant).map((dish) => (
//                     <Box key={`${restaurant.id}-${dish.id}`} flex="0 0 auto" width="200px" mr={2}>
//                       <MilkCard milk={dish} />
//                     </Box>
//                   ))}
//                 </Box>

//                 {/* Forward Arrow */}
//                 <IconButton
//                   onClick={() => scroll(restaurant.id, 1)}
//                   style={{ position: 'absolute', right: 0, zIndex: 1 }}
//                   disabled={(getAllDishes(restaurant).length <= 4)} // Check length of dishes
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         ))
//       ) : (
//         <Typography variant="h6" align="center">No restaurants available.</Typography> // Fallback UI
//       )}
//     </Grid>
//   );
// };

// export default MilkList;















// import React, { useRef, useEffect, useState } from 'react';
// import { Grid, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import MilkCard from './MilkCard';
// import {jwtDecode} from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const MilkList = ({ restaurants = [] }) => {
//   const scrollRefs = useRef({});
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();
//   const vibrantColors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500'];

//   // Decode the JWT token and extract role and email
//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     let filtered = restaurants;

//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const { role, sub: email } = decodedToken;

//       if (role === 'OWNER') {
//         // Filter for the restaurant matching the owner's email
//         filtered = restaurants.filter((restaurant) => restaurant.email === email);
//       }
//     }

//     setFilteredRestaurants(filtered);
//   }, [restaurants]);

//   const scroll = (restaurantId, direction) => {
//     const scrollAmount = 200;
//     const scrollContainer = scrollRefs.current[restaurantId];
//     if (scrollContainer) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const getAllDishes = (restaurant) => restaurant.dishes || [];

//   const renderStars = (rating) => {
//     const starCount = Math.floor(rating);
//     return [...Array(5)].map((_, index) => (
//       <span key={index} style={{ color: 'black' }}>
//         {index < starCount ? '★' : '☆'}
//       </span>
//     ));
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (!isHovered) {
//         filteredRestaurants.forEach((restaurant) => scroll(restaurant.id, 1));
//       }
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [isHovered, filteredRestaurants]);

//   return (
//     <Grid container spacing={4} direction="column" alignItems="center">
//       {filteredRestaurants.length > 0 ? (
//         filteredRestaurants.map((restaurant, index) => (
//           <Grid item xs={12} key={restaurant.id} style={{ width: '100%' }}>
//             <Box
//               p={3}
//               mb={5}
//               borderRadius={3}
//               style={{
//                 backgroundColor: vibrantColors[index % vibrantColors.length],
//                 width: isSmallScreen ? '100%' : '95%',
//                 maxWidth: '1300px',
//                 margin: 'auto',
//               }}
//             >
//               <Box display="flex" alignItems="center" justifyContent="center">
//                 <Typography variant="h6" style={{ marginRight: '10px', marginTop: '-10px' }}>
//                   {renderStars(restaurant.rating)}
//                 </Typography>

//                 <Typography
//                   variant="h5"
//                   align="center"
//                   gutterBottom
//                   onClick={() => navigate(`/restaurant/${restaurant.id}`, { state: { restaurant } })}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {restaurant.name}
//                 </Typography>

//                 <Typography variant="h6" style={{ marginLeft: '10px', marginTop: '-10px' }}>
//                   {renderStars(restaurant.rating)}
//                 </Typography>
//               </Box>

//               <Box
//                 display="flex"
//                 alignItems="center"
//                 position="relative"
//                 width="100%"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <IconButton
//                   onClick={() => scroll(restaurant.id, -1)}
//                   style={{ position: 'absolute', left: 0, zIndex: 1 }}
//                   disabled={getAllDishes(restaurant).length <= 4}
//                 >
//                   <ArrowBack />
//                 </IconButton>

//                 <Box
//                   ref={(el) => (scrollRefs.current[restaurant.id] = el)}
//                   display="flex"
//                   overflow="hidden"
//                   flexWrap="nowrap"
//                   style={{
//                     marginLeft: 40,
//                     marginRight: 40,
//                     width: 'calc(100% - 80px)',
//                     maxWidth: '100%',
//                   }}
//                 >
//                   {getAllDishes(restaurant).map((dish) => (
//                     <Box key={`${restaurant.id}-${dish.id}`} flex="0 0 auto" width="200px" mr={2}>
//                       <MilkCard milk={dish} />
//                     </Box>
//                   ))}
//                 </Box>

//                 <IconButton
//                   onClick={() => scroll(restaurant.id, 1)}
//                   style={{ position: 'absolute', right: 0, zIndex: 1 }}
//                   disabled={getAllDishes(restaurant).length <= 4}
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         ))
//       ) : (
//         <Typography variant="h6" align="center">
//           No restaurants available.
//         </Typography>
//       )}
//     </Grid>
//   );
// };

// export default MilkList;














// import React, { useRef, useEffect, useState } from 'react';
// import { Grid, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
// import { ArrowBack, ArrowForward } from '@mui/icons-material';
// import MilkCard from './MilkCard';
// import {jwtDecode} from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

// const MilkList = ({ restaurants = [] }) => {
//   const scrollRefs = useRef({});
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
//   const navigate = useNavigate();
//   const vibrantColors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500'];

//   const [filteredRestaurants, setFilteredRestaurants] = useState([]);
//   const [role, setRole] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     let filtered = restaurants;

//     if (token) {
//       const decodedToken = jwtDecode(token);
//       const { role: userRole, sub: email } = decodedToken;
//       setRole(userRole);

//       if (userRole === 'OWNER') {
//         // Filter for the restaurant matching the owner's email
//         filtered = restaurants.filter((restaurant) => restaurant.email === email);
//       }
//     }

//     setFilteredRestaurants(filtered);
//   }, [restaurants]);

//   const scroll = (restaurantId, direction) => {
//     const scrollAmount = 200;
//     const scrollContainer = scrollRefs.current[restaurantId];
//     if (scrollContainer) {
//       const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

//       if (scrollLeft + clientWidth >= scrollWidth) {
//         scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
//       } else {
//         scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
//       }
//     }
//   };

//   const getAllDishes = (restaurant) => restaurant.dishes || [];

//   const renderStars = (rating) => {
//     const starCount = Math.floor(rating);
//     return [...Array(5)].map((_, index) => (
//       <span key={index} style={{ color: 'black' }}>
//         {index < starCount ? '★' : '☆'}
//       </span>
//     ));
//   };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       if (!isHovered) {
//         filteredRestaurants.forEach((restaurant) => scroll(restaurant.id, 1));
//       }
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, [isHovered, filteredRestaurants]);

//   const handleNavigate = (restaurant) => {
//     navigate(`/restaurant/${restaurant.id}`, {
//       state: { restaurant, role },
//     });
//   };

//   return (
//     <Grid container spacing={4} direction="column" alignItems="center">
//       {filteredRestaurants.length > 0 ? (
//         filteredRestaurants.map((restaurant, index) => (
//           <Grid item xs={12} key={restaurant.id} style={{ width: '100%' }}>
//             <Box
//               p={3}
//               mb={5}
//               borderRadius={3}
//               style={{
//                 backgroundColor: vibrantColors[index % vibrantColors.length],
//                 width: isSmallScreen ? '100%' : '95%',
//                 maxWidth: '1300px',
//                 margin: 'auto',
//               }}
//             >
//               <Box display="flex" alignItems="center" justifyContent="center">
//                 <Typography variant="h6" style={{ marginRight: '10px', marginTop: '-10px' }}>
//                   {renderStars(restaurant.rating)}
//                 </Typography>

//                 <Typography
//                   variant="h5"
//                   align="center"
//                   gutterBottom
//                   onClick={() => handleNavigate(restaurant)}
//                   style={{ cursor: 'pointer' }}
//                 >
//                   {restaurant.name}
//                 </Typography>

//                 <Typography variant="h6" style={{ marginLeft: '10px', marginTop: '-10px' }}>
//                   {renderStars(restaurant.rating)}
//                 </Typography>
//               </Box>

//               <Box
//                 display="flex"
//                 alignItems="center"
//                 position="relative"
//                 width="100%"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//               >
//                 <IconButton
//                   onClick={() => scroll(restaurant.id, -1)}
//                   style={{ position: 'absolute', left: 0, zIndex: 1 }}
//                   disabled={getAllDishes(restaurant).length <= 4}
//                 >
//                   <ArrowBack />
//                 </IconButton>

//                 <Box
//                   ref={(el) => (scrollRefs.current[restaurant.id] = el)}
//                   display="flex"
//                   overflow="hidden"
//                   flexWrap="nowrap"
//                   style={{
//                     marginLeft: 40,
//                     marginRight: 40,
//                     width: 'calc(100% - 80px)',
//                     maxWidth: '100%',
//                   }}
//                 >
//                   {getAllDishes(restaurant).map((dish) => (
//                     <Box key={`${restaurant.id}-${dish.id}`} flex="0 0 auto" width="200px" mr={2}>
//                       <MilkCard milk={dish} />
//                     </Box>
//                   ))}
//                 </Box>

//                 <IconButton
//                   onClick={() => scroll(restaurant.id, 1)}
//                   style={{ position: 'absolute', right: 0, zIndex: 1 }}
//                   disabled={getAllDishes(restaurant).length <= 4}
//                 >
//                   <ArrowForward />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         ))
//       ) : (
//         <Typography variant="h6" align="center">
//           No restaurants available.
//         </Typography>
//       )}
//     </Grid>
//   );
// };

// export default MilkList;




import React, { useRef, useEffect, useState } from 'react';
import { Grid, Typography, IconButton, Box, useMediaQuery, useTheme } from '@mui/material';
import { ArrowBack, ArrowForward, Delete } from '@mui/icons-material';
import MilkCard from './MilkCard';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MilkList = ({ restaurants = [] }) => {
  const scrollRefs = useRef({});
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const vibrantColors = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF', '#FF69B4', '#FF4500'];

  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    let filtered = restaurants;

    if (token) {
      const decodedToken = jwtDecode(token);
      const { role: userRole, sub: email } = decodedToken;
      setRole(userRole);

      if (userRole === 'OWNER') {
        filtered = restaurants.filter((restaurant) => restaurant.email === email);
      }
    }

    setFilteredRestaurants(filtered);
  }, [restaurants]);

  const scroll = (restaurantId, direction) => {
    const scrollAmount = 200;
    const scrollContainer = scrollRefs.current[restaurantId];
    if (scrollContainer) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;

      if (scrollLeft + clientWidth >= scrollWidth) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const getAllDishes = (restaurant) => restaurant.dishes || [];

  const renderStars = (rating) => {
    const starCount = Math.floor(rating);
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: 'black' }}>
        {index < starCount ? '★' : '☆'}
      </span>
    ));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isHovered) {
        filteredRestaurants.forEach((restaurant) => scroll(restaurant.id, 1));
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isHovered, filteredRestaurants]);

  const handleNavigate = (restaurant) => {
    navigate(`/restaurant/${restaurant.id}`, {
      state: { restaurant, role },
    });
  };

  const handleDelete = async (restaurantId) => {
    try {
      await axios.delete(`http://localhost:8081/api/restaurants/${restaurantId}`);
      setFilteredRestaurants((prev) =>
        prev.filter((restaurant) => restaurant.id !== restaurantId)
      );
      alert('Restaurant deleted successfully');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant');
    }
  };

  return (
    <Grid container spacing={4} direction="column" alignItems="center">
      {filteredRestaurants.length > 0 ? (
        filteredRestaurants.map((restaurant, index) => (
          <Grid item xs={12} key={restaurant.id} style={{ width: '100%' }}>
            <Box
              p={3}
              mb={5}
              borderRadius={3}
              style={{
                backgroundColor: vibrantColors[index % vibrantColors.length],
                width: isSmallScreen ? '100%' : '95%',
                maxWidth: '1300px',
                margin: 'auto',
                position: 'relative',
              }}
            >
              <Box display="flex" alignItems="center" justifyContent="center">
                <Typography variant="h6" style={{ marginRight: '10px', marginTop: '-10px' }}>
                  {renderStars(restaurant.rating)}
                </Typography>

                <Typography
                  variant="h5"
                  align="center"
                  gutterBottom
                  onClick={() => handleNavigate(restaurant)}
                  style={{ cursor: 'pointer' }}
                >
                  {restaurant.name}
                </Typography>

                <Typography variant="h6" style={{ marginLeft: '10px', marginTop: '-10px' }}>
                  {renderStars(restaurant.rating)}
                </Typography>
              </Box>

              {role === 'OWNER' && (
                <IconButton
                  onClick={() => handleDelete(restaurant.id)}
                  style={{ position: 'absolute', top: 10, right: 10 }}
                >
                  <Delete />
                </IconButton>
              )}

              <Box
                display="flex"
                alignItems="center"
                position="relative"
                width="100%"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <IconButton
                  onClick={() => scroll(restaurant.id, -1)}
                  style={{ position: 'absolute', left: 0, zIndex: 1 }}
                  disabled={getAllDishes(restaurant).length <= 4}
                >
                  <ArrowBack />
                </IconButton>

                <Box
                  ref={(el) => (scrollRefs.current[restaurant.id] = el)}
                  display="flex"
                  overflow="hidden"
                  flexWrap="nowrap"
                  style={{
                    marginLeft: 40,
                    marginRight: 40,
                    width: 'calc(100% - 80px)',
                    maxWidth: '100%',
                  }}
                >
                  {getAllDishes(restaurant).map((dish) => (
                    <Box key={`${restaurant.id}-${dish.id}`} flex="0 0 auto" width="200px" mr={2}>
                      <MilkCard milk={dish} />
                    </Box>
                  ))}
                </Box>

                <IconButton
                  onClick={() => scroll(restaurant.id, 1)}
                  style={{ position: 'absolute', right: 0, zIndex: 1 }}
                  disabled={getAllDishes(restaurant).length <= 4}
                >
                  <ArrowForward />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" align="center">
          No restaurants available.
        </Typography>
      )}
    </Grid>
  );
};

export default MilkList;
























