package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.geo.Distance;
import org.springframework.stereotype.Service;
import com.example.demo.model.Restaurant;
import com.example.demo.model.Dish;
import com.example.demo.repository.RestaurantRepository;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    // // Directory to store images
    // private final String imageDirectory1 = "src/main/resources/static/restaurants/";
    // private final String imageDirectory2 = "src/main/resources/static/dishes/";

    // Get all restaurants
    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    // Get restaurant by ID
    public Restaurant getRestaurantById(String id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    // Add a new restaurant
    public Restaurant addRestaurant(Restaurant restaurant) {
        // Find the last restaurant ID
        List<Restaurant> restaurants = restaurantRepository.findAll();
        Optional<Restaurant> lastRestaurant = restaurants.stream()
            .max(Comparator.comparing(r -> Integer.parseInt(r.getId().substring(1))));
    
        // Generate a new restaurant ID
        String newId = "r1"; // Default ID if none exists
        if (lastRestaurant.isPresent()) {
            int lastIdNum = Integer.parseInt(lastRestaurant.get().getId().substring(1));
            newId = "r" + (lastIdNum + 1);
        }
    
        // Set the new ID for the restaurant
        restaurant.setId(newId);
        return restaurantRepository.save(restaurant);
    }

    // Update restaurant by ID
    public Restaurant updateRestaurant(String id, Restaurant restaurantDetails) {
        Restaurant restaurant = restaurantRepository.findById(id).orElse(null);
        if (restaurant != null) {
            restaurant.setName(restaurantDetails.getName());
            restaurant.setOwnerName(restaurantDetails.getOwnerName());
            restaurant.setAddress(restaurantDetails.getAddress());
            restaurant.setPhoneNumber(restaurantDetails.getPhoneNumber());
            restaurant.setEmail(restaurantDetails.getEmail());
            restaurant.setImageUrl(restaurantDetails.getImageUrl());
            restaurant.setDishes(restaurantDetails.getDishes());
            return restaurantRepository.save(restaurant);
        }
        return null;
    }

    // Delete restaurant by ID
    public void deleteRestaurant(String id) {
        restaurantRepository.deleteById(id);
    }

    // Add a new dish to a restaurant
    // public Restaurant addDishToRestaurant(String restaurantId, Dish dish) {
    //     Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    //     if (restaurant != null) {
    //         List<Dish> dishes = restaurant.getDishes();
    
    //         // Find the last dish ID
    //         Optional<Dish> lastDish = dishes.stream()
    //             .max(Comparator.comparing(d -> Integer.parseInt(d.getId().substring(1))));
    
    //         // Generate a new dish ID
    //         String newDishId = "d1"; // Default ID if none exists
    //         if (lastDish.isPresent()) {
    //             int lastDishIdNum = Integer.parseInt(lastDish.get().getId().substring(1));
    //             newDishId = "d" + (lastDishIdNum + 1);
    //         }
    
    //         // Set the new ID for the dish
    //         dish.setId(newDishId);
    //         dishes.add(dish);
    //         restaurant.setDishes(dishes);
    //         return restaurantRepository.save(restaurant);
    //     }
    //     return null;
    // }

    public Restaurant addDishToRestaurant(String restaurantId, Dish dish) {
    Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    if (restaurant != null) {
        List<Dish> dishes = restaurant.getDishes();

        // Fetch all restaurants and collect all dishes to find the last dish ID globally
        List<Restaurant> allRestaurants = restaurantRepository.findAll();
        List<Dish> allDishes = new ArrayList<>();
        for (Restaurant r : allRestaurants) {
            allDishes.addAll(r.getDishes());
        }

        // Find the last dish ID across all restaurants
        Optional<Dish> lastDish = allDishes.stream()
            .max(Comparator.comparing(d -> Integer.parseInt(d.getId().substring(1))));

        // Generate a new dish ID based on the last global dish ID
        String newDishId = "d1"; // Default ID if no dishes exist
        if (lastDish.isPresent()) {
            int lastDishIdNum = Integer.parseInt(lastDish.get().getId().substring(1));
            newDishId = "d" + (lastDishIdNum + 1);
        }

        // Set the new ID for the dish and add it to the restaurant's dishes
        dish.setId(newDishId);
        dishes.add(dish);
        restaurant.setDishes(dishes);
        return restaurantRepository.save(restaurant);
    }
    return null;
}
    // Get all dishes across all restaurants
    public List<Dish> getAllDishes() {
        List<Restaurant> restaurants = restaurantRepository.findAll();
        List<Dish> allDishes = new ArrayList<>();
        for (Restaurant restaurant : restaurants) {
            if (restaurant.getDishes() != null) {
                allDishes.addAll(restaurant.getDishes());
            }
        }
        return allDishes;
    }

    // Update a dish in a restaurant
    public Restaurant updateDishInRestaurant(String restaurantId, String dishId, Dish dishDetails) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
        if (restaurant != null) {
            List<Dish> dishes = restaurant.getDishes();
            for (int i = 0; i < dishes.size(); i++) {
                Dish existingDish = dishes.get(i);
                if (existingDish.getId().equals(dishId)) {
                    existingDish.setName(dishDetails.getName());
                    existingDish.setDescription(dishDetails.getDescription());
                    existingDish.setAvailable(dishDetails.isAvailable());
                    existingDish.setPrice(dishDetails.getPrice());
                    existingDish.setImageUrl(dishDetails.getImageUrl());
                    existingDish.setDiscountAvailable(dishDetails.isDiscountAvailable());
                    existingDish.setDiscount(dishDetails.getDiscount());
                    existingDish.setCategory(dishDetails.getCategory());
                    existingDish.setVeg(dishDetails.isVeg());
                    dishes.set(i, existingDish);
                    break;
                }
            }
            restaurant.setDishes(dishes);
            return restaurantRepository.save(restaurant);
        }
        return null;
    }

    // Remove a dish from a restaurant
    public Restaurant removeDishFromRestaurant(String restaurantId, String dishId) {
        Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
        if (restaurant != null) {
            List<Dish> dishes = restaurant.getDishes();
            dishes.removeIf(dish -> dish.getId().equals(dishId));
            restaurant.setDishes(dishes);
            return restaurantRepository.save(restaurant);
        }
        return null;
    }

    // Business logic to find restaurants near a specific location
    public List<Restaurant> findNearbyRestaurants(double longitude, double latitude, double radiusInKilometers) {
        // Use GeoJsonPoint for geospatial queries
        GeoJsonPoint location = new GeoJsonPoint(longitude, latitude);
        Distance distance = new Distance(radiusInKilometers);
        return restaurantRepository.findByLocationNear(location, distance);
    }

    // ========================= IMAGE HANDLING METHODS =========================

    // // Upload Restaurant Image
    // public String uploadRestaurantImage(String restaurantId, MultipartFile imageFile) throws IOException {
    //     Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    //     if (restaurant != null) {
    //         String fileName = imageFile.getOriginalFilename();
    //         Path imagePath = Paths.get(imageDirectory1 + fileName);
    //         Files.write(imagePath, imageFile.getBytes());

    //         // Set image URL (relative or absolute)
    //         restaurant.setImageUrl("/restaurants/" + fileName);
    //         restaurantRepository.save(restaurant);
    //         return restaurant.getImageUrl();
    //     }
    //     return null;
    // }

    // // Delete Restaurant Image
    // public void deleteRestaurantImage(String restaurantId) throws IOException {
    //     Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    //     if (restaurant != null) {
    //         String imageUrl = restaurant.getImageUrl();
    //         if (imageUrl != null) {
    //             File file = new File(imageDirectory1 + imageUrl);
    //             if (file.exists()) {
    //                 file.delete();
    //             }
    //             restaurant.setImageUrl(null);
    //             restaurantRepository.save(restaurant);
    //         }
    //     }
    // }

    // // Update Restaurant Image
    // public String updateRestaurantImage(String restaurantId, MultipartFile imageFile) throws IOException {
    //     deleteRestaurantImage(restaurantId);
    //     return uploadRestaurantImage(restaurantId, imageFile);
    // }

    // // Upload Dish Image
    // public String uploadDishImage(String restaurantId, String dishId, MultipartFile imageFile) throws IOException {
    //     Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    //     if (restaurant != null) {
    //         List<Dish> dishes = restaurant.getDishes();
    //         for (Dish dish : dishes) {
    //             if (dish.getId().equals(dishId)) {
    //                 String fileName = imageFile.getOriginalFilename();
    //                 Path imagePath = Paths.get(imageDirectory2 + fileName);
    //                 Files.write(imagePath, imageFile.getBytes());

    //                 dish.setImageUrl("/dishes/" + fileName);
    //                 restaurantRepository.save(restaurant);
    //                 return dish.getImageUrl();
    //             }
    //         }
    //     }
    //     return null;
    // }

    // // Delete Dish Image
    // public void deleteDishImage(String restaurantId, String dishId) throws IOException {
    //     Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    //     if (restaurant != null) {
    //         List<Dish> dishes = restaurant.getDishes();
    //         for (Dish dish : dishes) {
    //             if (dish.getId().equals(dishId)) {
    //                 String imageUrl = dish.getImageUrl();
    //                 if (imageUrl != null) {
    //                     File file = new File(imageDirectory2 + imageUrl);
    //                     if (file.exists()) {
    //                         file.delete();
    //                     }
    //                     dish.setImageUrl(null);
    //                     restaurantRepository.save(restaurant);
    //                 }
    //             }
    //         }
    //     }
    // }

    // // Update Dish Image
    // public String updateDishImage(String restaurantId, String dishId, MultipartFile imageFile) throws IOException {
    //     deleteDishImage(restaurantId, dishId);
    //     return uploadDishImage(restaurantId, dishId, imageFile);
    // }

    // Upload Restaurant Image
