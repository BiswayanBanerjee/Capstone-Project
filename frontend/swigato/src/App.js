// import React, { useState, useEffect } from 'react';
// import { Routes, Route, useParams } from 'react-router-dom'; // No need to import Router here
// import axios from 'axios';
// import { Box } from '@mui/material';
// import Navbar from './component/Navbar';
// import Header from './component/Header';
// import MilkManager from './component/MilkManager';
// import Footer from './component/Footer';
// import OrderForm from './component/OrderForm';
// import Login from './component/Login';
// import SignUp from './component/SignUp';
// import PrivateRoute from './component/PrivateRoute';
// import MilkDetail from './component/MilkDetail';
// import Profile from './component/Profile';
// import RestaurantView from './component/RestaurantView';
// import  darkTheme  from './theme';
// import { ThemeProvider, CssBaseline , createTheme} from '@mui/material'; // Change here
// import useAppTheme from './theme';

// const App = () => {
//   const [milk, setMilk] = useState([]);
//   const [filteredMilk, setFilteredMilk] = useState([]);
//   const [error, setError] = useState(null);
//   const theme = useAppTheme();
//   const [themePreference, setThemePreference] = useState(localStorage.getItem('themePreference') || 'system');

//   useEffect(() => {
//     const url = "http://localhost:8081/api/restaurants";
//     let isMounted = true;

//     const fetchMilkData = async () => {
//       try {
//         const response = await axios.get(url);
//         if (isMounted) {
//           setMilk(response.data);
//           setFilteredMilk(response.data);
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError('Failed to fetch milk data');
//         }
//       }
//     };

//     fetchMilkData();
//     return () => {
//       isMounted = false; // Cleanup to prevent memory leaks
//     };
//   }, []);

//   // const handleFilterMilk = (category) => {
//   //   if (category === "ALL") {
//   //     setFilteredMilk(milk);
//   //   } else {
//   //     setFilteredMilk(milk.filter(item => item.category.toLowerCase().includes(category.toLowerCase())));
//   //   }
//   // };

//   // if (error) {
//   //   return <div>Error: {error}</div>;
//   // }

//     // Updated handleFilterMilk function
//     // const handleFilterMilk = (category) => {
//     //   if (category === "ALL") {
//     //     setFilteredMilk(milk.flatMap(restaurant => restaurant.dishes)); // all dishes from all restaurants
//     //   } else {
//     //     setFilteredMilk(
//     //       milk
//     //         .flatMap(restaurant => restaurant.dishes) // flatten to access all dishes
//     //         .filter(dish => dish.category || dish.category.toLowerCase() === category.toLowerCase())
//     //     );
//     //   }
//     // };
  
//     // if (error) {
//     //   return <div>Error: {error}</div>;
//     // }


//     const getTheme = () => {
//       if (themePreference === 'light') {
//         return createTheme({
//           palette: {
//             mode: 'light',
//           },
//         });
//       } else if (themePreference === 'dark') {
//         return createTheme({
//           palette: {
//             mode: 'dark',
//           },
//         });
//       } else {
//         const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
//         return createTheme({
//           palette: {
//             mode: prefersDark ? 'dark' : 'light',
//           },
//         });
//       }
//     };
  
//     // const theme = getTheme();
  
//     useEffect(() => {
//       localStorage.setItem('themePreference', themePreference); // Persist theme preference
//     }, [themePreference]);

//     const handleFilterMilk = (category) => {
//       if (category === "ALL") {
//           setFilteredMilk(milk); // return all restaurants with their dishes
//       } else {
//           const filteredRestaurants = milk.map(restaurant => {
//               // Filter the dishes based on the selected category
//               const filteredDishes = restaurant.dishes.filter(dish => 
//                   dish.category && dish.category.toLowerCase() === category.toLowerCase()
//               );
  
//               // Return a new restaurant object with the filtered dishes
//               return {
//                   ...restaurant,
//                   dishes: filteredDishes // only keep dishes that match the category
//               };
//           }).filter(restaurant => restaurant.dishes.length > 0); // Only include restaurants with matching dishes
  
//           setFilteredMilk(filteredRestaurants); // Set the state with filtered restaurants
//       }
//   };
  
