// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { TextField, Button, Typography, Grid, Box, Card, CardContent, IconButton } from '@mui/material';
// import { Add, Remove, Delete } from '@mui/icons-material';

// const OrderForm = () => {
//   const { register, handleSubmit, formState: { errors }, trigger } = useForm();
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Fetch items from localStorage and update state
//   useEffect(() => {
//     const savedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     setCartItems(savedCartItems);
    
//     // Calculate total price
//     const total = savedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   }, []);

//   // Update cart data in local storage and state
//   const updateCart = (updatedCart) => {
//     setCartItems(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   // Handle quantity increment
//   const increaseQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity += 1;
//     updateCart(updatedCart);
//   };

//   // Handle quantity decrement
//   const decreaseQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     if (updatedCart[index].quantity > 1) {
//       updatedCart[index].quantity -= 1;
//       updateCart(updatedCart);
//     }
//   };

//   // Handle item deletion
//   const deleteItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     updateCart(updatedCart);
//   };

//   const onSubmit = async (data) => {
//     try {
//       await axios.post('http://localhost:8081/api/orders', {
//         ...data,
//         items: cartItems, // Include cart items in the order
//       });
//       // Clear cart on successful submission
//       localStorage.removeItem('cart');
//       setCartItems([]);
//       navigate('/order-success');
//     } catch (error) {
//       console.error("Order submission failed", error);
//     }
//   };

//   const validateField = async (field) => {
//     const result = await trigger(field);
//     if (!result) {
//       console.error(`${field} validation failed`);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
//       <Grid container spacing={4}>
//         {/* Cart Items Section */}
//         <Grid item xs={12} md={6}>
//           {cartItems.length > 0 ? (
//             <>
//               {cartItems.map((item, index) => (
//                 <Card key={index} sx={{ mb: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ mb: 1 }}>
//                       {item.productName}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Quantity: {item.quantity}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Price: Rs {item.price}
//                     </Typography>
//                     {/* Quantity Control Buttons */}
//                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//                       <IconButton onClick={() => decreaseQuantity(index)}>
//                         <Remove />
//                       </IconButton>
//                       <Typography>{item.quantity}</Typography>
//                       <IconButton onClick={() => increaseQuantity(index)}>
//                         <Add />
//                       </IconButton>
//                       {/* Delete Button */}
//                       <IconButton onClick={() => deleteItem(index)} sx={{ ml: 'auto' }}>
//                         <Delete />
//                       </IconButton>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))}
//               {/* Total Price Section */}
//               <Box sx={{ mt: 3 }}>
//                 <Typography variant="h6">
//                   Total Price: Rs {totalPrice.toFixed(2)}
//                 </Typography>
//               </Box>
//             </>
//           ) : (
//             <Typography variant="h6">No items in the cart</Typography>
//           )}
//         </Grid>

