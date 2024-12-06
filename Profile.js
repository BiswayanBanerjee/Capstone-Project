// import React, { useEffect, useState } from 'react';
// import { jwtDecode } from 'jwt-decode';

// const Profile = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

//     if (token) {
//       try {
//         // Decode the token to get user data
//         const decoded = jwtDecode(token);
//         setUser({
//           email: decoded.sub,
//           name: decoded.name,
//           role: decoded.role,
//         });
//       } catch (error) {
//         console.error('Invalid token:', error);
//       }
//     }
//   }, []);

//   if (!user) {
//     return <div>Loading...</div>; // or a spinner component
//   }

//   return (
//     <div>
//       <h1>Profile Information</h1>
//       <p><strong>Name:</strong> {user.name}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Role:</strong> {user.role}</p>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    profileImageUrl: '',
    customerAddress: [],
    phone: '',
  });
  
  const [newAddress, setNewAddress] = useState({
    receiverDetails: '',
    saveAddressAs: '',
    houseNo: '',
    area: '',
    landMark: '',
    pincode: '',
    state: '',
    country: ''
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = parseJwt(token);
      if (decodedToken) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          firstName: decodedToken.firstName || '',
          lastName: decodedToken.lastName || '',
          email: decodedToken.sub || '',
        }));
        fetchProfileData(token);
      }
    } else {
      setIsLoading(false); // No token, stop loading
    }
  }, []);
  
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Invalid token', e);
      return null;
    }
  };
  
  const fetchProfileData = async (token) => {
    try {
      const response = await axios.get('/api/customer/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        ...response.data
      }));
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };
  
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };
  
  const addNewAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/customer/address', newAddress, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        customerAddress: [...prevProfile.customerAddress, newAddress]
      }));
      setNewAddress({
        receiverDetails: '',
        saveAddressAs: '',
        houseNo: '',
        area: '',
        landMark: '',
        pincode: '',
        state: '',
        country: ''
      });
      setIsAddingAddress(false);
    } catch (error) {
      console.error('Error adding new address:', error);
    }
  };

  const fetchLocationData = async (latitude, longitude) => {
    const apiKey = 'ca7318dc1b8440458dcd480ef7107634';
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
      const { country, state } = response.data.results[0].components;
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        state: state || '',
        country: country || ''
      }));
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('User location:', latitude, longitude);
          fetchLocationData(latitude, longitude);
        },
        (error) => console.error('Error getting location:', error)
      );
    } else {
      console.error('Geolocation not supported by this browser');
    }
  };

  // const handleLocationFetch = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  //         console.log('User location:', latitude, longitude);
  //         fetchLocationData(latitude, longitude);
  //       },
  //       (error) => console.error('Error getting location:', error)
  //     );
  //   } else {
  //     console.error('Geolocation not supported by this browser');
  //   }
  // };
  
  const handleSave = async () => {
    try {
      await axios.put('/api/customer/profile', userProfile, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };
  
  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profileImage', file);
  
      try {
        const response = await axios.post('/api/customer/upload-image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setUserProfile({ ...userProfile, profileImageUrl: response.data.imageUrl });
      } catch (error) {
        console.error('Error uploading profile image:', error);
      }
    }
  };
  
  if (isLoading) {
    return <div>Loading profile...</div>;
  }
  
  return (
    <Card style={{ maxWidth: 700, margin: '20px auto', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <CardContent>
        <Grid container alignItems="center" direction="column" spacing={2}>
          <Grid item>
            <Avatar
              src={userProfile.profileImageUrl}
              alt="Profile Picture"
              sx={{ width: 100, height: 100, cursor: 'pointer' }}
              onClick={() => setIsEditing(true)}
            />
          </Grid>
          <Grid item>
            <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
            <Typography variant="body2" color="textSecondary">{userProfile.email}</Typography>
          </Grid>
        </Grid>
  
        {isEditing && (
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            style={{ marginTop: '10px' }}
          />
        )}
  
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={userProfile.firstName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={userProfile.lastName}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Gender"
              name="gender"
              value={userProfile.gender}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Phone"
              name="phone"
              value={userProfile.phone}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
  
          {userProfile.customerAddress.map((address, index) => (
            <Grid item xs={12} key={index}>
              <Divider style={{ margin: '10px 0' }} />
              <Typography variant="h6">{address.saveAddressAs}</Typography>
              <Typography variant="body2">Receiver: {address.receiverDetails}</Typography>
              <Typography variant="body2">House No: {address.houseNo}</Typography>
              <Typography variant="body2">Area: {address.area}</Typography>
              <Typography variant="body2">Landmark: {address.landMark}</Typography>
              <Typography variant="body2">Pincode: {address.pincode}</Typography>
              <Typography variant="body2">State: {address.state}</Typography>
              <Typography variant="body2">Country: {address.country}</Typography>
            </Grid>
          ))}
  
          {isAddingAddress && (
            <>
              <Grid item xs={12}>
                <Button onClick={handleLocationFetch} variant="contained" color="secondary" style={{ marginBottom: '10px' }}>
                  Auto-Fill Location
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Receiver Details"
                  name="receiverDetails"
                  value={newAddress.receiverDetails}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Save Address As"
                  name="saveAddressAs"
                  value={newAddress.saveAddressAs}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="House No"
                  name="houseNo"
                  value={newAddress.houseNo}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Area"
                  name="area"
                  value={newAddress.area}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Landmark"
                  name="landMark"
                  value={newAddress.landMark}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Pincode"
                  name="pincode"
                  value={newAddress.pincode}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="State"
                  name="state"
                  value={newAddress.state}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Country"
                  name="country"
                  value={newAddress.country}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={addNewAddress}>
                  Save Address
                </Button>
              </Grid>
            </>
          )}
  
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={!isEditing}
            >
              Save Changes
            </Button>
            {!isEditing && (
              <Button
                variant="outlined"
                color="secondary"
                style={{ marginLeft: '10px' }}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setIsAddingAddress(!isAddingAddress)}
              startIcon={<AddIcon />}
              style={{ marginTop: '10px' }}
            >
              {isAddingAddress ? 'Cancel' : 'Add New Address'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;

