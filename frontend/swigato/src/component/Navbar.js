// import React from "react";
// import { Button, Box } from "@mui/material";

// const Navbar = ({ products, onSearchMilk }) => {
//   // Extract unique categories from the products array
//   const categories = ['ALL',...new Set(products.map((product) => product.category))];
//   console.log(categories);
//   return (
    
//     <Box sx={{ backgroundColor: 'brown', padding: '1px' }}>
//       <Box component="ul" sx={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', margin: 0 }}>
//         {categories.map((category, index) => (
//           <Box component="li" key={index} sx={{ margin: '0 20px' }}>
//             <Button
//               onClick={() => onSearchMilk(category)}
//               sx={{
//                 background: 'none',
//                 border: 'none',
//                 color: 'white',
//                 fontSize: '1em',
//                 cursor: 'pointer',
//                 padding: '10px 20px',
//                 '&:hover': {
//                   backgroundColor: '#e69a00',
//                   borderRadius: '5px',
//                 }
//               }}
//             >
//               {category}
//             </Button>
//           </Box>
//         ))}
//       </Box>
//     </Box>
//   );
// }

// export default Navbar;

import React from "react";
import { Button, Box } from "@mui/material";

const Navbar = ({ products, onSearchMilk }) => {
  // Extract unique categories from all dishes across restaurants
  const categories = [
    'ALL', 
    ...new Set(
      products
        .flatMap((restaurant) => restaurant.dishes)
        .map((dish) => dish.category)
    )
  ];

  // Mapping for specific category names
  const categoryMapping = {
    'North Indian': 'North',
    'South Indian': 'South',
  };

  // Define the desired order of categories
  const categoryOrder = [
    'ALL', 
    'North Indian', 
    'South Indian', 
    'Bengali', 
    'Chinese', 
    'Japanese', 
    'Side Dish', 
    'Sweets', 
    'Beverage', 
    'Café'
  ];

  // Sort categories based on the defined order
  const sortedCategories = categoryOrder.filter(category => categories.includes(category));

  console.log(sortedCategories); // for debugging

  return (
    <Box sx={{ backgroundColor: 'OrangeRed', padding: '1px' }}>
      <Box component="ul" sx={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', margin: 0 }}>
        {sortedCategories.map((category, index) => (
          <Box component="li" key={index} sx={{ margin: '0 20px' }}>
            <Button
              onClick={() => onSearchMilk(category)}
              sx={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1em',
                cursor: 'pointer',
                padding: '10px 20px',
                '&:hover': {
                  backgroundColor: 'Gold',
                  borderRadius: '5px',
                }
              }}
            >
              {/* Use mapping for specific categories */}
              {categoryMapping[category] || category}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Navbar;


