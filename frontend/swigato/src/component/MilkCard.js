// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography } from '@mui/material';

// const MilkCard = ({ milk }) => {
//   const navigate = useNavigate();

//   const handleCardClick = () => {
//     const token = localStorage.getItem('token'); // Check if user is logged in
//     if (token) {
//       // Navigate to milk-details page for authenticated users
//       navigate(`/milk/${milk.id}`, { state: { milk } });
//     } else {
//       // Redirect to login if not authenticated
//       navigate('/login');
//     }
//   };

//   return (
//     <Card
//       sx={{
//         maxWidth: 345,
//         cursor: 'pointer',
//         transition: 'transform 0.3s',
//         '&:hover': {
//           transform: 'scale(1.05)',
//         },
//       }}
//       onClick={handleCardClick}
//     >
//       <CardMedia
//         component="img"
//         height="200"
//         image={milk.imageUrl}
//         alt={milk.productName}
//         sx={{ borderBottom: '1px solid #EEEEEE' }}
//       />
//       <CardContent sx={{ padding: '16px' }}>
//         <Typography variant="h6" component="div" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.name}
//         </Typography>
//         <Typography variant="h7" component="div" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.description}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//           Rs {milk.price}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//            {milk.rating}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default MilkCard;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

// // Conditional icon imports
// const Star = window['@mui/icons-material']?.Star || (() => <span>★</span>);
// const Leaf = window['@mui/icons-material']?.Eco || (() => <span>🌿</span>);
// const Fastfood = window['@mui/icons-material']?.Fastfood || (() => <span>🍔</span>);

// const MilkCard = ({ milk }) => {
//   const navigate = useNavigate();
//   const imageurl = "/" + milk["imageUrl"]; // Adjust image URL as needed

//   const handleCardClick = () => {
//     const token = localStorage.getItem('token'); // Check if user is logged in
//     if (token) {
//       navigate(`/milk/${milk.id}`, { state: { milk } });
//     } else {
//       navigate('/login');
//     }
//   };

//   // Function to render stars based on the rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const halfStars = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={`star-${i}`} sx={{ color: '#FFD700' }} />);
//     }
//     if (halfStars) {
//       stars.push(<Star key={`half-star`} sx={{ color: '#FFD700' }} />);
//     }
//     for (let i = stars.length; i < 5; i++) {
//       stars.push(<Star key={`empty-star-${i}`} sx={{ color: '#FFD700' }} />);
//     }

//     return stars;
//   };

//   return (
//     <Card
//       sx={{
//         maxWidth: 345,
//         cursor: 'pointer',
//         transition: 'transform 0.3s',
//         '&:hover': {
//           transform: 'scale(1.05)',
//         },
//       }}
//       onClick={handleCardClick}
//     >
//       <CardMedia
//         component="img"
//         height="200"
//         image={imageurl} // Use updated image URL
//         alt={milk.productName}
//         sx={{ borderBottom: '1px solid #EEEEEE' }}
//       />
//       <CardContent sx={{ padding: '16px' }}>
        
        
//         <Typography variant="h6" component="div" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.name}
//         </Typography>
//         <Typography variant="body2" component="div" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.description}
//         </Typography>
//         {/* Veg/Non-Veg Icon */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
//           {milk.isVeg ? (
//             <Leaf sx={{ color: 'green', mr: 1 }} />
//           ) : (
//             <Fastfood sx={{ color: 'red', mr: 1 }} />
//           )}
//           <Typography variant="body2">
//             {milk.isVeg ? 'Veg' : 'Non-Veg'}
//           </Typography>
//         </Box>
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//           Rs {milk.price}/-
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//           {renderStars(milk.rating)}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default MilkCard;



// import React from 'react';
// import { Card, CardMedia, CardContent, Typography } from '@mui/material';
// import { Star, StarBorder } from '@mui/icons-material';

// const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating); // Number of filled stars
//     const halfStars = rating % 1 !== 0; // Check if there's a half star

//     // Create filled stars
//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={`star-${i}`} sx={{ color: '#FFD700' }} />);
//     }
//     // Add half star if necessary
//     if (halfStars) {
//       stars.push(<Star key="half-star" sx={{ color: '#FFD700' }} />);
//     }
//     // Add empty stars up to 5
//     for (let i = stars.length; i < 5; i++) {
//       stars.push(<StarBorder key={`empty-star-${i}`} sx={{ color: '#FFD700' }} />);
//     }