//         {/* Order Form */}
//         <Grid item xs={12} md={6}>
//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{
//               padding: 3,
//               backgroundColor: '#f9f4e8',
//               borderRadius: 2,
//               boxShadow: 3,
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Fill Details to place the order
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   variant="outlined"
//                   {...register('firstName', { required: 'First Name is required' })}
//                   error={!!errors.firstName}
//                   helperText={errors.firstName?.message}
//                   onBlur={() => validateField('firstName')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   variant="outlined"
//                   {...register('lastName', { required: 'Last Name is required' })}
//                   error={!!errors.lastName}
//                   helperText={errors.lastName?.message}
//                   onBlur={() => validateField('lastName')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   type="email"
//                   variant="outlined"
//                   {...register('email', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
//                       message: 'Invalid email address',
//                     },
//                   })}
//                   error={!!errors.email}
//                   helperText={errors.email?.message}
//                   onBlur={() => validateField('email')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   variant="outlined"
//                   {...register('phone', {
//                     required: 'Phone Number is required',
//                     pattern: {
//                       value: /^[7-9][0-9]{9}$/,
//                       message: 'Invalid phone number',
//                     },
//                   })}
//                   error={!!errors.phone}
//                   helperText={errors.phone?.message}
//                   onBlur={() => validateField('phone')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   variant="outlined"
//                   {...register('address', { required: 'Address is required' })}
//                   error={!!errors.address}
//                   helperText={errors.address?.message}
//                   onBlur={() => validateField('address')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   variant="outlined"
//                   {...register('city', { required: 'City is required' })}
//                   error={!!errors.city}
//                   helperText={errors.city?.message}
//                   onBlur={() => validateField('city')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="State"
//                   variant="outlined"
//                   {...register('state', { required: 'State is required' })}
//                   error={!!errors.state}
//                   helperText={errors.state?.message}
//                   onBlur={() => validateField('state')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Zip Code"
//                   variant="outlined"
//                   {...register('zipCode', {
//                     required: 'Zip Code is required',
//                     minLength: { value: 6, message: 'Zip Code should be 6 digits' },
//                   })}
//                   error={!!errors.zipCode}
//                   helperText={errors.zipCode?.message}
//                   onBlur={() => validateField('zipCode')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Additional Notes"
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                   {...register('description')}
//                 />
//               </Grid>
//               <Grid item xs={12} sx={{ textAlign: 'right' }}>
//                 <Button
//                   type="reset"
//                   variant="outlined"
//                   sx={{ mr: 2 }}
//                 >
//                   Reset
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={cartItems.length === 0} // Disable if no items in the cart
//                 >
//                   Submit Order
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default OrderForm;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   Grid,
//   IconButton,
//   Typography,
//   TextField
// } from '@mui/material';
// import { Add, Remove, Delete } from '@mui/icons-material';

// const OrderForm = ({ milk }) => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Decode the JWT to get user email
//   const getUserEmailFromToken = () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       return decodedToken.sub;
//     }
//     return null;
//   };

//   // Fetch cart items from the server
//   useEffect(() => {
//     const fetchCartItems = async () => {
//       const userEmail = getUserEmailFromToken();
//       if (!userEmail) {
//         console.error("User is not logged in.");
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:8082/api/customers/${userEmail}/cart`);
//         const cartData = response.data; // This should return a list of dish IDs

//         // Create a count of each dish ID
//         const itemCount = cartData.reduce((acc, id) => {
//           acc[id] = (acc[id] || 0) + 1;
//           return acc;
//         }, {});

//         // Check if milk and milk.dishes are defined
//         if (milk && milk.dishes) {
//           // Map dish IDs to their details
//           const enrichedCartItems = Object.keys(itemCount).map(dishId => {
//             const dish = milk.dishes.find(dish => dish.id === dishId); // Find the dish based on ID
//             if (dish) {
//               return {
//                 productId: dish.id,
//                 productName: dish.name,
//                 quantity: itemCount[dishId], // Use the aggregated quantity
//                 price: dish.price,
//               };
//             } else {
//               console.warn(`Dish with ID ${dishId} not found in milk.dishes`);
//               return null; // Return null if dish is not found
//             }
//           }).filter(item => item !== null); // Filter out any null items

//           setCartItems(enrichedCartItems);

//           // Calculate total price
//           const total = enrichedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//           setTotalPrice(total);
//         } else {
//           console.error("Milk data is not defined or missing dishes.");
//         }
//       } catch (error) {
//         console.error("Error fetching cart items:", error);
//       }
//     };

//     fetchCartItems();
//   }, [milk]);

//   // Handle quantity increment
//   const increaseQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity += 1;
//     updateCart(updatedCart);
//   };

//   // Handle quantity decrement
//   const decreaseQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     if (updatedCart[index].quantity > 1) {
//       updatedCart[index].quantity -= 1;
//       updateCart(updatedCart);
//     }
//   };

//   // Delete item from cart
//   const deleteItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     updateCart(updatedCart);
//   };

//   // Update cart data on the server
//   const updateCart = async (updatedCart) => {
//     const userEmail = getUserEmailFromToken();
//     const cartIds = updatedCart.flatMap(item => Array(item.quantity).fill(item.productId));
    
//     try {
//       await axios.patch(`http://localhost:8082/api/customers/${userEmail}/cart`, cartIds);
//       setCartItems(updatedCart);

//       // Update total price
//       const total = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//       setTotalPrice(total);
//     } catch (error) {
//       console.error("Error updating cart:", error);
//     }
//   };

