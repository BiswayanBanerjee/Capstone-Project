// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// const MilkDetail = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
  
  
//   console.log('Location state:', state);

//   const [quantity, setQuantity] = useState(1); // Default quantity is 1

//   // Check for milk data and set a flag
//   const hasMilkData = state && state.milk;
//   const milk = hasMilkData ? state.milk : null; // Milk details passed from MilkCard

//   // Handle increasing quantity
//   const increaseQuantity = () => {
//     setQuantity(prev => prev + 1);
//   };

//   // Handle decreasing quantity, ensuring it doesn’t go below 1
//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(prev => prev - 1);
//     }
//   };
//   const imageurl = "/" + milk["imageUrl"];


//   // Handle adding to cart
//   const addToCart = () => {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve existing cart from localStorage or initialize an empty array

//     // Add the selected milk product with the quantity
//     const updatedCart = [...cartItems, { ...milk, quantity }];
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
    

//     // Optionally, navigate to cart or show a message
//     navigate('/'); // Navigate to order form (cart) page
//   };

//   // Log milk object to verify correct data
//   console.log('Milk data:', milk);

//   return (
//     <div>
//       {hasMilkData ? (
//         <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
//           <CardMedia
//             component="img"
//             height="300"
//             image={imageurl}
//             alt={milk.productName}
//           />
//           <CardContent sx={{ textAlign: 'center' }}>
//             <Typography variant="h4" sx={{ mb: 2 }}>
//               {milk.productName}
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//               {milk.nutritionalValue}
//             </Typography>
//             <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
//               {milk.description}
//             </Typography>
//             <Typography variant="h5" sx={{ mb: 2 }}>
//               Price: Rs {milk.price}
//             </Typography>

//             {/* Quantity adjustment buttons */}
//             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
//               <IconButton onClick={decreaseQuantity} color="primary">
//                 <RemoveIcon />
//               </IconButton>
//               <Typography variant="h6" sx={{ mx: 2 }}>
//                 {quantity}
//               </Typography>
//               <IconButton onClick={increaseQuantity} color="primary">
//                 <AddIcon />
//               </IconButton>
//             </div>

//             {/* Add to Cart button */}
//             <Button
//               variant="contained"
//               color="primary"
//               startIcon={<ShoppingCartIcon />}
//               onClick={addToCart}
//             >
//               Add to Cart
//             </Button>
//           </CardContent>
//         </Card>
//       ) : (
//         <Typography variant="h4" align="center" sx={{ mt: 4 }}>
//           404 - Milk not found
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default MilkDetail;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Import jwtDecode as a named import

const MilkDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const hasMilkData = state && state.milk;
  const milk = hasMilkData ? state.milk : null;

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const imageurl = "/" + milk["imageUrl"];

  // Decode token to get user email
  const getUserEmailFromToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);  // Use jwtDecode
      return decodedToken.sub;
    }
    return null;
  };

  // Handle adding to cart with Axios PATCH request
  const addToCart = async () => {
    const userEmail = getUserEmailFromToken();
    if (!userEmail) {
      console.error("User is not logged in.");
      return;
    }
  
    try {
      // Step 1: Fetch the existing cart items
      const response = await axios.get(`http://localhost:8082/api/customers/${userEmail}/cart`);
      const existingCartItems = response.data || [];
  
      // Step 2: Create an array containing milk.id repeated based on the quantity
      const newItems = Array(quantity).fill(milk.id);
  
      // Step 3: Combine existing cart items with new items
      const updatedCartItems = [...existingCartItems, ...newItems];
  
      // Step 4: Send the updated cart items back to the server with a PATCH request
      await axios.patch(`http://localhost:8082/api/customers/${userEmail}/cart`, updatedCartItems);
  
      console.log('Cart updated successfully');
      navigate('/');
  
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  

  return (
    <div>
      {hasMilkData ? (
        <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 , mb: 4 }}>
          <CardMedia
            component="img"
            height="300"
            image={imageurl}
            alt={milk.productName}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
              {milk.productName}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {milk.nutritionalValue}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {milk.description}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Price: Rs {milk.price}
            </Typography>

            {/* Quantity adjustment buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '16px' }}>
              <IconButton onClick={decreaseQuantity} color="primary">
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6" sx={{ mx: 2 }}>
                {quantity}
              </Typography>
              <IconButton onClick={increaseQuantity} color="primary">
                <AddIcon />
              </IconButton>
            </div>

            {/* Add to Cart button */}
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              onClick={addToCart}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="h4" align="center" sx={{ mt: 4 }}>
          404 - Milk not found
        </Typography>
      )}
    </div>
  );
};

export default MilkDetail;