//     return stars;
// };

// const MilkCard = ({ milk, handleCardClick }) => {
//   return (
//     <Card
//       sx={{
//         maxWidth: 345,
//         cursor: milk.isAvailable ? 'pointer' : 'not-allowed',
//         transition: 'transform 0.3s',
//         '&:hover': {
//           transform: milk.isAvailable ? 'scale(1.05)' : 'none',
//         },
//         opacity: milk.isAvailable ? 1 : 0.5,
//         pointerEvents: milk.isAvailable ? 'auto' : 'none',
//         backgroundColor: milk.isAvailable ? 'inherit' : '#f0f0f0',
//       }}
//       onClick={milk.isAvailable ? handleCardClick : undefined}
//     >
//       <CardMedia
//         component="img"
//         height="200"
//         image={milk.imageUrl}
//         alt={milk.productName}
//         sx={{ borderBottom: '1px solid #EEEEEE' }}
//       />
//       <CardContent sx={{ padding: '16px' }}>
//         <Typography variant="h6" component="div" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.name}
//         </Typography>
//         <Typography variant="body2" component="div" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.description}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//           Rs {milk.price}/-
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//           {renderStars(milk.rating)}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default MilkCard;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Card, CardMedia, CardContent, Typography, Box, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

// // Conditional icon imports
// const Star = window['@mui/icons-material']?.Star || (() => <span>★</span>);
// const Leaf = window['@mui/icons-material']?.Eco || (() => <span>🌿</span>);
// const Fastfood = window['@mui/icons-material']?.Fastfood || (() => <span>🍔</span>);

// const MilkCard = ({ milk, isOwner, onDelete }) => {
//   const navigate = useNavigate();
//   const imageurl = `/${milk.imageUrl}`; // Adjust image URL as needed

//   const handleCardClick = () => {
//     const token = localStorage.getItem('token'); // Check if user is logged in
//     if (token) {
//       navigate(`/milk/${milk.id}`, { state: { milk } });
//     } else {
//       navigate('/login');
//     }
//   };

//   // Function to render stars based on the rating
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;

//     for (let i = 0; i < fullStars; i++) {
//       stars.push(<Star key={`star-${i}`} sx={{ color: '#FFD700' }} />);
//     }
//     if (hasHalfStar) {
//       stars.push(<Star key="half-star" sx={{ color: '#FFD700', opacity: 0.5 }} />);
//     }
//     for (let i = stars.length; i < 5; i++) {
//       stars.push(<Star key={`empty-star-${i}`} sx={{ color: '#d3d3d3' }} />);
//     }

//     return stars;
//   };

//   return (
//     <Card
//       sx={{
//         maxWidth: 345,
//         cursor: 'pointer',
//         position: 'relative',
//         transition: 'transform 0.3s',
//         '&:hover': {
//           transform: 'scale(1.05)',
//         },
//       }}
//       onClick={handleCardClick}
//     >
//       {/* Conditionally render the delete icon in the top-right if user is an owner */}
//       {isOwner && (
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation(); // Prevents card click event
//             onDelete(milk.id);
//           }}
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             backgroundColor: 'rgba(255, 255, 255, 0.7)',
//           }}
//         >
//           <DeleteIcon color="error" />
//         </IconButton>
//       )}
//       <CardMedia
//         component="img"
//         height="200"
//         image={imageurl} // Use updated image URL
//         alt={milk.productName}
//         sx={{ borderBottom: '1px solid #EEEEEE' }}
//       />
//       <CardContent sx={{ padding: '16px' }}>
//         <Typography variant="h6" component="div" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
//           {milk.description}
//         </Typography>
        
//         {/* Veg/Non-Veg Icon */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
//           {milk.isVeg ? (
//             <Leaf sx={{ color: 'green', mr: 0.5 }} />
//           ) : (
//             <Fastfood sx={{ color: 'red', mr: 0.5 }} />
//           )}
//           <Typography variant="body2">
//             {milk.isVeg ? 'Veg' : 'Non-Veg'}
//           </Typography>
//         </Box>
        
//         {/* Price */}
//         <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
//           Rs {milk.price}/-
//         </Typography>

//         {/* Rating */}
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
//           {renderStars(milk.rating)}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default MilkCard;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Conditional icon imports
const Star = window['@mui/icons-material']?.Star || (() => <span>★</span>);
const Leaf = window['@mui/icons-material']?.Eco || (() => <span>🌿</span>);
const Fastfood = window['@mui/icons-material']?.Fastfood || (() => <span>🍔</span>);

