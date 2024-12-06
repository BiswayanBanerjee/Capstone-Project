// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import { Typography, Grid, Box } from '@mui/material';
// import MilkCard from './MilkCard';

// const RestaurantView = () => {
//   const location = useLocation();
//   const restaurant = location.state ? location.state.restaurant : null;

//   // Check if restaurant data exists in state
//   if (!restaurant || !restaurant.dishes) {
//     return <Typography variant="h6">Restaurant or dishes not found.</Typography>;
//   }

//   // Function to render stars based on the rating
//   const renderStars = (rating) => {
//     const starCount = Math.floor(rating); // Get the whole number part of the rating
//     return [...Array(5)].map((_, index) => (
//       <span key={index} style={{ color: 'gold' }}>
//         {index < starCount ? '★' : '☆'} {/* Filled star or empty star */}
//       </span>
//     ));
//   };

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
//       <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '16px' }}>
//         {restaurant.name}
//       </Typography>

//       <Box mb={2} display="flex" justifyContent="center">
//         <Typography variant="h6">
//           {renderStars(restaurant.rating)} {/* Render the restaurant's rating */}
//         </Typography>
//       </Box>

//       {/* Centering the grid of MilkCards */}
//       <Grid container spacing={2} justifyContent="center" marginRight="-10%">
//         {restaurant.dishes.map((dish) => (
//           <Grid item key={dish.id} xs={12} sm={6} md={4}>
//             <MilkCard milk={dish} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default RestaurantView;

// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Typography, Grid, Box } from '@mui/material';
// import MilkCard from './MilkCard';
// import {jwtDecode} from 'jwt-decode';

// const RestaurantView = () => {
//   const location = useLocation();
//   const restaurant = location.state ? location.state.restaurant : null;
//   const [isOwner, setIsOwner] = useState(false);
//   const navigate = useNavigate(); // For navigation

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setIsOwner(decodedToken.role === 'OWNER');
//     }
//   }, []);

//   const renderStars = (rating) => {
//     const starCount = Math.floor(rating);
//     return [...Array(5)].map((_, index) => (
//       <span key={index} style={{ color: 'gold' }}>
//         {index < starCount ? '★' : '☆'}
//       </span>
//     ));
//   };

//   const handleDeleteDish = async (dishId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8081/api/restaurants/${restaurant.id}/dishes/${dishId}`,
//         {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       if (response.ok) {
//         // location.state.restaurant.dishes = location.state.restaurant.dishes.filter(
//         //   (dish) => dish.id !== dishId
//         // );
//         navigate('/');
//         window.location.reload();
//       } else {
//         console.error('Failed to delete dish');
//       }
//     } catch (error) {
//       console.error('Error deleting dish:', error);
//     }
//   };

//   if (!restaurant || !restaurant.dishes) {
//     return <Typography variant="h6">Restaurant or dishes not found.</Typography>;
//   }

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
//       <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '16px' }}>
//         {restaurant.name}
//       </Typography>

//       <Box mb={2} display="flex" justifyContent="center">
//         <Typography variant="h6">
//           {renderStars(restaurant.rating)}
//         </Typography>
//       </Box>

//       <Grid container spacing={2} justifyContent="center" marginRight="-10%">
//         {restaurant.dishes.map((dish) => (
//           <Grid item key={dish.id} xs={12} sm={6} md={4}>
//             <MilkCard milk={dish} isOwner={isOwner} onDelete={handleDeleteDish} />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default RestaurantView;



// In RestaurantView.js
// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Typography, Grid, Box } from '@mui/material';
// import MilkCard from './MilkCard';

// const RestaurantView = () => {
//   const location = useLocation();
//   const restaurant = location.state ? location.state.restaurant : null;
//   const role = location.state ? location.state.role : null;
//   const isOwner = role === 'OWNER';
//   const navigate = useNavigate(); // For navigation

//   const renderStars = (rating) => {
//     const starCount = Math.floor(rating);
//     return [...Array(5)].map((_, index) => (
//       <span key={index} style={{ color: 'gold' }}>
//         {index < starCount ? '★' : '☆'}
//       </span>
//     ));
//   };

//   const handleDeleteDish = async (dishId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8081/api/restaurants/${restaurant.id}/dishes/${dishId}`,
//         {
//           method: 'DELETE',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       if (response.ok) {
//         navigate('/');
//         window.location.reload();
//       } else {
//         console.error('Failed to delete dish');
//       }
//     } catch (error) {
//       console.error('Error deleting dish:', error);
//     }
//   };

//   if (!restaurant || !restaurant.dishes) {
//     return <Typography variant="h6">Restaurant or dishes not found.</Typography>;
//   }

//   return (
//     <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
//       <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '16px' }}>
//         {restaurant.name}
//       </Typography>

//       <Box mb={2} display="flex" justifyContent="center">
//         <Typography variant="h6">
//           {renderStars(restaurant.rating)}
//         </Typography>
//       </Box>

//       <Grid container spacing={2} justifyContent="center" marginRight="-10%">
//         {restaurant.dishes.map((dish) => (
//           <Grid item key={dish.id} xs={12} sm={6} md={4}>
//             <MilkCard milk={dish} isOwner={isOwner} onDelete={handleDeleteDish} restaurantId={restaurant.id}/>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// };