public String uploadRestaurantImage(String restaurantId, String newImageUrl) {
    Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    if (restaurant != null) {
        // Set image URL to be stored in the database (based on the provided newImageUrl)
        restaurant.setImageUrl(newImageUrl);
        restaurantRepository.save(restaurant);
        return restaurant.getImageUrl();
    }
    return null;
}

// Update Restaurant Image
public String updateRestaurantImage(String restaurantId, String newImageUrl) {
    deleteRestaurantImage(restaurantId); // This will set the image URL to null
    return uploadRestaurantImage(restaurantId, newImageUrl);
}

// Delete Restaurant Image
public void deleteRestaurantImage(String restaurantId) {
    Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    if (restaurant != null) {
        String imageUrl = restaurant.getImageUrl();
        // Set imageUrl to null without deleting the image file
        restaurant.setImageUrl(null);
        restaurantRepository.save(restaurant);
    }
}


// Upload Dish Image
public String uploadDishImage(String restaurantId, String dishId, String newImageUrl) throws IOException {
    Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    if (restaurant != null) {
        List<Dish> dishes = restaurant.getDishes();
        for (Dish dish : dishes) {
            if (dish.getId().equals(dishId)) {
                // Assuming newImageUrl is the complete URL to the image
                dish.setImageUrl(newImageUrl);
                restaurantRepository.save(restaurant);
                return dish.getImageUrl();
            }
        }
    }
    return null;
}