const MilkCard = ({ milk, isOwner, onDelete, restaurantId }) => {
  const navigate = useNavigate();
    const imageUrl = `/${milk.imageUrl}`; // Adjust image URL as needed
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: milk.name,
    description: milk.description,
    price: milk.price,
    imageUrl: milk.imageUrl, // Default to current imageUrl
    isVeg: milk.isVeg,
    rating: milk.rating,
    isAvailable: milk.isAvailable,
    discount: milk.discount || 0,
    isDiscountAvailable: milk.isDiscountAvailable || false,
    category: milk.category || '',
  });

  const [imagePath, setImagePath] = useState(milk.imageUrl); // To store the image path

  const handleEditClick = () => setIsEditing(true);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSliderChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name; // Get the file name
      const imagePath = `dishes/${fileName}`; // Set the image path in the desired format
      setImagePath(URL.createObjectURL(file)); // For preview only
      setFormData((prev) => ({
        ...prev,
        imageUrl: imagePath, // Update form data with new image path
      }));
    }
  };

  const handleSave = async () => {
    // Prepare the data for the PUT request
    const data = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      imageUrl: formData.imageUrl, // Send the image URL as a string
      isVeg: formData.isVeg,
      rating: formData.rating,
      isAvailable: formData.isAvailable,
      discount: formData.discount,
      isDiscountAvailable: formData.isDiscountAvailable,
      category: formData.category,
    };

    try {
      const response = await fetch(`https://capstone-project-production-30c8.up.railway.app/api/restaurants/${restaurantId}/dishes/${milk.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(data), // Send data as JSON string
      });

      if (response.ok) {
        setIsEditing(false);
        window.location.reload(); // Refresh to show updated data
      } else {
        console.error('Failed to update dish');
      }
    } catch (error) {
      console.error('Error updating dish:', error);
    }
  };

  // Helper function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} sx={{ color: '#FFD700' }} />);
    }
    if (hasHalfStar) {
      stars.push(<Star key="half-star" sx={{ color: '#FFD700', opacity: 0.5 }} />);
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<Star key={`empty-star-${i}`} sx={{ color: '#d3d3d3' }} />);
    }
    return stars;
  };

  if (isEditing) {
    return (
      <Card sx={{ maxWidth: 345, padding: 2 }}>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />

        {/* Image Upload Button */}
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

        <Box display="flex" justifyContent="space-between" mt={1}>
          <FormControlLabel
            control={
              <Checkbox
                name="isVeg"
                checked={formData.isVeg}
                onChange={handleInputChange}
              />
            }
            label="Veg"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleInputChange}
              />
            }
            label="Available"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="isDiscountAvailable"
                checked={formData.isDiscountAvailable}
                onChange={handleInputChange}
              />
            }
            label="Discount Available"
          />
        </Box>

        <TextField
          label="Discount (%)"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />

        <Typography gutterBottom>Rating</Typography>
        <Slider
          name="rating"
          value={formData.rating}
          onChange={handleSliderChange}
          step={0.5}
          marks
          min={1}
          max={5}
          valueLabelDisplay="auto"
        />

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </Box>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: 345,
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
      onClick={() => navigate(`/milk/${milk.id}`, { state: { milk } })}
    >
      {isOwner && (
        <>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              onDelete(milk.id);
            }}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick();
            }}
            sx={{
              position: 'absolute',
              top: 48,
              right: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            }}
          >
            <EditIcon color="primary" />
          </IconButton>
        </>
      )}
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={milk.productName}
        sx={{ borderBottom: '1px solid #EEEEEE' }}
      />
      <CardContent sx={{ padding: '16px' }}>
        <Typography variant="h6" component="div" sx={{ mb: 1, textAlign: 'center' }}>
          {milk.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textAlign: 'center' }}>
          {milk.description}
        </Typography>
        {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
          {milk.isVeg ? (
            <Leaf sx={{ color: 'green', mr: 0.5 }} />
          ) : (
            <Fastfood sx={{ color: 'red', mr: 0.5 }} />
          )}
          <Typography variant="body2">
            {milk.isVeg ? 'Veg' : 'Non-Veg'}
          </Typography>
        </Box> */}
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
          Rs {milk.price}/-
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
          {renderStars(milk.rating)}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MilkCard;

