//   // Handle form submission
//   const onSubmit = async (data) => {
//     try {
//       await axios.post('http://localhost:8081/api/orders', {
//         ...data,
//         items: cartItems,
//       });
//       // Clear cart on successful submission
//       const userEmail = getUserEmailFromToken();
//       await axios.patch(`http://localhost:8082/api/customers/${userEmail}/cart`, []); // Clears the cart
//       setCartItems([]);
//       navigate('/order-success');
//     } catch (error) {
//       console.error("Order submission failed", error);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
//       <Grid container spacing={4}>
//         {/* Cart Items Section */}
//         <Grid item xs={12} md={6}>
//           {cartItems.length > 0 ? (
//             <>
//               {cartItems.map((item, index) => (
//                 <Card key={index} sx={{ mb: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ mb: 1 }}>
//                       {item.productName}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Quantity: {item.quantity}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Price: Rs {item.price}
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//                       <IconButton onClick={() => decreaseQuantity(index)}>
//                         <Remove />
//                       </IconButton>
//                       <Typography>{item.quantity}</Typography>
//                       <IconButton onClick={() => increaseQuantity(index)}>
//                         <Add />
//                       </IconButton>
//                       <IconButton onClick={() => deleteItem(index)} sx={{ ml: 'auto' }}>
//                         <Delete />
//                       </IconButton>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))}
//               <Box sx={{ mt: 3 }}>
//                 <Typography variant="h6">
//                   Total Price: Rs {totalPrice.toFixed(2)}
//                 </Typography>
//               </Box>
//             </>
//           ) : (
//             <Typography variant="h6">No items in the cart</Typography>
//           )}
//         </Grid>

//         {/* Order Form Section */}
//         <Grid item xs={12} md={6}>
//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{
//               padding: 3,
//               backgroundColor: '#f9f4e8',
//               borderRadius: 2,
//               boxShadow: 3,
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Fill Details to Place the Order
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Name"
//                   fullWidth
//                   {...register("name", { required: true })}
//                   error={Boolean(errors.name)}
//                   helperText={errors.name ? "Name is required" : ""}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Address"
//                   fullWidth
//                   {...register("address", { required: true })}
//                   error={Boolean(errors.address)}
//                   helperText={errors.address ? "Address is required" : ""}
//                 />
//               </Grid>
//               {/* Add more fields as necessary */}
//               <Grid item xs={12}>
//                 <Button type="submit" variant="contained" color="primary">
//                   Place Order
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default OrderForm;



// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import { TextField, Button, Typography, Grid, Box, Card, CardContent, IconButton } from '@mui/material';
// import { Add, Remove, Delete } from '@mui/icons-material';
// import PropTypes from 'prop-types';

// const OrderForm = ({ milk }) => {
//   const { register, handleSubmit, formState: { errors }, trigger } = useForm();
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Decode JWT to get email as the user ID
//   const token = localStorage.getItem('token');
//   const decodedToken = jwtDecode(token);
//   const email = decodedToken.sub;

//   const fetchCartItems = async () => {
//     const userEmail = email; // Assume email is defined in your component
//     if (!userEmail) {
//       console.error("User is not logged in.");
//       return;
//     }
  
//     try {
//       const response = await axios.get(`http://localhost:8082/api/customers/${userEmail}/cart`);
//       const cartData = response.data; // Expected to be an array of dish IDs
//       console.log("Cart data fetched:", cartData);
  
//       // Count each dish ID
//       const itemCount = cartData.reduce((acc, id) => {
//         acc[id] = (acc[id] || 0) + 1;
//         return acc;
//       }, {});
  
//       // Check milk data
//       if (milk && Array.isArray(milk.dishes) && milk.dishes.length > 0) {
//         const enrichedCartItems = Object.keys(itemCount).map(dishId => {
//           const dish = milk.dishes.find(dish => dish.id === dishId);
//           if (dish) {
//             return {
//               productId: dish.id,
//               productName: dish.name,
//               quantity: itemCount[dishId],
//               price: dish.price,
//             };
//           } else {
//             console.warn(`Dish with ID ${dishId} not found in milk.dishes`);
//             return null;
//           }
//         }).filter(item => item !== null);
  
//         console.log("Enriched cart items:", enrichedCartItems);
//         setCartItems(enrichedCartItems);
  