// Update Dish Image
public String updateDishImage(String restaurantId, String dishId, String newImageUrl) throws IOException {
    deleteDishImage(restaurantId, dishId);
    return uploadDishImage(restaurantId, dishId, newImageUrl);
}

// Delete Dish Image
public void deleteDishImage(String restaurantId, String dishId) {
    Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    if (restaurant != null) {
        List<Dish> dishes = restaurant.getDishes();
        for (Dish dish : dishes) {
            if (dish.getId().equals(dishId)) {
                // Set imageUrl to null without deleting the image file
                dish.setImageUrl("null");
                restaurantRepository.save(restaurant);
                break; // Exit the loop after updating the dish
            }
        }
    }
}

// Method to update all dish image URLs
public void updateAllDishImages(String restaurantId) {
    Restaurant restaurant = restaurantRepository.findById(restaurantId).orElse(null);
    if (restaurant != null) {
        List<Dish> dishes = restaurant.getDishes();
        for (Dish dish : dishes) {
            String originalImageUrl = dish.getImageUrl();
            if (originalImageUrl != null) {
                // Extract the image name from the original URL
                String imageName = originalImageUrl.substring(originalImageUrl.lastIndexOf('/') + 1);
                // Construct the new image URL
                String newImageUrl = "dishes/" + imageName;
                // Update the dish's image URL
                dish.setImageUrl(newImageUrl);
            }
        }
        restaurantRepository.save(restaurant); // Save changes to the repository
    }
}


}
