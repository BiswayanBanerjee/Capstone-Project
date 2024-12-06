// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
// import axios from 'axios';
// import AddIcon from '@mui/icons-material/Add';

// const Profile = () => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     profileImageUrl: '',
//     customerAddress: [],
//     phone: '',
//   });
  
//   const [newAddress, setNewAddress] = useState({
//     receiverDetails: '',
//     saveAddressAs: '',
//     houseNo: '',
//     area: '',
//     landMark: '',
//     pincode: '',
//     state: '',
//     country: ''
//   });

//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAddingAddress, setIsAddingAddress] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = parseJwt(token);
//       if (decodedToken) {
//         setUserProfile((prevProfile) => ({
//           ...prevProfile,
//           firstName: decodedToken.firstName || '',
//           lastName: decodedToken.lastName || '',
//           email: decodedToken.sub || '',
//         }));
//         fetchProfileData(token);
//         fetchOrderHistory(token); // Fetch order history on profile load
//       }
//     } else {
//       setIsLoading(false); // No token, stop loading
//     }
//   }, []);

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       console.error('Invalid token', e);
//       return null;
//     }
//   };

//   const fetchProfileData = async (token) => {
//     try {
//       const response = await axios.get('/api/customer/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile((prevProfile) => ({
//         ...prevProfile,
//         ...response.data
//       }));
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchOrderHistory = async (token) => {
//     try {
//       const response = await axios.get('/api/customer/orders', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching order history:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile({ ...userProfile, [name]: value });
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   const addNewAddress = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('/api/customer/address', newAddress, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile((prevProfile) => ({
//         ...prevProfile,
//         customerAddress: [...prevProfile.customerAddress, newAddress]
//       }));
//       setNewAddress({
//         receiverDetails: '',
//         saveAddressAs: '',
//         houseNo: '',
//         area: '',
//         landMark: '',
//         pincode: '',
//         state: '',
//         country: ''
//       });
//       setIsAddingAddress(false);
//     } catch (error) {
//       console.error('Error adding new address:', error);
//     }
//   };

//   const fetchLocationData = async (latitude, longitude) => {
//     const apiKey = 'ca7318dc1b8440458dcd480ef7107634'; // Replace with your actual API key
//     try {
//       const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
//       const { country, state } = response.data.results[0].components;
//       setNewAddress((prevAddress) => ({
//         ...prevAddress,
//         state: state || '',
//         country: country || ''
//       }));
//     } catch (error) {
//       console.error('Error fetching location data:', error);
//     }
//   };

//   const handleLocationFetch = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchLocationData(latitude, longitude);
//         },
//         (error) => console.error('Error getting location:', error)
//       );
//     } else {
//       console.error('Geolocation not supported by this browser');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put('/api/customer/profile', userProfile, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       alert('Profile updated successfully');
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <Card style={{ maxWidth: 700, margin: '20px auto', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//       <CardContent>
//         <Grid container alignItems="center" direction="column" spacing={2}>
//           <Grid item>
//             <Avatar
//               src={userProfile.profileImageUrl}
//               alt="Profile Picture"
//               sx={{ width: 100, height: 100, cursor: 'pointer' }}
//               onClick={() => setIsEditing(true)}
//             />
//           </Grid>
//           <Grid item>
//             <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
//             <Typography variant="body2" color="textSecondary">{userProfile.email}</Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           {/* Profile Fields */}
//           <Grid item xs={6}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={userProfile.firstName}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={userProfile.lastName}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Gender"
//               name="gender"
//               value={userProfile.gender}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Phone"
//               name="phone"
//               value={userProfile.phone}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>

//           {/* Address Section */}
//           {userProfile.customerAddress.map((address, index) => (
//             <Grid item xs={12} key={index}>
//               <Divider style={{ margin: '10px 0' }} />
//               <Typography variant="h6">{address.saveAddressAs}</Typography>
//               <Typography variant="body2">Receiver: {address.receiverDetails}</Typography>
//               <Typography variant="body2">House No: {address.houseNo}</Typography>
//               <Typography variant="body2">Area: {address.area}</Typography>
//               <Typography variant="body2">Landmark: {address.landMark}</Typography>
//               <Typography variant="body2">Pincode: {address.pincode}</Typography>
//               <Typography variant="body2">State: {address.state}</Typography>
//               <Typography variant="body2">Country: {address.country}</Typography>
//             </Grid>
//           ))}

//           {isAddingAddress && (
//             <>
//               <Grid item xs={12}>
//                 <Button onClick={handleLocationFetch} variant="contained" color="secondary" style={{ marginBottom: '10px' }}>
//                   Auto-Fill Location
//                 </Button>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Receiver Details"
//                   name="receiverDetails"
//                   value={newAddress.receiverDetails}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Save Address As"
//                   name="saveAddressAs"
//                   value={newAddress.saveAddressAs}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="House No"
//                   name="houseNo"
//                   value={newAddress.houseNo}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Area"
//                   name="area"
//                   value={newAddress.area}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Landmark"
//                   name="landMark"
//                   value={newAddress.landMark}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Pincode"
//                   name="pincode"
//                   value={newAddress.pincode}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="State"
//                   name="state"
//                   value={newAddress.state}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Country"
//                   name="country"
//                   value={newAddress.country}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary" onClick={addNewAddress}>
//                   Save Address
//                 </Button>
//               </Grid>
//             </>
//           )}

//           {/* Save Profile Changes */}
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//               disabled={!isEditing}
//             >
//               Save Changes
//             </Button>
//             {!isEditing && (
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 style={{ marginLeft: '10px' }}
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </Button>
//             )}
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => setIsAddingAddress(!isAddingAddress)}
//               startIcon={<AddIcon />}
//               style={{ marginTop: '10px' }}
//             >
//               {isAddingAddress ? 'Cancel' : 'Add New Address'}
//             </Button>
//           </Grid>
//         </Grid>

//         <Divider style={{ margin: '20px 0' }} />
//         <Typography variant="h5" style={{ marginTop: '20px' }}>Order History</Typography>
//         {orders.length === 0 ? (
//           <Typography variant="body2" color="textSecondary">No previous orders found.</Typography>
//         ) : (
//           orders.map((order) => (
//             <Card key={order.orderId} style={{ marginBottom: '15px', padding: '10px' }}>
//               <Typography variant="h6">Order ID: {order.orderId}</Typography>
//               <Typography variant="body2">Total Amount: ${order.totalAmount.toFixed(2)}</Typography>
//               <Typography variant="body2">Delivery Address: {order.deliveryAddress}</Typography>
//               <Typography variant="body2">Status: {order.status}</Typography>
//               <Typography variant="body2">Order Date: {new Date(order.orderDate).toLocaleString()}</Typography>
//               <Typography variant="body2">Delivery Instructions: {order.deliveryInstruction}</Typography>
//               <Divider style={{ margin: '10px 0' }} />
//               <Typography variant="body2">Dishes Ordered:</Typography>
//               {order.dishIds.map((dishId, idx) => (
//                 <Typography variant="body2" key={idx} style={{ marginLeft: '10px' }}>
//                   - {dishId}
//                 </Typography>
//               ))}
//             </Card>
//           ))
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
// import axios from 'axios';
// import AddIcon from '@mui/icons-material/Add';
// import {supabase} from './supabaseClient';

// const Profile = () => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     profileImageUrl: '',
//     customerAddress: [],
//     phone: '',
//   });

//   const [newAddress, setNewAddress] = useState({
//     receiverDetails: '',
//     saveAddressAs: '',
//     houseNo: '',
//     area: '',
//     landMark: '',
//     pincode: '',
//     state: '',
//     country: ''
//   });

//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAddingAddress, setIsAddingAddress] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [isOtpSent, setIsOtpSent] = useState(false);
//   const [otpLoading, setOtpLoading] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = parseJwt(token);
//       if (decodedToken) {
//         setUserProfile((prevProfile) => ({
//           ...prevProfile,
//           firstName: decodedToken.firstName || '',
//           lastName: decodedToken.lastName || '',
//           email: decodedToken.sub || '',
//         }));
//         fetchProfileData(token);
//         fetchOrderHistory(token);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       console.error('Invalid token', e);
//       return null;
//     }
//   };

//   const fetchProfileData = async (token) => {
//     try {
//       const response = await axios.get('/api/customer/profile', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile((prevProfile) => ({
//         ...prevProfile,
//         ...response.data
//       }));
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchOrderHistory = async (token) => {
//     try {
//       const response = await axios.get('/api/customer/orders', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setOrders(response.data);
//     } catch (error) {
//       console.error('Error fetching order history:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile({ ...userProfile, [name]: value });
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   const addNewAddress = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('/api/customer/address', newAddress, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile((prevProfile) => ({
//         ...prevProfile,
//         customerAddress: [...prevProfile.customerAddress, newAddress]
//       }));
//       setNewAddress({
//         receiverDetails: '',
//         saveAddressAs: '',
//         houseNo: '',
//         area: '',
//         landMark: '',
//         pincode: '',
//         state: '',
//         country: ''
//       });
//       setIsAddingAddress(false);
//     } catch (error) {
//       console.error('Error adding new address:', error);
//     }
//   };

//   const fetchLocationData = async (latitude, longitude) => {
//     const apiKey = 'ca7318dc1b8440458dcd480ef7107634'; // Replace with your actual API key
//     try {
//       const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
//       const { country, state } = response.data.results[0].components;
//       setNewAddress((prevAddress) => ({
//         ...prevAddress,
//         state: state || '',
//         country: country || ''
//       }));
//     } catch (error) {
//       console.error('Error fetching location data:', error);
//     }
//   };

//   const handleLocationFetch = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchLocationData(latitude, longitude);
//         },
//         (error) => console.error('Error getting location:', error)
//       );
//     } else {
//       console.error('Geolocation not supported by this browser');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put('/api/customer/profile', userProfile, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       });
//       alert('Profile updated successfully');
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     }
//   };

//   const sendOtp = async () => {
//     setOtpLoading(true);
//     const { error } = await supabase.auth.signInWithOtp({
//       phone: userProfile.phone
//     });
//     if (error) {
//       console.error('Error sending OTP:', error.message);
//     } else {
//       alert('OTP sent! Please check your phone.');
//       setIsOtpSent(true);
//     }
//     setOtpLoading(false);
//   };

//   const verifyOtp = async () => {
//     setIsVerifying(true);
//     const { error } = await supabase.auth.verifyOtp({
//       phone: userProfile.phone,
//       token: otp,
//       type: 'sms'  // Specify the verification type
//     });
//     if (error) {
//       console.error('Error verifying OTP:', error.message);
//       alert('OTP verification failed. Please try again.');
//     } else {
//       alert('Phone number verified successfully!');
//     }
//     setIsVerifying(false);
//   };

//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <Card style={{ maxWidth: 700, margin: '20px auto', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//       <CardContent>
//         <Grid container alignItems="center" direction="column" spacing={2}>
//           <Grid item>
//             <Avatar
//               src={userProfile.profileImageUrl}
//               alt="Profile Picture"
//               sx={{ width: 100, height: 100, cursor: 'pointer' }}
//               onClick={() => setIsEditing(true)}
//             />
//           </Grid>
//           <Grid item>
//             <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
//             <Typography variant="body2" color="textSecondary">{userProfile.email}</Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           {/* Profile Fields */}
//           <Grid item xs={6}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={userProfile.firstName}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={userProfile.lastName}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Gender"
//               name="gender"
//               value={userProfile.gender}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Phone"
//               name="phone"
//               value={userProfile.phone}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={sendOtp}
//               disabled={!isEditing || otpLoading}
//               style={{ marginTop: '10px' }}
//             >
//               {otpLoading ? 'Sending...' : 'Send OTP'}
//             </Button>
//             {isOtpSent && (
//               <>
//                 <TextField
//                   label="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   fullWidth
//                   style={{ marginTop: '10px' }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={verifyOtp}
//                   disabled={isVerifying}
//                   style={{ marginTop: '10px' }}
//                 >
//                   {isVerifying ? 'Verifying...' : 'Verify OTP'}
//                 </Button>
//               </>
//             )}
//           </Grid>

//           {/* Address Section */}
//           {userProfile.customerAddress.map((address, index) => (
//             <Grid item xs={12} key={index}>
//               <Divider style={{ margin: '10px 0' }} />
//               <Typography variant="h6">{address.saveAddressAs}</Typography>
//               <Typography variant="body2">Receiver: {address.receiverDetails}</Typography>
//               <Typography variant="body2">House No: {address.houseNo}</Typography>
//               <Typography variant="body2">Area: {address.area}</Typography>
//               <Typography variant="body2">Landmark: {address.landMark}</Typography>
//               <Typography variant="body2">Pincode: {address.pincode}</Typography>
//               <Typography variant="body2">State: {address.state}</Typography>
//               <Typography variant="body2">Country: {address.country}</Typography>
//             </Grid>
//           ))}

//           {isAddingAddress && (
//             <>
//               <Grid item xs={12}>
//                 <Button onClick={handleLocationFetch} variant="contained" color="secondary" style={{ marginBottom: '10px' }}>
//                   Auto-Fill Location
//                 </Button>
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Receiver Details"
//                   name="receiverDetails"
//                   value={newAddress.receiverDetails}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Save Address As"
//                   name="saveAddressAs"
//                   value={newAddress.saveAddressAs}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="House No"
//                   name="houseNo"
//                   value={newAddress.houseNo}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Area"
//                   name="area"
//                   value={newAddress.area}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Landmark"
//                   name="landMark"
//                   value={newAddress.landMark}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Pincode"
//                   name="pincode"
//                   value={newAddress.pincode}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="State"
//                   name="state"
//                   value={newAddress.state}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Country"
//                   name="country"
//                   value={newAddress.country}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary" onClick={addNewAddress}>
//                   Save Address
//                 </Button>
//               </Grid>
//             </>
//           )}

//           {/* Save Profile Changes */}
//           <Grid item xs={12}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSave}
//               disabled={!isEditing}
//             >
//               Save Changes
//             </Button>
//             {!isEditing && (
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 style={{ marginLeft: '10px' }}
//                 onClick={() => setIsEditing(true)}
//               >
//                 Edit Profile
//               </Button>
//             )}
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => setIsAddingAddress(!isAddingAddress)}
//               startIcon={<AddIcon />}
//               style={{ marginTop: '10px' }}
//             >
//               {isAddingAddress ? 'Cancel' : 'Add New Address'}
//             </Button>
//           </Grid>
//         </Grid>

//         <Divider style={{ margin: '20px 0' }} />
//         <Typography variant="h5" style={{ marginTop: '20px' }}>Order History</Typography>
//         {orders.length === 0 ? (
//           <Typography variant="body2" color="textSecondary">No previous orders found.</Typography>
//         ) : (
//           orders.map((order) => (
//             <Card key={order.orderId} style={{ marginBottom: '15px', padding: '10px' }}>
//               <Typography variant="h6">Order ID: {order.orderId}</Typography>
//               <Typography variant="body2">Total Amount: ${order.totalAmount.toFixed(2)}</Typography>
//               <Typography variant="body2">Delivery Address: {order.deliveryAddress}</Typography>
//               <Typography variant="body2">Status: {order.status}</Typography>
//               <Typography variant="body2">Order Date: {new Date(order.orderDate).toLocaleString()}</Typography>
//               <Typography variant="body2">Delivery Instructions: {order.deliveryInstruction}</Typography>
//               <Divider style={{ margin: '10px 0' }} />
//               <Typography variant="body2">Dishes Ordered:</Typography>
//               {order.dishIds.map((dishId, idx) => (
//                 <Typography variant="body2" key={idx} style={{ marginLeft: '10px' }}>
//                   - {dishId}
//                 </Typography>
//               ))}
//             </Card>
//           ))
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default Profile;










// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
// import axios from 'axios';
// import AddIcon from '@mui/icons-material/Add';
// import { supabase } from './supabaseClient';

// const Profile = () => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     profileImageUrl: '',
//     password: '',
//     newPassword: '', // For changing the password
//     customerAddress: [],
//     phone: '',
//     customerOrders: [],
//     favourites: [],
//     customerCart: [],
//     customerRating: {},
//   });

//   const [newAddress, setNewAddress] = useState({
//     receiverDetails: '',
//     saveAddressAs: '',
//     house_number: '',
//     street: '',
//     landMark: '',
//     postcode: '',
//     city: '',
//     state: '',
//     country: '',
//     location: [],
//   });

//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAddingAddress, setIsAddingAddress] = useState(false);
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = parseJwt(token);
//       if (decodedToken) {
//         setUserProfile((prevProfile) => ({
//           ...prevProfile,
//           firstName: decodedToken.firstName || '',
//           lastName: decodedToken.lastName || '',
//           email: decodedToken.sub || '',
//         }));
//         fetchProfileData(token, decodedToken.sub);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       console.error('Invalid token', e);
//       return null;
//     }
//   };

//   const fetchProfileData = async (token, id) => {
//     try {
//       const response = await axios.get(`http://localhost:8082/api/customers/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile({ ...userProfile, [name]: value });
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setUserProfile({ ...userProfile, profileImageUrl: `profile/${file.name}` }); // Set the image path
//     }
//   };

//   const fetchLocationData = async (latitude, longitude) => {
//     const apiKey = 'ca7318dc1b8440458dcd480ef7107634'; // Replace with your actual API key
//     try {
//       const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
//       const { country, state , city , postcode , house_number, street } = response.data.results[0].components;
//       setNewAddress((prevAddress) => ({
//         ...prevAddress,
//         street: street || '',
//         house_number: house_number || '',
//         postcode: postcode || '',
//         city: city || '',
//         state: state || '',
//         country: country || '',
//         location: [longitude, latitude],
//       }));
//     } catch (error) {
//       console.error('Error fetching location data:', error);
//     }
//   };

//   const handleLocationFetch = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchLocationData(latitude, longitude);
//         },
//         (error) => {
//           console.error('Error fetching location:', error);
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const id = userProfile.email;

//       // Cleaning up the profile object to remove null/undefined values
//       const cleanedProfile = { ...userProfile };
//       Object.keys(cleanedProfile).forEach((key) => {
//         if (cleanedProfile[key] === undefined || cleanedProfile[key] === null) {
//           delete cleanedProfile[key];
//         }
//       });

//       // Ensure all address fields are included if adding a new address
//       if (isAddingAddress) {
//         const fullAddress = {
//           receiverDetails: Array.isArray(newAddress.receiverDetails) ? newAddress.receiverDetails : [newAddress.receiverDetails || "Me"],
//           saveAddressAs: newAddress.saveAddressAs || [],
//           house_number: newAddress.house_number || '',
//           street: newAddress.street || '',
//           landMark: newAddress.landMark || '',
//           postcode: Number(newAddress.postcode) || '', // Convert postcode to a number
//           city: newAddress.city || '',
//           state: newAddress.state || '',
//           country: newAddress.country || ''
//         };
//         cleanedProfile.customerAddress = [...(cleanedProfile.customerAddress || []), fullAddress];
//       }

//       // If an image file is uploaded, you might want to upload it to your storage
//       if (imageFile) {
//         const { data, error } = await supabase.storage.from('profiles').upload(`profile/${imageFile.name}`, imageFile);
//         if (error) throw error;
//         cleanedProfile.profileImageUrl = data.Key; // Update the profileImageUrl with the stored path
//       }

//       // Logging the complete payload structure
//       console.log("Final payload being sent:", JSON.stringify(cleanedProfile, null, 2));

//       const response = await axios.put(`http://localhost:8082/api/customers/${id}`, cleanedProfile, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert('Profile updated successfully');
//       setUserProfile(cleanedProfile);
//       setIsEditing(false);
//       setIsAddingAddress(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     }
//   };

//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <Card style={{ maxWidth: 700, margin: '20px auto', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//       <CardContent>
//         <Grid container alignItems="center" direction="column" spacing={2}>
//           <Grid item>
//             <Avatar
//               src={userProfile.profileImageUrl}
//               alt="Profile Picture"
//               sx={{ width: 100, height: 100, cursor: 'pointer' }}
//               onClick={() => setIsEditing(true)}
//             />
//           </Grid>
//           <Grid item>
//             <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
//             <Typography variant="body2" color="textSecondary">{userProfile.email}</Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           {/* Profile Fields */}
//           <Grid item xs={6}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={userProfile.firstName}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={userProfile.lastName}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               name="email"
//               value={userProfile.email}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Phone"
//               name="phone"
//               value={userProfile.phone}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Gender"
//               name="gender"
//               value={userProfile.gender}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Current Password"
//               name="password"
//               type="password"
//               value={userProfile.password}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="New Password"
//               name="newPassword"
//               type="password"
//               value={userProfile.newPassword}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           {isEditing && (
//             <Grid item xs={12}>
//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageChange}
//                 style={{ display: 'none' }}
//                 id="profile-image-upload"
//               />
//               <label htmlFor="profile-image-upload">
//                 <Button variant="contained" color="secondary" component="span">
//                   Upload Profile Image
//                 </Button>
//               </label>
//             </Grid>
//           )}
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
//               {isEditing ? 'Cancel Edit' : 'Edit Profile'}
//             </Button>
//             {isEditing && (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleSave}
//                 style={{ marginLeft: '10px' }}
//               >
//                 Save Changes
//               </Button>
//             )}
//           </Grid>
//         </Grid>

//         {/* Address Management */}
//         <Grid item xs={12} style={{ marginTop: '20px' }}>
//           <Typography variant="h6">Addresses</Typography>
//           {userProfile.customerAddress.map((address, index) => (
//             <Grid item xs={12} key={index}>
//               <Typography variant="h6">Address {index + 1}</Typography>
//               <Typography variant="body1">{address.receiverDetails}</Typography>
//               <Typography variant="body1">{address.house_number}, {address.street}, {address.landMark}, {address.postcode}, {address.city}, {address.state}, {address.country}</Typography>
//               <Divider style={{ margin: '10px 0' }} />
//             </Grid>
//           ))}

//           {isAddingAddress ? (
//             <>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Receiver Details"
//                   name="receiverDetails"
//                   value={newAddress.receiverDetails}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="House No"
//                   name="houseNo"
//                   value={newAddress.house_number}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Street"
//                   name="street"
//                   value={newAddress.street}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Landmark"
//                   name="landMark"
//                   value={newAddress.landMark}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Postcode"
//                   name="postcode"
//                   value={newAddress.postcode}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="City"
//                   name="city"
//                   value={newAddress.city}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="State"
//                   name="state"
//                   value={newAddress.state}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Country"
//                   name="country"
//                   value={newAddress.country}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary" onClick={handleSave}>
//                   Add Address
//                 </Button>
//                 <Button variant="outlined" onClick={() => setIsAddingAddress(false)} style={{ marginLeft: '10px' }}>
//                   Cancel
//                 </Button>
//               </Grid>
//             </>
//           ) : (
//             <Grid item xs={12}>
//               <Button
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                   handleLocationFetch();
//                   setIsAddingAddress(true);
//                 }}
//               >
//                 Add New Address
//               </Button>
//             </Grid>
//           )}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default Profile;



// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
// import axios from 'axios';
// import AddIcon from '@mui/icons-material/Add';
// import { supabase } from './supabaseClient';

// const Profile = () => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     profileImageUrl: '',
//     password: '',
//     newPassword: '', // For changing the password
//     customerAddress: [],
//     phone: '',
//     customerOrders: [],
//     favourites: [],
//     customerCart: [],
//     customerRating: {},
//   });

//   const [newAddress, setNewAddress] = useState({
//     receiverDetails: '',
//     saveAddressAs: '',
//     house_number: '',
//     street: '',
//     landMark: '',
//     postcode: '',
//     city: '',
//     state: '',
//     country: '',
//     location: [],
//   });

//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAddingAddress, setIsAddingAddress] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [otp, setOtp] = useState('');
// const [otpLoading, setOtpLoading] = useState(false);
// const [isOtpSent, setIsOtpSent] = useState(false);
// const [isVerifying, setIsVerifying] = useState(false);


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = parseJwt(token);
//       if (decodedToken) {
//         setUserProfile((prevProfile) => ({
//           ...prevProfile,
//           firstName: decodedToken.firstName || '',
//           lastName: decodedToken.lastName || '',
//           email: decodedToken.sub || '',
//         }));
//         fetchProfileData(token, decodedToken.sub);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       console.error('Invalid token', e);
//       return null;
//     }
//   };

//   const fetchProfileData = async (token, id) => {
//     try {
//       const response = await axios.get(`http://localhost:8082/api/customers/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile({ ...userProfile, [name]: value });
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setUserProfile({ ...userProfile, profileImageUrl: `profile/${file.name}` }); // Set the image path
//     }
//   };

//   const fetchLocationData = async (latitude, longitude) => {
//     const apiKey = 'ca7318dc1b8440458dcd480ef7107634'; // Replace with your actual API key
//     try {
//       const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
//       const { country, state , city , postcode , house_number, street } = response.data.results[0].components;
//       setNewAddress((prevAddress) => ({
//         ...prevAddress,
//         street: street || '',
//         house_number: house_number || '',
//         postcode: postcode || '',
//         city: city || '',
//         state: state || '',
//         country: country || '',
//         location: [longitude, latitude],
//       }));
//     } catch (error) {
//       console.error('Error fetching location data:', error);
//     }
//   };

//   const handleLocationFetch = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchLocationData(latitude, longitude);
//         },
//         (error) => {
//           console.error('Error fetching location:', error);
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const id = userProfile.email;

//       // Cleaning up the profile object to remove null/undefined values
//       const cleanedProfile = { ...userProfile };
//       Object.keys(cleanedProfile).forEach((key) => {
//         if (cleanedProfile[key] === undefined || cleanedProfile[key] === null) {
//           delete cleanedProfile[key];
//         }
//       });

//       // Ensure all address fields are included if adding a new address
//       if (isAddingAddress) {
//         const fullAddress = {
//           receiverDetails: Array.isArray(newAddress.receiverDetails) ? newAddress.receiverDetails : [newAddress.receiverDetails || "Me"],
//           saveAddressAs: newAddress.saveAddressAs || [],
//           house_number: newAddress.house_number || '',
//           street: newAddress.street || '',
//           landMark: newAddress.landMark || '',
//           postcode: Number(newAddress.postcode) || '', // Convert postcode to a number
//           city: newAddress.city || '',
//           state: newAddress.state || '',
//           country: newAddress.country || ''
//         };
//         cleanedProfile.customerAddress = [...(cleanedProfile.customerAddress || []), fullAddress];
//       }

//       // If an image file is uploaded, you might want to upload it to your storage
//       if (imageFile) {
//         const { data, error } = await supabase.storage.from('profiles').upload(`profile/${imageFile.name}`, imageFile);
//         if (error) throw error;
//         cleanedProfile.profileImageUrl = data.Key; // Update the profileImageUrl with the stored path
//       }

//       // Logging the complete payload structure
//       console.log("Final payload being sent:", JSON.stringify(cleanedProfile, null, 2));

//       const response = await axios.put(`http://localhost:8082/api/customers/${id}`, cleanedProfile, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert('Profile updated successfully');
//       setUserProfile(cleanedProfile);
//       setIsEditing(false);
//       setIsAddingAddress(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     }
//   };

//   const sendOtp = async () => {
//         setOtpLoading(true);
//         const { error } = await supabase.auth.signInWithOtp({
//           phone: userProfile.phone
//         });
//         if (error) {
//           console.error('Error sending OTP:', error.message);
//         } else {
//           alert('OTP sent! Please check your phone.');
//           setIsOtpSent(true);
//         }
//         setOtpLoading(false);
//       };
    
//       const verifyOtp = async () => {
//         setIsVerifying(true);
//         const { error } = await supabase.auth.verifyOtp({
//           phone: userProfile.phone,
//           token: otp,
//           type: 'sms'  // Specify the verification type
//         });
//         if (error) {
//           console.error('Error verifying OTP:', error.message);
//           alert('OTP verification failed. Please try again.');
//         } else {
//           alert('Phone number verified successfully!');
//         }
//         setIsVerifying(false);
//       };



//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <Card style={{ maxWidth: 700, margin: '20px auto', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//       <CardContent>
//         <Grid container alignItems="center" direction="column" spacing={2}>
//           <Grid item>
//             <Avatar
//               src={userProfile.profileImageUrl}
//               alt="Profile Picture"
//               sx={{ width: 100, height: 100, cursor: 'pointer' }}
//               onClick={() => setIsEditing(true)}
//             />
//           </Grid>
//           <Grid item>
//             <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
//             <Typography variant="body2" color="textSecondary">{userProfile.email}</Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           {/* Profile Fields */}
//           <Grid item xs={6}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={userProfile.firstName}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={userProfile.lastName}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               name="email"
//               value={userProfile.email}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={12}>
//          <TextField
//               label="Phone"
//               name="phone"
//               value={userProfile.phone}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={sendOtp}
//               disabled={!isEditing || otpLoading}
//               style={{ marginTop: '10px' }}
//             >
//               {otpLoading ? 'Sending...' : 'Send OTP'}
//             </Button>
//             {isOtpSent && (
//               <>
//                 <TextField
//                   label="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   fullWidth
//                   style={{ marginTop: '10px' }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={verifyOtp}
//                   disabled={isVerifying}
//                   style={{ marginTop: '10px' }}
//                 >
//                   {isVerifying ? 'Verifying...' : 'Verify OTP'}
//                 </Button>
//               </>
//             )}
//           </Grid>



          
//           <Grid item xs={12}>
//             <TextField
//               label="Gender"
//               name="gender"
//               value={userProfile.gender}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Current Password"
//               name="password"
//               type="password"
//               value={userProfile.password}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="New Password"
//               name="newPassword"
//               type="password"
//               value={userProfile.newPassword}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           {isEditing && (
//             <Grid item xs={12}>
//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageChange}
//                 style={{ display: 'none' }}
//                 id="profile-image-upload"
//               />
//               <label htmlFor="profile-image-upload">
//                 <Button variant="contained" color="secondary" component="span">
//                   Upload Profile Image
//                 </Button>
//               </label>
//             </Grid>
//           )}
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
//               {isEditing ? 'Cancel Edit' : 'Edit Profile'}
//             </Button>
//             {isEditing && (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleSave}
//                 style={{ marginLeft: '10px' }}
//               >
//                 Save Changes
//               </Button>
//             )}
//           </Grid>
//         </Grid>

//         {/* Address Management */}
//         <Grid item xs={12} style={{ marginTop: '20px' }}>
//           <Typography variant="h6">Addresses</Typography>
//           {userProfile.customerAddress.map((address, index) => (
//             <Grid item xs={12} key={index}>
//               <Typography variant="h6">Address {index + 1}</Typography>
//               <Typography variant="body1">{address.receiverDetails}</Typography>
//               <Typography variant="body1">{address.house_number}, {address.street}, {address.landMark}, {address.postcode}, {address.city}, {address.state}, {address.country}</Typography>
//               <Divider style={{ margin: '10px 0' }} />
//             </Grid>
//           ))}

//           {isAddingAddress ? (
//             <>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Receiver Details"
//                   name="receiverDetails"
//                   value={newAddress.receiverDetails}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="House No"
//                   name="houseNo"
//                   value={newAddress.house_number}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Street"
//                   name="street"
//                   value={newAddress.street}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Landmark"
//                   name="landMark"
//                   value={newAddress.landMark}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Postcode"
//                   name="postcode"
//                   value={newAddress.postcode}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="City"
//                   name="city"
//                   value={newAddress.city}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="State"
//                   name="state"
//                   value={newAddress.state}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   label="Country"
//                   name="country"
//                   value={newAddress.country}
//                   onChange={handleAddressChange}
//                   fullWidth
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <Button variant="contained" color="primary" onClick={handleSave}>
//                   Add Address
//                 </Button>
//                 <Button variant="outlined" onClick={() => setIsAddingAddress(false)} style={{ marginLeft: '10px' }}>
//                   Cancel
//                 </Button>
//               </Grid>
//             </>
//           ) : (
//             <Grid item xs={12}>
//               <Button
//                 variant="outlined"
//                 startIcon={<AddIcon />}
//                 onClick={() => {
//                   handleLocationFetch();
//                   setIsAddingAddress(true);
//                 }}
//               >
//                 Add New Address
//               </Button>
//             </Grid>
//           )}
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

// export default Profile;












// import React, { useState, useEffect } from 'react';
// import { TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider } from '@mui/material';
// import axios from 'axios';
// import AddIcon from '@mui/icons-material/Add';
// import { supabase } from './supabaseClient';

// const Profile = () => {
//   const [userProfile, setUserProfile] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     gender: '',
//     profileImageUrl: '',
//     password: '',
//     newPassword: '', // For changing the password
//     customerAddress: [],
//     phone: '',
//     customerOrders: [],
//     favourites: [],
//     customerCart: [],
//     customerRating: {},
//   });

//   const [newAddress, setNewAddress] = useState({
//     receiverDetails: '',
//     saveAddressAs: '',
//     house_number: '',
//     street: '',
//     landMark: '',
//     postcode: '',
//     city: '',
//     state: '',
//     country: '',
//     location: [],
//   });

//   const [isLoading, setIsLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isAddingAddress, setIsAddingAddress] = useState(false);
//   const [imageFile, setImageFile] = useState(null);
//   const [otp, setOtp] = useState('');
// const [otpLoading, setOtpLoading] = useState(false);
// const [isOtpSent, setIsOtpSent] = useState(false);
// const [isVerifying, setIsVerifying] = useState(false);


//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = parseJwt(token);
//       if (decodedToken) {
//         setUserProfile((prevProfile) => ({
//           ...prevProfile,
//           firstName: decodedToken.firstName || '',
//           lastName: decodedToken.lastName || '',
//           email: decodedToken.sub || '',
//         }));
//         fetchProfileData(token, decodedToken.sub);
//       }
//     } else {
//       setIsLoading(false);
//     }
//   }, []);

//   const parseJwt = (token) => {
//     try {
//       return JSON.parse(atob(token.split('.')[1]));
//     } catch (e) {
//       console.error('Invalid token', e);
//       return null;
//     }
//   };

//   const fetchProfileData = async (token, id) => {
//     try {
//       const response = await axios.get(`http://localhost:8082/api/customers/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setUserProfile(response.data);
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserProfile({ ...userProfile, [name]: value });
//   };

//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setNewAddress({ ...newAddress, [name]: value });
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setUserProfile({ ...userProfile, profileImageUrl: `profile/${file.name}` }); // Set the image path
//     }
//   };

//   const fetchLocationData = async (latitude, longitude) => {
//     const apiKey = 'ca7318dc1b8440458dcd480ef7107634'; // Replace with your actual API key
//     try {
//       const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
//       const { country, state , city , postcode , house_number, street } = response.data.results[0].components;
//       setNewAddress((prevAddress) => ({
//         ...prevAddress,
//         street: street || '',
//         house_number: house_number || '',
//         postcode: postcode || '',
//         city: city || '',
//         state: state || '',
//         country: country || '',
//         location: [longitude, latitude],
//       }));
//     } catch (error) {
//       console.error('Error fetching location data:', error);
//     }
//   };

//   const handleLocationFetch = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           fetchLocationData(latitude, longitude);
//         },
//         (error) => {
//           console.error('Error fetching location:', error);
//         }
//       );
//     } else {
//       alert('Geolocation is not supported by this browser.');
//     }
//   };

//   const handleSave = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const id = userProfile.email;

//       // Cleaning up the profile object to remove null/undefined values
//       const cleanedProfile = { ...userProfile };
//       Object.keys(cleanedProfile).forEach((key) => {
//         if (cleanedProfile[key] === undefined || cleanedProfile[key] === null) {
//           delete cleanedProfile[key];
//         }
//       });

//       // Ensure all address fields are included if adding a new address
//       if (isAddingAddress) {
//         const fullAddress = {
//           receiverDetails: Array.isArray(newAddress.receiverDetails) ? newAddress.receiverDetails : [newAddress.receiverDetails || "Me"],
//           saveAddressAs: newAddress.saveAddressAs || [],
//           house_number: newAddress.house_number || '',
//           street: newAddress.street || '',
//           landMark: newAddress.landMark || '',
//           postcode: Number(newAddress.postcode) || '', // Convert postcode to a number
//           city: newAddress.city || '',
//           state: newAddress.state || '',
//           country: newAddress.country || ''
//         };
//         cleanedProfile.customerAddress = [...(cleanedProfile.customerAddress || []), fullAddress];
//       }

//       // If an image file is uploaded, you might want to upload it to your storage
//       if (imageFile) {
//         const { data, error } = await supabase.storage.from('profiles').upload(`profile/${imageFile.name}`, imageFile);
//         if (error) throw error;
//         cleanedProfile.profileImageUrl = data.Key; // Update the profileImageUrl with the stored path
//       }

//       // Logging the complete payload structure
//       console.log("Final payload being sent:", JSON.stringify(cleanedProfile, null, 2));

//       const response = await axios.put(`http://localhost:8082/api/customers/${id}`, cleanedProfile, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert('Profile updated successfully');
//       setUserProfile(cleanedProfile);
//       setIsEditing(false);
//       setIsAddingAddress(false);
//     } catch (error) {
//       console.error('Error saving profile:', error);
//     }
//   };

//   const sendOtp = async () => {
//         setOtpLoading(true);
//         const { error } = await supabase.auth.signInWithOtp({
//           phone: userProfile.phone
//         });
//         if (error) {
//           console.error('Error sending OTP:', error.message);
//         } else {
//           alert('OTP sent! Please check your phone.');
//           setIsOtpSent(true);
//         }
//         setOtpLoading(false);
//       };
    
//       const verifyOtp = async () => {
//         setIsVerifying(true);
//         const { error } = await supabase.auth.verifyOtp({
//           phone: userProfile.phone,
//           token: otp,
//           type: 'sms'  // Specify the verification type
//         });
//         if (error) {
//           console.error('Error verifying OTP:', error.message);
//           alert('OTP verification failed. Please try again.');
//         } else {
//           alert('Phone number verified successfully!');
//         }
//         setIsVerifying(false);
//       };



//   if (isLoading) {
//     return <div>Loading profile...</div>;
//   }

//   return (
//     <Card style={{ maxWidth: 700, margin: '20px auto', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
//       <CardContent>
//         <Grid container alignItems="center" direction="column" spacing={2}>
//           <Grid item>
//             <Avatar
//               src={userProfile.profileImageUrl}
//               alt="Profile Picture"
//               sx={{ width: 100, height: 100, cursor: 'pointer' }}
//               onClick={() => setIsEditing(true)}
//             />
//           </Grid>
//           <Grid item>
//             <Typography variant="h5">{`${userProfile.firstName} ${userProfile.lastName}`}</Typography>
//             <Typography variant="body2" color="textSecondary">{userProfile.email}</Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           {/* Profile Fields */}
//           <Grid item xs={6}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               value={userProfile.firstName}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={userProfile.lastName}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Email"
//               name="email"
//               value={userProfile.email}
//               onChange={handleChange}
//               fullWidth
//               disabled
//             />
//           </Grid>
//           <Grid item xs={12}>
//          <TextField
//               label="Phone"
//               name="phone"
//               value={userProfile.phone}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={sendOtp}
//               disabled={!isEditing || otpLoading}
//               style={{ marginTop: '10px' }}
//             >
//               {otpLoading ? 'Sending...' : 'Send OTP'}
//             </Button>
//             {isOtpSent && (
//               <>
//                 <TextField
//                   label="Enter OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   fullWidth
//                   style={{ marginTop: '10px' }}
//                 />
//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={verifyOtp}
//                   disabled={isVerifying}
//                   style={{ marginTop: '10px' }}
//                 >
//                   {isVerifying ? 'Verifying...' : 'Verify OTP'}
//                 </Button>
//               </>
//             )}
//           </Grid>



          
//           <Grid item xs={12}>
//             <TextField
//               label="Gender"
//               name="gender"
//               value={userProfile.gender}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="Current Password"
//               name="password"
//               type="password"
//               value={userProfile.password}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <TextField
//               label="New Password"
//               name="newPassword"
//               type="password"
//               value={userProfile.newPassword}
//               onChange={handleChange}
//               fullWidth
//               disabled={!isEditing}
//             />
//           </Grid>
//           {isEditing && (
//             <Grid item xs={12}>
//               <input
//                 accept="image/*"
//                 type="file"
//                 onChange={handleImageChange}
//                 style={{ display: 'none' }}
//                 id="profile-image-upload"
//               />
//               <label htmlFor="profile-image-upload">
//                 <Button variant="contained" color="secondary" component="span">
//                   Upload Profile Image
//                 </Button>
//               </label>
//             </Grid>
//           )}
//         </Grid>

//         <Grid container spacing={2} style={{ marginTop: '20px' }}>
//           <Grid item xs={12}>
//             <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
//               {isEditing ? 'Cancel Edit' : 'Edit Profile'}
//             </Button>
//             {isEditing && (
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleSave}
//                 style={{ marginLeft: '10px' }}
//               >
//                 Save Changes
//               </Button>
//             )}
//           </Grid>
//         </Grid>

//         {/* Address Management */}
// <Grid item xs={12} style={{ marginTop: '20px' }}>
//   <Typography variant="h6">Addresses</Typography>

//   {Array.isArray(userProfile.customerAddress) && userProfile.customerAddress.length > 0 ? (
//     userProfile.customerAddress.map((address, index) => (
//       <Grid item xs={12} key={index}>
//         <Typography variant="h6">Address {index + 1}</Typography>
//         <Typography variant="body1">{address.receiverDetails}</Typography>
//         <Typography variant="body1">{address.house_number}, {address.street}, {address.landMark}, {address.postcode}, {address.city}, {address.state}, {address.country}</Typography>
//         <Divider style={{ margin: '10px 0' }} />
//       </Grid>
//     ))
//   ) : (
//     <Typography variant="body1">No addresses found.</Typography>
//   )}

//   {isAddingAddress ? (
//     <>
//       <Grid item xs={12}>
//         <TextField
//           label="Receiver Details"
//           name="receiverDetails"
//           value={newAddress.receiverDetails}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="House No"
//           name="house_number" // Correcting the name to match newAddress structure
//           value={newAddress.house_number}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Street"
//           name="street"
//           value={newAddress.street}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Landmark"
//           name="landMark"
//           value={newAddress.landMark}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Postcode"
//           name="postcode"
//           value={newAddress.postcode}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="City"
//           name="city"
//           value={newAddress.city}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="State"
//           name="state"
//           value={newAddress.state}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <TextField
//           label="Country"
//           name="country"
//           value={newAddress.country}
//           onChange={handleAddressChange}
//           fullWidth
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={async () => {
//             await handleSave(); // Call your save function
//             setNewAddress({ // Resetting the address form
//               receiverDetails: '',
//               house_number: '',
//               street: '',
//               landMark: '',
//               postcode: '',
//               city: '',
//               state: '',
//               country: '',
//               location: [],
//             });
//             setIsAddingAddress(false); // Close the adding address section
//           }}
//         >
//           Add Address
//         </Button>
//         <Button
//           variant="outlined"
//           onClick={() => {
//             setNewAddress({
//               receiverDetails: '',
//               house_number: '',
//               street: '',
//               landMark: '',
//               postcode: '',
//               city: '',
//               state: '',
//               country: '',
//               location: [],
//             });
//             setIsAddingAddress(false);
//           }}
//           style={{ marginLeft: '10px' }}
//         >
//           Cancel
//         </Button>
//       </Grid>
//     </>
//   ) : (
//     <Grid item xs={12}>
//       <Button
//         variant="outlined"
//         startIcon={<AddIcon />}
//         onClick={() => {
//           handleLocationFetch();
//           setIsAddingAddress(true);
//         }}
//       >
//         Add New Address
//       </Button>
//     </Grid>
//   )}
// </Grid>

        
//       </CardContent>
//     </Card>
//   );
// };

// export default Profile;










import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Card, CardContent, Avatar, Grid, Divider, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { supabase } from './supabaseClient';

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    profileImageUrl: '',
    password: '',
    newPassword: '',
    customerAddress: [],
    phone: '',
    customerOrders: [],
    favourites: [],
    customerCart: [],
    customerRating: {},
  });

  const [newAddress, setNewAddress] = useState({
    receiverDetails: '',
    saveAddressAs: '',
    house_number: '',
    street: '',
    landMark: '',
    postcode: '',
    city: '',
    state: '',
    country: '',
    location: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);

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
        fetchProfileData(token, decodedToken.sub);
      }
    } else {
      setIsLoading(false);
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

  const fetchProfileData = async (token, id) => {
    try {
      const response = await axios.get(`http://localhost:8082/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserProfile(response.data);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setUserProfile({ ...userProfile, profileImageUrl: `profile/${file.name}` });
    }
  };

  const fetchLocationData = async (latitude, longitude) => {
    const apiKey = 'ca7318dc1b8440458dcd480ef7107634';
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`);
      const { country, state, city, postcode, house_number, street } = response.data.results[0].components;
      setNewAddress((prevAddress) => ({
        ...prevAddress,
        street: street || '',
        house_number: house_number || '',
        postcode: postcode || '',
        city: city || '',
        state: state || '',
        country: country || '',
        location: [longitude, latitude],
      }));
      console.log('Latitude:', latitude, 'Longitude:', longitude);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const handleLocationFetch = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationData(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleDeleteAddress = async (index) => {
    const updatedAddresses = userProfile.customerAddress.filter((_, i) => i !== index);
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      customerAddress: updatedAddresses,
    }));
    await updateCustomerProfile(updatedAddresses); // Send updated customer object
  };

  const handleEditAddress = (index) => {
    setNewAddress(userProfile.customerAddress[index]);
    setIsAddingAddress(true);
    setEditingAddressIndex(index);
  };

  const updateCustomerProfile = async (addresses = userProfile.customerAddress) => {
    try {
      const token = localStorage.getItem('token');
      const id = userProfile.email;

      const cleanedProfile = { ...userProfile, customerAddress: addresses };
      if (imageFile) {
        const { data, error } = await supabase.storage.from('profiles').upload(`profile/${imageFile.name}`, imageFile);
        if (error) throw error;
        cleanedProfile.profileImageUrl = data.Key;
      }

      await axios.put(`http://localhost:8082/api/customers/${id}`, cleanedProfile, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Profile updated successfully');
      setUserProfile(cleanedProfile);
      setIsEditing(false);
      setIsAddingAddress(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleSave = async () => {
    const updatedAddresses = [...userProfile.customerAddress];
  if (editingAddressIndex !== null) {
    updatedAddresses[editingAddressIndex] = { ...newAddress }; // Update existing address
    setEditingAddressIndex(null); // Reset editing index
  } else {
    updatedAddresses.push({ ...newAddress }); // Add new address
  }
  
  // Update the user profile with the modified addresses
  setUserProfile((prevProfile) => ({
    ...prevProfile,
    customerAddress: updatedAddresses,
  }));
  
  await updateCustomerProfile(updatedAddresses); // Send updated addresses to backend

    setIsAddingAddress(false);
    setNewAddress({
      receiverDetails: '',
      house_number: '',
      street: '',
      landMark: '',
      postcode: '',
      city: '',
      state: '',
      country: '',
      location: [],
    });
  };

  const sendOtp = async () => {
    setOtpLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: userProfile.phone
    });
    if (error) {
      console.error('Error sending OTP:', error.message);
    } else {
      alert('OTP sent! Please check your phone.');
      setIsOtpSent(true);
    }
    setOtpLoading(false);
  };

  const verifyOtp = async () => {
    setIsVerifying(true);
    const { error } = await supabase.auth.verifyOtp({
      phone: userProfile.phone,
      token: otp,
      type: 'sms'
    });
    if (error) {
      console.error('Error verifying OTP:', error.message);
      alert('OTP verification failed. Please try again.');
    } else {
      alert('Phone number verified successfully!');
    }
    setIsVerifying(false);
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

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          {/* Profile Fields */}
          <Grid item xs={6}>
            <TextField
              label="First Name"
              name="firstName"
              value={userProfile.firstName}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              name="lastName"
              value={userProfile.lastName}
              onChange={handleChange}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              name="email"
              value={userProfile.email}
              onChange={handleChange}
              fullWidth
              disabled
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
            <Button
              variant="contained"
              color="primary"
              onClick={sendOtp}
              disabled={!isEditing || otpLoading}
              style={{ marginTop: '10px' }}
            >
              {otpLoading ? 'Sending...' : 'Send OTP'}
            </Button>
            {isOtpSent && (
              <>
                <TextField
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  fullWidth
                  style={{ marginTop: '10px' }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={verifyOtp}
                  disabled={isVerifying}
                  style={{ marginTop: '10px' }}
                >
                  {isVerifying ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </>
            )}
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
              label="Current Password"
              name="password"
              type="password"
              value={userProfile.password}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="New Password"
              name="newPassword"
              type="password"
              value={userProfile.newPassword}
              onChange={handleChange}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          {isEditing && (
            <Grid item xs={12}>
              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="profile-image-upload"
              />
              <label htmlFor="profile-image-upload">
                <Button variant="contained" color="secondary" component="span">
                  Upload Profile Image
                </Button>
              </label>
            </Grid>
          )}
        </Grid>

        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel Edit' : 'Edit Profile'}
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSave}
                style={{ marginLeft: '10px' }}
              >
                Save Changes
              </Button>
            )}
          </Grid>
        </Grid>

        {/* Address Management */}
        <Grid item xs={12} style={{ marginTop: '20px' }}>
          <Typography variant="h6">Addresses</Typography>
          {Array.isArray(userProfile.customerAddress) && userProfile.customerAddress.length > 0 ? (
            userProfile.customerAddress.map((address, index) => (
              <Grid container alignItems="center" key={index} style={{ marginBottom: '15px' }}>
                <Grid item xs={10}>
                  <Typography variant="body1">{address.receiverDetails}</Typography>
                  <Typography variant="body2">
                    {address.house_number}, {address.street}, {address.landMark}, {address.postcode}, {address.city}, {address.state}, {address.country}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <IconButton onClick={() => handleEditAddress(index)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteAddress(index)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
                <Divider style={{ width: '100%', margin: '10px 0' }} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No addresses found.</Typography>
          )}

          {isAddingAddress && (
            <>
              {/* Address Form Fields */}
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
                  label="House No"
                  name="house_number"
                  value={newAddress.house_number}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Street"
                  name="street"
                  value={newAddress.street}
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
                  label="Postcode"
                  name="postcode"
                  value={newAddress.postcode}
                  onChange={handleAddressChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="City"
                  name="city"
                  value={newAddress.city}
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{ marginTop: '10px' }}
                >
                  {editingAddressIndex !== null ? 'Update Address' : 'Add Address'}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setIsAddingAddress(false);
                    setNewAddress({
                      receiverDetails: '',
                      house_number: '',
                      street: '',
                      landMark: '',
                      postcode: '',
                      city: '',
                      state: '',
                      country: '',
                      location: [],
                    });
                    setEditingAddressIndex(null);
                  }}
                  style={{ marginLeft: '10px', marginTop: '10px' }}
                >
                  Cancel
                </Button>
              </Grid>
            </>
          )}
          {!isAddingAddress && (
            <Grid item xs={12}>
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => {
                  handleLocationFetch();
                  setIsAddingAddress(true);
                }}
                style={{ marginTop: '10px' }}
              >
                Add New Address
              </Button>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Profile;