//         // Calculate total price
//         const total = enrichedCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
//         setTotalPrice(total);
//       } else {
//         console.error("Milk data is not defined or missing dishes.");
//       }
//     } catch (error) {
//       console.error("Error fetching cart items:", error);
//     }
//   };
  

//   useEffect(() => {
//     fetchCartItems();
//   }, [milk]);

//   const increaseQuantity = (index) => {
//     const newCartItems = [...cartItems];
//     newCartItems[index].quantity += 1;
//     setCartItems(newCartItems);
//     updateTotalPrice(newCartItems);
//   };

//   const decreaseQuantity = (index) => {
//     const newCartItems = [...cartItems];
//     if (newCartItems[index].quantity > 1) {
//       newCartItems[index].quantity -= 1;
//       setCartItems(newCartItems);
//       updateTotalPrice(newCartItems);
//     }
//   };

//   const deleteItem = (index) => {
//     const newCartItems = cartItems.filter((_, i) => i !== index);
//     setCartItems(newCartItems);
//     updateTotalPrice(newCartItems);
//   };

//   const updateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     setTotalPrice(total);
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
//       <Grid container spacing={4}>
//         {/* Cart Items Section */}
//         <Grid item xs={12} md={6}>
//           {cartItems.length > 0 ? (
//             <>
//               {cartItems.map((item, index) => (
//                 <Card key={index} sx={{ mb: 2 }}>
//                   <CardContent>
//                     <Typography variant="h6" sx={{ mb: 1 }}>
//                       {item.productName}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Quantity: {item.quantity}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Price: Rs {item.price}
//                     </Typography>
//                     {/* Quantity Control Buttons */}
//                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//                       <IconButton onClick={() => decreaseQuantity(index)}>
//                         <Remove />
//                       </IconButton>
//                       <Typography>{item.quantity}</Typography>
//                       <IconButton onClick={() => increaseQuantity(index)}>
//                         <Add />
//                       </IconButton>
//                       {/* Delete Button */}
//                       <IconButton onClick={() => deleteItem(index)} sx={{ ml: 'auto' }}>
//                         <Delete />
//                       </IconButton>
//                     </Box>
//                   </CardContent>
//                 </Card>
//               ))}
//               {/* Total Price Section */}
//               <Box sx={{ mt: 3 }}>
//                 <Typography variant="h6">
//                   Total Price: Rs {totalPrice.toFixed(2)}
//                 </Typography>
//               </Box>
//             </>
//           ) : (
//             <Typography variant="h6">No items in the cart</Typography>
//           )}
//         </Grid>

//         {/* Order Form */}
//         <Grid item xs={12} md={6}>
//           {/* Placeholder for Order Form content */}
//           <Typography variant="h5">Order Form</Typography>
//           {/* Additional form fields can go here */}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// OrderForm.propTypes = {
//   milk: PropTypes.shape({
//     dishes: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         name: PropTypes.string.isRequired,
//         price: PropTypes.number.isRequired,
//       })
//     ).isRequired,
//   }).isRequired,
// };

// export default OrderForm;



// import React, { useEffect, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode'; // Ensure jwt-decode is correctly imported
// import { TextField, Button, Typography, Grid, Box, Card, CardContent, IconButton } from '@mui/material';
// import { Add, Remove, Delete } from '@mui/icons-material';

// const OrderForm = () => {
//   const { register, handleSubmit, formState: { errors }, trigger } = useForm();
//   const navigate = useNavigate();
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [totalDiscount, setTotalDiscount] = useState(0);
//   const customerId = jwtDecode(localStorage.getItem('token')).sub;

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       const token = localStorage.getItem('token');

//       if (!token) {
//         console.error("No token found in local storage.");
//         return;
//       }

//       try {
//         const cartResponse = await axios.get(`http://localhost:8082/api/customers/${customerId}/cart`);
//         const cartData = cartResponse.data;

//         const itemCounts = {};
//         cartData.forEach((itemId) => {
//           itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
//         });

//         const dishesResponse = await axios.get('http://localhost:8081/api/restaurants/dishes');
//         const allDishes = dishesResponse.data;

