package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.model.Restaurant;
import com.example.demo.model.Dish;
import com.example.demo.service.RestaurantService;


import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    // Get all restaurants
    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    // Get restaurant by ID
    @GetMapping("/{id}")
    public Restaurant getRestaurantById(@PathVariable String id) {
        return restaurantService.getRestaurantById(id);
    }

    // Create a new restaurant
    @PostMapping
    public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.addRestaurant(restaurant);
    }

    // Update an existing restaurant
    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> updateRestaurant(@PathVariable String id, @RequestBody Restaurant restaurantDetails) {
        Restaurant updatedRestaurant = restaurantService.updateRestaurant(id, restaurantDetails);
        if (updatedRestaurant != null) {
            return ResponseEntity.ok(updatedRestaurant);
        } else {
            return ResponseEntity.notFound().build();  // Restaurant not found
        }
    }

    // Delete a restaurant by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable String id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }

    // API to find nearby restaurants
    @GetMapping("/nearby")
    public List<Restaurant> getNearbyRestaurants(@RequestParam double longitude, @RequestParam double latitude, @RequestParam double radius) {
        return restaurantService.findNearbyRestaurants(longitude, latitude, radius);
    }

    // ================== IMAGE HANDLING ENDPOINTS ==================

    // // Upload restaurant image
    // @PostMapping("/{id}/upload-image")
    // public ResponseEntity<String> uploadRestaurantImage(@PathVariable String id, @RequestParam("image") MultipartFile imageFile) {
    //     try {
    //         String imageUrl = restaurantService.uploadRestaurantImage(id, imageFile);
    //         if (imageUrl != null) {
    //             return ResponseEntity.ok(imageUrl);
    //         } else {
    //             return ResponseEntity.notFound().build();  // Restaurant not found
    //         }
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
    //     }
    // }

    // // Update restaurant image
    // @PutMapping("/{id}/update-image")
    // public ResponseEntity<String> updateRestaurantImage(@PathVariable String id, @RequestParam("image") MultipartFile imageFile) {
    //     try {
    //         String updatedImageUrl = restaurantService.updateRestaurantImage(id, imageFile);
    //         if (updatedImageUrl != null) {
    //             return ResponseEntity.ok(updatedImageUrl);
    //         } else {
    //             return ResponseEntity.notFound().build();  // Restaurant not found
    //         }
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).body("Error updating image: " + e.getMessage());
    //     }
    // }

    // // Delete restaurant image
    // @DeleteMapping("/{id}/delete-image")
    // public ResponseEntity<Void> deleteRestaurantImage(@PathVariable String id) {
    //     try {
    //         restaurantService.deleteRestaurantImage(id);
    //         return ResponseEntity.noContent().build();
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).build();  // Error deleting image
    //     }
    // }

 // Upload restaurant image
@PostMapping("/{id}/upload-image")
public ResponseEntity<String> uploadRestaurantImage(@PathVariable String id, @RequestBody String imageUrl) {
    try {
        String uploadedImageUrl = restaurantService.uploadRestaurantImage(id, imageUrl);
        if (uploadedImageUrl != null) {
            return ResponseEntity.ok(uploadedImageUrl);
        } else {
            return ResponseEntity.notFound().build();  // Restaurant not found
        }
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error uploading image: " + e.getMessage());
    }
}

// Update restaurant image
@PutMapping("/{id}/update-image")
public ResponseEntity<String> updateRestaurantImage(@PathVariable String id, @RequestBody String imageUrl) {
    try {
        String updatedImageUrl = restaurantService.updateRestaurantImage(id, imageUrl);
        if (updatedImageUrl != null) {
            return ResponseEntity.ok(updatedImageUrl);
        } else {
            return ResponseEntity.notFound().build();  // Restaurant not found
        }
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error updating image: " + e.getMessage());
    }
}