//   // Error handling remains unchanged
//   if (error) {
//       return <div>Error: {error}</div>;
//   }


//  // New function for Header search with enhanced search criteria
// const handleHeaderSearch = (searchTerm) => {
//   if (!searchTerm || searchTerm.toLowerCase() === "all") {
//     // If the search term is empty or "ALL", return all items
//     setFilteredMilk(milk);
//   } else {
//     const filteredRestaurants = milk
//       .map((restaurant) => {
//         // Check if the restaurant name matches the search term
//         const restaurantMatches = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());

//         // Filter dishes based on category or dish name matching the search term
//         const filteredDishes = restaurant.dishes.filter((dish) => 
//           dish.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
//           dish.name.toLowerCase().includes(searchTerm.toLowerCase())
//         );

//         // Include the restaurant if it matches or has matching dishes
//         if (restaurantMatches || filteredDishes.length > 0) {
//           return {
//             ...restaurant,
//             dishes: filteredDishes
//           };
//         }
//         return null; // Exclude restaurant if it and its dishes don't match
//       })
//       .filter((restaurant) => restaurant !== null); // Filter out null values

//     // Update the state with the filtered results
//     setFilteredMilk(filteredRestaurants);
//   }
// };


  

//   return (
//     <ThemeProvider theme={theme}>
//     {/* <CssBaseline /> */}
//     <Box className="App" sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
//        <Header products={milk} onSearchMilk={handleHeaderSearch} setThemePreference={setThemePreference} />
//       <Navbar products={milk} onSearchMilk={handleFilterMilk} />
//       <Routes>
//         <Route path="/" element={<MilkManager products={filteredMilk} />} />
//         <Route path="/milk/:milkId" element={<MilkDetail milk={milk} />} />
//         <Route path="/order" element={<PrivateRoute><OrderPage milk={milk} /></PrivateRoute>} />
//         <Route path="/checkout" element={<PrivateRoute><OrderForm milk={filteredMilk} /></PrivateRoute>} />
//         <Route path="/order-success" element={<OrderSuccess />} />
//         <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
        
//         {/* <Route exact path="/" component={() => <MilkList restaurants={filteredMilk} />} /> */}
//         {/* <Route path="/restaurant/:id" element={RestaurantView} /> */}
//         <Route path="/restaurant/:id" element={<RestaurantView />} />

        
//         <Route path="*" element={<div>404 - Page Not Found</div>} />
//       </Routes>
//       <Footer />
//     </Box>
//     </ThemeProvider>
//   );
// };

// // return (
// //   <ThemeProvider theme={darkTheme}>
// //     <CssBaseline />
// //     <Box className="App">
// //       <Header products={milk} onSearchMilk={handleHeaderSearch} />
// //       <Navbar products={milk} onSearchMilk={handleFilterMilk} />
// //       <Routes>
// //         <Route path="/" element={<MilkManager products={filteredMilk} />} />
// //         <Route path="/milk/:milkId" element={<MilkDetail milk={milk} />} />
// //         <Route path="/order" element={<PrivateRoute><OrderPage milk={milk} /></PrivateRoute>} />
// //         <Route path="/checkout" element={<PrivateRoute><OrderForm milk={filteredMilk} /></PrivateRoute>} />
// //         <Route path="/order-success" element={<OrderSuccess />} />
// //         <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
// //         <Route path="/login" element={<Login />} />
// //         <Route path="/signup" element={<SignUp />} />
// //         <Route path="/restaurant/:id" element={<RestaurantView />} />
// //         <Route path="*" element={<div>404 - Page Not Found</div>} />
// //       </Routes>
// //       <Footer />
// //     </Box>
// //   </ThemeProvider>
// // );
// // };

// // Order Success Component
// const OrderSuccess = () => {
//   return (
//     <Box sx={{ textAlign: 'center', p: 3 }}>
//       <h2>Order Placed Successfully!</h2>
//       <p>Thank you for your order. You will receive a confirmation email shortly.</p>
//     </Box>
//   );
// };

// // Order Page Component
// const OrderPage = ({ milk }) => {
//   const { milkId } = useParams();
//   const selectedMilk = milk.find(item => item.id.toString() === milkId);