//         const cartItemsWithDetails = Object.keys(itemCounts).map((id) => {
//           const dish = allDishes.find(dish => dish.id === id);
//           return { ...dish, quantity: itemCounts[id] };
//         }).filter(item => item !== undefined);

//         setCartItems(cartItemsWithDetails);
//         calculateTotalPrice(cartItemsWithDetails);
//       } catch (error) {
//         console.error("Failed to fetch cart items", error);
//       }
//     };

//     fetchCartItems();
//   }, [customerId]);

//   const calculateTotalPrice = (items) => {
//     const total = items.reduce((acc, item) => {
//       const itemTotalPrice = item.price * item.quantity;
//       const itemTotalDiscount = item.discount * item.quantity;
//       return acc + (itemTotalPrice - itemTotalDiscount);
//     }, 0);
    
//     const discount = items.reduce((acc, item) => acc + (item.discount * item.quantity), 0);
    
//     setTotalPrice(total);
//     setTotalDiscount(discount);
//   };

//   const updateCart = async (updatedCart) => {
//     try {
//       await axios.patch(`http://localhost:8082/api/customers/${customerId}/cart`, updatedCart);
//     } catch (error) {
//       console.error("Failed to update cart", error);
//     }
//   };

//   const increaseQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     updatedCart[index].quantity += 1;
//     setCartItems(updatedCart);
//     calculateTotalPrice(updatedCart);
//     updateCart(updatedCart.flatMap(item => Array(item.quantity).fill(item.id)));
//   };

//   const decreaseQuantity = (index) => {
//     const updatedCart = [...cartItems];
//     if (updatedCart[index].quantity > 1) {
//       updatedCart[index].quantity -= 1;
//       setCartItems(updatedCart);
//       calculateTotalPrice(updatedCart);
//       updateCart(updatedCart.flatMap(item => Array(item.quantity).fill(item.id)));
//     } else {
//       deleteItem(index);
//     }
//   };

//   const deleteItem = (index) => {
//     const updatedCart = cartItems.filter((_, i) => i !== index);
//     setCartItems(updatedCart);
//     calculateTotalPrice(updatedCart);
//     updateCart(updatedCart.flatMap(item => Array(item.quantity).fill(item.id)));
//   };

//   const onSubmit = async (data) => {
//     try {
//       await axios.patch(`http://localhost:8082/api/customers/${customerId}/orders`, {
//         ...data,
//         items: cartItems,
//       });
//       localStorage.removeItem('cart');
//       setCartItems([]);
//       navigate('/order-success');
//     } catch (error) {
//       console.error("Order submission failed", error);
//     }
//   };

//   const validateField = async (field) => {
//     const result = await trigger(field);
//     if (!result) {
//       console.error(`${field} validation failed`);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={12} md={6}>
//           {cartItems.length > 0 ? (
//             <>
//               {cartItems.map((item, index) => {
//                 const originalPrice = item.price * item.quantity; // Total original price for this quantity
//                 const totalDiscount = item.discount * item.quantity; // Total discount for this quantity
//                 const priceAfterDiscount = originalPrice - totalDiscount; // Price after applying the total discount
//                 const totalDiscountPercentage = (totalDiscount / originalPrice) * 100; // Total discount percentage based on the original price