// export default RestaurantView;






import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Grid, Box, Card, CardContent, IconButton, TextField, Button, Checkbox, FormControlLabel, Slider, CardMedia } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MilkCard from './MilkCard';

const RestaurantView = () => {
  const location = useLocation();
  const restaurant = location.state ? location.state.restaurant : null;
  const role = location.state ? location.state.role : null;
  const isOwner = role === 'OWNER';
  const navigate = useNavigate();

  const [newDishData, setNewDishData] = useState({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    isVeg: false,
    rating: 1,
    isAvailable: true,
    discount: 0,
    isDiscountAvailable: false,
    category: '',
  });
  const [isAdding, setIsAdding] = useState(false);
  const [imagePath, setImagePath] = useState('');

  const renderStars = (rating) => {
    const starCount = Math.floor(rating);
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: 'gold' }}>
        {index < starCount ? '★' : '☆'}
      </span>
    ));
  };

  const handleDeleteDish = async (dishId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/api/restaurants/${restaurant.id}/dishes/${dishId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (response.ok) {
        navigate('/');
        window.location.reload();
      } else {
        console.error('Failed to delete dish');
      }
    } catch (error) {
      console.error('Error deleting dish:', error);
    }
  };

  const handleAddDish = async () => {
    try {
      const response = await fetch(`http://localhost:8081/api/restaurants/${restaurant.id}/dishes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newDishData),
      });

      if (response.ok) {
        setIsAdding(false);
        window.location.reload();
      } else {
        console.error('Failed to add new dish');
      }
    } catch (error) {
      console.error('Error adding new dish:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDishData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setNewDishData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      setImagePath(URL.createObjectURL(file));
      setNewDishData((prev) => ({
        ...prev,
        imageUrl: `dishes/${fileName}`,
      }));
    }
  };

  if (!restaurant || !restaurant.dishes) {
    return <Typography variant="h6">Restaurant or dishes not found.</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4} sx={{backgroundColor: 'background.paper', marginTop:'4'}}>
      <Typography variant="h4" align="center" gutterBottom style={{ marginBottom: '16px', marginTop:'55px' }}>
        {restaurant.name}
      </Typography>

      <Box mb={2} display="flex" justifyContent="center">
        <Typography variant="h6">
          {renderStars(restaurant.rating)}
        </Typography>
      </Box>

      <Grid container spacing={2} justifyContent="center" marginRight="-10%">
        {restaurant.dishes.map((dish) => (
          <Grid item key={dish.id} xs={12} sm={6} md={4} mb={4}>
            <MilkCard milk={dish} isOwner={isOwner} onDelete={handleDeleteDish} restaurantId={restaurant.id}/>
          </Grid>
        ))}

        {/* Empty MilkCard for Adding New Dish */}
        {isOwner && (
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                maxWidth: 315,
                padding: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
              }}
              onClick={() => setIsAdding(true)}
            >
              {!isAdding ? (
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IconButton color="primary" aria-label="add new dish">
                    <AddIcon sx={{ fontSize: 40 }} />
                  </IconButton>
                  <Typography variant="body1" color="textSecondary">
                    Add New Dish
                  </Typography>
                </CardContent>
              ) : (
                <>
                  <TextField
                    label="Name"
                    name="name"
                    value={newDishData.name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Description"
                    name="description"
                    value={newDishData.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Price"
                    name="price"
                    type="number"
                    value={newDishData.price}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />

                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ marginTop: 2 }}
                  >
                    Choose Image
                    <input type="file" hidden onChange={handleImageChange} />
                  </Button>
                  
                  {/* Image Preview */}
                  {imagePath && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={imagePath}
                      alt="Selected Image Preview"
                      sx={{ marginTop: 2, border: '1px solid #EEEEEE' }}
                    />
                  )}

                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isVeg"
                        checked={newDishData.isVeg}
                        onChange={handleInputChange}
                      />
                    }
                    label="Veg"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isAvailable"
                        checked={newDishData.isAvailable}
                        onChange={handleInputChange}
                      />
                    }
                    label="Available"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isDiscountAvailable"
                        checked={newDishData.isDiscountAvailable}
                        onChange={handleInputChange}
                      />
                    }
                    label="Discount Available"
                  />

                  <TextField
                    label="Discount (%)"
                    name="discount"
                    type="number"
                    value={newDishData.discount}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />
                  <TextField
                    label="Category"
                    name="category"
                    value={newDishData.category}
                    onChange={handleInputChange}
                    fullWidth
                    margin="dense"
                  />

                  <Typography gutterBottom>Rating</Typography>
                  <Slider
                    name="rating"
                    value={newDishData.rating}
                    onChange={handleSliderChange}
                    step={0.5}
                    marks
                    min={1}
                    max={5}
                    valueLabelDisplay="auto"
                  />

                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleAddDish}>
                      Add
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => setIsAdding(false)}>
                      Cancel
                    </Button>
                  </Box>
                </>
              )}
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default RestaurantView;













