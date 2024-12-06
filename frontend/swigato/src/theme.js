// // theme.js
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     mode: 'dark',
//     background: {
//       default: '#121212', // Background color for the app
//       paper: '#1d1d1d',   // Background color for paper elements
//     },
//     text: {
//       primary: '#ffffff', // Text color for primary text
//       secondary: '#b0b0b0', // Text color for secondary text
//     },
//   },
// });

// export default theme;



// theme.js
// import { createTheme, useMediaQuery } from '@mui/material';
// import { useMemo } from 'react';

// const useAppTheme = () => {
//   // Detect system dark mode setting
//   const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

//   // Memoize the theme creation to improve performance
//   const theme = useMemo(() => 
//     createTheme({
//       palette: {
//         mode: prefersDarkMode ? 'dark' : 'light',
//         background: {
//           default: prefersDarkMode ? '#121212' : '#ffffff', // Background color for the app
//           paper: prefersDarkMode ? '#1d1d1d' : '#f5f5f5',   // Background color for paper elements
//         },
//         text: {
//           primary: prefersDarkMode ? '#ffffff' : '#000000',  // Text color for primary text
//           secondary: prefersDarkMode ? '#b0b0b0' : '#5f6368', // Text color for secondary text
//         },
//       },
//     }), 
//     [prefersDarkMode]
//   );

//   return theme;
// };

// export default useAppTheme;


import { createTheme, useMediaQuery } from '@mui/material';
import { useMemo, useState, useEffect } from 'react';

const useAppTheme = () => {
  // Detect system dark mode setting
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [userPreference, setUserPreference] = useState(localStorage.getItem('themePreference') || 'system');

  // Update user preference in localStorage
  useEffect(() => {
    localStorage.setItem('themePreference', userPreference);
  }, [userPreference]);

  // Determine the theme mode
  const mode = userPreference === 'system' 
    ? (prefersDarkMode ? 'dark' : 'light') 
    : userPreference;

  // Memoize the theme creation to improve performance
  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode,
        background: {
          default: mode === 'dark' ? '#121212' : '#ffffff',
          paper: mode === 'dark' ? '#1d1d1d' : '#f5f5f5',
        },
        text: {
          primary: mode === 'dark' ? '#ffffff' : '#000000',
          secondary: mode === 'dark' ? '#b0b0b0' : '#5f6368',
        },
      },
    }), 
    [mode] // Recalculate theme if the mode changes
  );

  // Function to set user theme preference
  const setThemePreference = (preference) => {
    setUserPreference(preference);
  };

  return { theme, setThemePreference };
};

export default useAppTheme;