//                 return (
//                   <Card key={item.id} sx={{ mb: 2 }}>
//                     <CardContent>
//                       <Grid container spacing={2}>
//                         <Grid item xs={4}>
//                           <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '4px' }} />
//                         </Grid>
//                         <Grid item xs={8}>
//                           <Typography variant="h6" sx={{ mb: 1 }}>
//                             {item.name}
//                           </Typography>
//                           {/* <Typography variant="body1" color="text.secondary">
//                             Quantity: {item.quantity}
//                           </Typography> */}
//                           <Typography variant="body1" color="text.secondary">
//                             Original Price: Rs {originalPrice.toFixed(2)} {/* Display total original price based on quantity */}
//                           </Typography>
//                           <Typography variant="body1" color="text.secondary">
//                             Discount:  Rs {totalDiscount.toFixed(2)} ( Percentage: {totalDiscountPercentage.toFixed(2)}% )
//                           </Typography>
//                           <Typography variant="body1" color="text.secondary">
//                             Price After Discount: Rs {priceAfterDiscount.toFixed(2)}
//                           </Typography>
//                           <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//                             <IconButton onClick={() => decreaseQuantity(index)}>
//                               <Remove />
//                             </IconButton>
//                             <Typography>{item.quantity}</Typography>
//                             <IconButton onClick={() => increaseQuantity(index)}>
//                               <Add />
//                             </IconButton>
//                             <IconButton onClick={() => deleteItem(index)} sx={{ ml: 'auto' }}>
//                               <Delete />
//                             </IconButton>
//                           </Box>
//                         </Grid>
//                       </Grid>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//               <Box sx={{ mt: 3 }}>
//                 <Typography variant="h6">
//                   Total Discount: Rs {totalDiscount.toFixed(2)}
//                 </Typography>
//                 <Typography variant="h6">
//                   Total Price After Discount: Rs {totalPrice.toFixed(2)}
//                 </Typography>
//               </Box>
//             </>
//           ) : (
//             <Typography variant="h6">No items in the cart</Typography>
//           )}
//         </Grid>

//         {/* Order Form */}
//          <Grid item xs={12} md={6}>
//            <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmit)}
//             sx={{
//               padding: 3,
//               backgroundColor: '#f9f4e8',
//               borderRadius: 2,
//               boxShadow: 3,
//             }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Fill Details to place the order
//             </Typography>
//             <Grid container spacing={2}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="First Name"
//                   variant="outlined"
//                   {...register('firstName', { required: 'First Name is required' })}
//                   error={!!errors.firstName}
//                   helperText={errors.firstName?.message}
//                   onBlur={() => validateField('firstName')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Last Name"
//                   variant="outlined"
//                   {...register('lastName', { required: 'Last Name is required' })}
//                   error={!!errors.lastName}
//                   helperText={errors.lastName?.message}
//                   onBlur={() => validateField('lastName')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Email"
//                   type="email"
//                   variant="outlined"
//                   {...register('email', {
//                     required: 'Email is required',
//                     pattern: {
//                       value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
//                       message: 'Invalid email address',
//                     },
//                   })}
//                   error={!!errors.email}
//                   helperText={errors.email?.message}
//                   onBlur={() => validateField('email')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   label="Phone Number"
//                   variant="outlined"
//                   {...register('phone', {
//                     required: 'Phone Number is required',
//                     pattern: {
//                       value: /^[7-9][0-9]{9}$/,
//                       message: 'Invalid phone number',
//                     },
//                   })}
//                   error={!!errors.phone}
//                   helperText={errors.phone?.message}
//                   onBlur={() => validateField('phone')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Address"
//                   variant="outlined"
//                   {...register('address', { required: 'Address is required' })}
//                   error={!!errors.address}
//                   helperText={errors.address?.message}
//                   onBlur={() => validateField('address')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="City"
//                   variant="outlined"
//                   {...register('city', { required: 'City is required' })}
//                   error={!!errors.city}
//                   helperText={errors.city?.message}
//                   onBlur={() => validateField('city')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="State"
//                   variant="outlined"
//                   {...register('state', { required: 'State is required' })}
//                   error={!!errors.state}
//                   helperText={errors.state?.message}
//                   onBlur={() => validateField('state')}
//                 />
//               </Grid>
//               <Grid item xs={12} md={4}>
//                 <TextField
//                   fullWidth
//                   label="Post Code"
//                   variant="outlined"
//                   {...register('postCode', {
//                     required: 'Post Code is required',
//                     minLength: { value: 6, message: 'Post Code should be 6 digits' },
//                   })}
//                   error={!!errors.postCode}
//                   helperText={errors.postCode?.message}
//                   onBlur={() => validateField('postCode')}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   fullWidth
//                   label="Additional Notes"
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                   {...register('description')}
//                 />
//               </Grid>
//               <Grid item xs={12} sx={{ textAlign: 'right' }}>
//                 <Button
//                   type="reset"
//                   variant="outlined"
//                   sx={{ mr: 2 }}
//                 >
//                   Reset
//                 </Button>
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   disabled={cartItems.length === 0} // Disable if no items in the cart
//                 >
//                   Submit Order
//                 </Button>
//               </Grid>
//             </Grid>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default OrderForm;