//   if (!selectedMilk) {
//     return <Box sx={{ textAlign: 'center', p: 3 }}>Milk not found</Box>;
//   }

//   return <OrderForm milk={selectedMilk} />;
// };

// export default App;


import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/material';
import Navbar from './component/Navbar';
import Header from './component/Header';
import MilkManager from './component/MilkManager';
import Footer from './component/Footer';
import OrderForm from './component/OrderForm';
import Login from './component/Login';
import SignUp from './component/SignUp';
import PrivateRoute from './component/PrivateRoute';
import MilkDetail from './component/MilkDetail';
import Profile from './component/Profile';
import RestaurantView from './component/RestaurantView';
import useAppTheme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

const App = () => {
  const [milk, setMilk] = useState([]);
  const [filteredMilk, setFilteredMilk] = useState([]);
  const [error, setError] = useState(null);
  const { theme, setThemePreference } = useAppTheme(); // Get theme and setter from the hook

  useEffect(() => {
    // const url = "http://localhost:8081/api/restaurants";
    const url = "https://capstone-project-production-30c8.up.railway.app/api/restaurants";
    let isMounted = true;

    const fetchMilkData = async () => {
      try {
        const response = await axios.get(url);
        if (isMounted) {
          setMilk(response.data);
          setFilteredMilk(response.data);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch milk data');
        }
      }
    };

    fetchMilkData();
    return () => {
      isMounted = false; // Cleanup to prevent memory leaks
    };
  }, []);

  // Error handling
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Handle filtering milk based on categories
  const handleFilterMilk = (category) => {
    if (category === "ALL") {
      setFilteredMilk(milk); // return all restaurants with their dishes
    } else {
      const filteredRestaurants = milk.map(restaurant => {
        const filteredDishes = restaurant.dishes.filter(dish =>
          dish.category && dish.category.toLowerCase() === category.toLowerCase()
        );

        return {
          ...restaurant,
          dishes: filteredDishes
        };
      }).filter(restaurant => restaurant.dishes.length > 0); // Only include restaurants with matching dishes

      setFilteredMilk(filteredRestaurants);
    }
  };

  // New function for Header search
  const handleHeaderSearch = (searchTerm) => {
    if (!searchTerm || searchTerm.toLowerCase() === "all") {
      setFilteredMilk(milk);
    } else {
      const filteredRestaurants = milk
        .map((restaurant) => {
          const restaurantMatches = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());
          const filteredDishes = restaurant.dishes.filter((dish) =>
            dish.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            dish.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

          if (restaurantMatches || filteredDishes.length > 0) {
            return {
              ...restaurant,
              dishes: filteredDishes
            };
          }
          return null; // Exclude restaurant if it and its dishes don't match
        })
        .filter((restaurant) => restaurant !== null); // Filter out null values

      setFilteredMilk(filteredRestaurants);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Uncomment this to apply global styles */}
      <Box className="App" sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Header products={milk} onSearchMilk={handleHeaderSearch} setThemePreference={setThemePreference} />
        <Navbar products={milk} onSearchMilk={handleFilterMilk} />
        <Routes>
          <Route path="/" element={<MilkManager products={filteredMilk} />} />
          <Route path="/milk/:milkId" element={<MilkDetail milk={milk} />} />
          <Route path="/order" element={<PrivateRoute><OrderPage milk={milk} /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><OrderForm milk={filteredMilk} /></PrivateRoute>} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/restaurant/:id" element={<RestaurantView />} />
          <Route path="*" element={<div>404 - Page Not Found</div>} />
        </Routes>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

// Order Success Component
const OrderSuccess = () => {
  return (
    <Box sx={{ textAlign: 'center', p: 3 }}>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for your order. You will receive a confirmation email shortly.</p>
    </Box>
  );
};

// Order Page Component
const OrderPage = ({ milk }) => {
  const { milkId } = useParams();
  const selectedMilk = milk.find(item => item.id.toString() === milkId);

  if (!selectedMilk) {
    return <Box sx={{ textAlign: 'center', p: 3 }}>Milk not found</Box>;
  }

  return <OrderForm milk={selectedMilk} />;
};

export default App;