// Delete restaurant image
@DeleteMapping("/{id}/delete-image")
public ResponseEntity<Void> deleteRestaurantImage(@PathVariable String id) {
    try {
        restaurantService.deleteRestaurantImage(id);
        return ResponseEntity.noContent().build();
    } catch (Exception e) {
        return ResponseEntity.status(500).build();  // Error deleting image
    }
}


    // ================== DISH HANDLING ENDPOINTS ==================

    // Get all dishes across all restaurants
    @GetMapping("/dishes")
    public ResponseEntity<List<Dish>> getAllDishes() {
        List<Dish> dishes = restaurantService.getAllDishes();
        if (dishes != null && !dishes.isEmpty()) {
            return ResponseEntity.ok(dishes);
        } else {
            return ResponseEntity.noContent().build();  // No dishes found
        }
    }

    // Add a new dish to a restaurant
    @PostMapping("/{restaurantId}/dishes")
    public ResponseEntity<Restaurant> addDish(@PathVariable String restaurantId, @RequestBody Dish dish) {
        Restaurant updatedRestaurant = restaurantService.addDishToRestaurant(restaurantId, dish);
        if (updatedRestaurant != null) {
            return ResponseEntity.ok(updatedRestaurant);
        } else {
            return ResponseEntity.notFound().build();  // Restaurant not found
        }
    }

    // Update a dish in a restaurant
    @PutMapping("/{restaurantId}/dishes/{dishId}")
    public ResponseEntity<Restaurant> updateDish(@PathVariable String restaurantId, @PathVariable String dishId, @RequestBody Dish dishDetails) {
        Restaurant updatedRestaurant = restaurantService.updateDishInRestaurant(restaurantId, dishId, dishDetails);
        if (updatedRestaurant != null) {
            return ResponseEntity.ok(updatedRestaurant);
        } else {
            return ResponseEntity.notFound().build();  // Restaurant or Dish not found
        }
    }

    // Remove a dish from a restaurant
    @DeleteMapping("/{restaurantId}/dishes/{dishId}")
    public ResponseEntity<Restaurant> removeDish(@PathVariable String restaurantId, @PathVariable String dishId) {
        Restaurant updatedRestaurant = restaurantService.removeDishFromRestaurant(restaurantId, dishId);
        if (updatedRestaurant != null) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();  // Restaurant or Dish not found
        }
    }

    // ================== DISH IMAGE HANDLING ENDPOINTS ==================

    // // Upload dish image
    // @PostMapping("/{restaurantId}/dishes/{dishId}/upload-image")
    // public ResponseEntity<String> uploadDishImage(@PathVariable String restaurantId, @PathVariable String dishId, @RequestParam("image") MultipartFile imageFile) {
    //     try {
    //         String imageUrl = restaurantService.uploadDishImage(restaurantId, dishId, imageFile);
    //         if (imageUrl != null) {
    //             return ResponseEntity.ok(imageUrl);
    //         } else {
    //             return ResponseEntity.notFound().build();  // Restaurant or Dish not found
    //         }
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).body("Error uploading dish image: " + e.getMessage());
    //     }
    // }

    // // Update dish image
    // @PutMapping("/{restaurantId}/dishes/{dishId}/update-image")
    // public ResponseEntity<String> updateDishImage(@PathVariable String restaurantId, @PathVariable String dishId, @RequestParam("image") MultipartFile imageFile) {
    //     try {
    //         String updatedImageUrl = restaurantService.updateDishImage(restaurantId, dishId, imageFile);
    //         if (updatedImageUrl != null) {
    //             return ResponseEntity.ok(updatedImageUrl);
    //         } else {
    //             return ResponseEntity.notFound().build();  // Restaurant or Dish not found
    //         }
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).body("Error updating dish image: " + e.getMessage());
    //     }
    // }

    // // Delete dish image
    // @DeleteMapping("/{restaurantId}/dishes/{dishId}/delete-image")
    // public ResponseEntity<Void> deleteDishImage(@PathVariable String restaurantId, @PathVariable String dishId) {
    //     try {
    //         restaurantService.deleteDishImage(restaurantId, dishId);
    //         return ResponseEntity.noContent().build();
    //     } catch (IOException e) {
    //         return ResponseEntity.status(500).build();  // Error deleting dish image
    //     }
    // }

   // Upload dish image
@PostMapping("/{restaurantId}/dishes/{dishId}/upload-image")
public ResponseEntity<String> uploadDishImage(@PathVariable String restaurantId, @PathVariable String dishId, 
                                              @RequestBody String imageUrl) {
    try {
        String uploadedImageUrl = restaurantService.uploadDishImage(restaurantId, dishId, imageUrl);
        if (uploadedImageUrl != null) {
            return ResponseEntity.ok(uploadedImageUrl);
        } else {
            return ResponseEntity.notFound().build();  // Restaurant or Dish not found
        }
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error uploading dish image: " + e.getMessage());
    }
}

// Update dish image
@PutMapping("/{restaurantId}/dishes/{dishId}/update-image")
public ResponseEntity<String> updateDishImage(@PathVariable String restaurantId, @PathVariable String dishId, 
                                              @RequestBody String imageUrl) {
    try {
        String updatedImageUrl = restaurantService.updateDishImage(restaurantId, dishId, imageUrl);
        if (updatedImageUrl != null) {
            return ResponseEntity.ok(updatedImageUrl);
        } else {
            return ResponseEntity.notFound().build();  // Restaurant or Dish not found
        }
    } catch (Exception e) {
        return ResponseEntity.status(500).body("Error updating dish image: " + e.getMessage());
    }
}

// Delete dish image
@DeleteMapping("/{restaurantId}/dishes/{dishId}/delete-image")
public ResponseEntity<Void> deleteDishImage(@PathVariable String restaurantId, @PathVariable String dishId) {
    try {
        restaurantService.deleteDishImage(restaurantId, dishId);
        return ResponseEntity.noContent().build();
    } catch (Exception e) {
        return ResponseEntity.status(500).build();  // Error deleting dish image
    }
}
// Endpoint to update all dish images for a restaurant
@PutMapping("/{id}/update-all-dish-images")
public ResponseEntity<Void> updateAllDishImages(@PathVariable String id) {
    try {
        restaurantService.updateAllDishImages(id);
        return ResponseEntity.noContent().build();
    } catch (Exception e) {
        return ResponseEntity.status(500).build();  // Error updating dish images
    }
}

}