import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const OrderForm = () => {
  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const customerId = jwtDecode(localStorage.getItem('token')).sub;
  const theme = useTheme(); // Get the current theme
  

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(`http://localhost:8082/api/customers/${customerId}`);
        const customerData = response.data;

        // Set form values if customer data is available
        setValue('firstName', customerData.firstName || '');
        setValue('lastName', customerData.lastName || '');
        setValue('email', customerData.email || '');
        setValue('phone', customerData.phone || '');
        setAddresses(customerData.customerAddress || []); // Fetch addresses

      } catch (error) {
        console.error("Failed to fetch customer data", error);
      }
    };

    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error("No token found in local storage.");
        return;
      }

      try {
        const cartResponse = await axios.get(`http://localhost:8082/api/customers/${customerId}/cart`);
        const cartData = cartResponse.data;

        const itemCounts = {};
        cartData.forEach((itemId) => {
          itemCounts[itemId] = (itemCounts[itemId] || 0) + 1;
        });

        const dishesResponse = await axios.get('http://localhost:8081/api/restaurants/dishes');
        const allDishes = dishesResponse.data;

        const cartItemsWithDetails = Object.keys(itemCounts).map((id) => {
          const dish = allDishes.find(dish => dish.id === id);
          return { ...dish, quantity: itemCounts[id] };
        }).filter(item => item !== undefined);

        setCartItems(cartItemsWithDetails);
        calculateTotalPrice(cartItemsWithDetails);
      } catch (error) {
        console.error("Failed to fetch cart items", error);
      }
    };

    fetchCustomerData();
    fetchCartItems();
  }, [customerId, setValue]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => {
      const itemTotalPrice = item.price * item.quantity;
      const itemTotalDiscount = item.discount * item.quantity;
      return acc + (itemTotalPrice - itemTotalDiscount);
    }, 0);
    
    const discount = items.reduce((acc, item) => acc + (item.discount * item.quantity), 0);
    
    setTotalPrice(total);
    setTotalDiscount(discount);
  };

  const updateCart = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:8082/api/customers/${customerId}/cart`, updatedCart);
    } catch (error) {
      console.error("Failed to update cart", error);
    }
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
    updateCart(updatedCart.flatMap(item => Array(item.quantity).fill(item.id)));
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCartItems(updatedCart);
      calculateTotalPrice(updatedCart);
      updateCart(updatedCart.flatMap(item => Array(item.quantity).fill(item.id)));
    } else {
      deleteItem(index);
    }
  };

  const deleteItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    calculateTotalPrice(updatedCart);
    updateCart(updatedCart.flatMap(item => Array(item.quantity).fill(item.id)));
  };

  const handleAddressChange = (event) => {
    const selectedAddressIndex = event.target.value;
    const selectedAddress = addresses[selectedAddressIndex];
    
    // Ensure selectedAddress is defined before accessing its properties
    if (selectedAddress) {
      const fullAddress = `${selectedAddress.house_number} ${selectedAddress.street}`; // Combine houseNo and area
      setValue('deliveryAddress', fullAddress); // Autofill full address
      setValue('city', selectedAddress.city || ''); // Autofill area as city
      setValue('state', selectedAddress.state || ''); // Autofill state
      setValue('postCode', selectedAddress.postcode.toString() || ''); // Autofill postcode (converted to string)
      setValue('country', selectedAddress.country || ''); // Autofill country
    }
  };

  const onSubmit = async (data) => {
    try {
        // Fetch the current orders for the customer to determine the new orderId
        const ordersResponse = await axios.get(`http://localhost:8082/api/customers/${customerId}/orders`);
        const currentOrders = ordersResponse.data;

        // Determine the next orderId (starting from 1)
        const newOrderId = currentOrders.length + 1; // Order IDs start from 1

        // Create the new CustomerOrders object
        const newCustomerOrder = {
            orderId: newOrderId.toString(), // Convert to string if necessary
            customerEmail: customerId,
            dishIds: cartItems.map(item => item.id), // List of dish IDs
            totalAmount: totalPrice,
            deliveryAddress: data.deliveryAddress,
            status: "orderAccepted", // Example status
            orderDate: new Date().toISOString(), // Current date and time
            deliveryInstruction: data.description,
            customerOrders: cartItems.reduce((acc, item) => {
                acc[item.id] = item.quantity; // Assuming item.id is the dish ID
                return acc;
            }, {}),
        };

        // Send the new order as a single object (not wrapped in an array)
        await axios.patch(`http://localhost:8082/api/customers/${customerId}/orders`, newCustomerOrder);
        
        // Clear the cart and navigate to the success page
        localStorage.removeItem('cart');
        setCartItems([]);
        navigate('/order-success');
    } catch (error) {
        console.error("Order submission failed", error);
    }
};

  
  
  
  const validateField = async (field) => {
    const result = await trigger(field);
    if (!result) {
      console.error(`${field} validation failed`);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 ,  
      color: theme.palette.text.primary }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item, index) => (
                <Card key={item.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '4px' }} />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          {item.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Original Price: Rs {(item.price * item.quantity).toFixed(2)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Discount: Rs {(item.discount * item.quantity).toFixed(2)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          Price After Discount: Rs {(item.price * item.quantity - item.discount * item.quantity).toFixed(2)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                          <IconButton onClick={() => decreaseQuantity(index)}>
                            <Remove />
                          </IconButton>
                          <Typography>{item.quantity}</Typography>
                          <IconButton onClick={() => increaseQuantity(index)}>
                            <Add />
                          </IconButton>
                          <IconButton onClick={() => deleteItem(index)} sx={{ ml: 'auto' }}>
                            <Delete />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">
                  Total Discount: Rs {totalDiscount.toFixed(2)}
                </Typography>
                <Typography variant="h6">
                  Total Price After Discount: Rs {totalPrice.toFixed(2)}
                </Typography>
              </Box>
            </>
          ) : (
            <Typography variant="h6">No items in the cart</Typography>
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
              padding: 3,
              
              borderRadius: 2,
              boxShadow: 3,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Order Form
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  variant="outlined"
                  {...register('firstName', { required: 'First Name is required' })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                  onBlur={() => validateField('firstName')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  variant="outlined"
                  {...register('lastName', { required: 'Last Name is required' })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                  onBlur={() => validateField('lastName')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  onBlur={() => validateField('email')}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  variant="outlined"
                  {...register('phone', {
                    required: 'Phone Number is required',
                    pattern: {
                      value: /^[7-9][0-9]{9}$/,
                      message: 'Invalid phone number',
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  onBlur={() => validateField('phone')}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="address-select-label">Select Address</InputLabel>
                  <Select
                    labelId="address-select-label"
                    onChange={handleAddressChange}
                    defaultValue=""
                  >
                    <MenuItem value="" disabled>Select Address</MenuItem>
                    {addresses.map((address, index) => (
                      <MenuItem key={index} value={index}>
                        {`${address.house_number} ${address.city}, ${address.state} - ${address.postcode}, ${address.country}`}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Delivery Address"
                  variant="outlined"
                  {...register('deliveryAddress', { required: 'Delivery Address is required' })}
                  error={!!errors.deliveryAddress}
                  helperText={errors.deliveryAddress?.message}
                  onBlur={() => validateField('deliveryAddress')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  variant="outlined"
                  {...register('city', { required: 'City is required' })}
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  onBlur={() => validateField('city')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="State"
                  variant="outlined"
                  {...register('state', { required: 'State is required' })}
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  onBlur={() => validateField('state')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Post Code"
                  variant="outlined"
                  {...register('postCode', {
                    required: 'Post Code is required',
                    minLength: { value: 6, message: 'Post Code should be 6 digits' },
                  })}
                  error={!!errors.postCode}
                  helperText={errors.postCode?.message}
                  onBlur={() => validateField('postCode')}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Country"
                  variant="outlined"
                  {...register('country', { required: 'Country is required' })}
                  error={!!errors.country}
                  helperText={errors.country?.message}
                  onBlur={() => validateField('country')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Additional Notes"
                  variant="outlined"
                  multiline
                  rows={4}
                  {...register('description')}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'right' }}>
                <Button
                  type="reset"
                  variant="outlined"
                  sx={{ mr: 2 }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={cartItems.length === 0}
                >
                  Submit Order
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrderForm;




















