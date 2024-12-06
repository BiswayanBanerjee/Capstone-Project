// package com.example.demo.service;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import org.springframework.web.multipart.MultipartFile;

// import com.example.demo.repository.DishRepository;
// import com.example.demo.model.Dish;

// import java.io.File;
// import java.io.IOException;
// import java.nio.file.Files;
// import java.nio.file.Path;
// import java.nio.file.Paths;
// import java.util.List;

// @Service
// public class DishService {

//     @Autowired
//     private DishRepository dishRepository;

//     // Directory to store images (e.g., in server)
//     private final String imageDirectory = "src/main/resources/static/images/";

//     public List<Dish> getAllDishes(String restaurantId) {
//         return dishRepository.findByRestaurantId(restaurantId);
//     }

//     public Dish getDishById(String id) {
//         return dishRepository.findById(id).orElse(null);
//     }

//     public Dish addDish(Dish dish) {
//         return dishRepository.save(dish);
//     }

//     public Dish updateDish(String id, Dish dishDetails) {
//         Dish dish = dishRepository.findById(id).orElse(null);
//         if (dish != null) {
//             dish.setName(dishDetails.getName());
//             dish.setDescription(dishDetails.getDescription());
//             dish.setPrice(dishDetails.getPrice());
//             dish.setDiscount(dishDetails.getDiscount());
//             dish.setDiscountAvailable(dishDetails.isDiscountAvailable());
//             return dishRepository.save(dish);
//         }
//         return null;
//     }

//     // New deleteDish method
//     public void deleteDish(String id) {
//         dishRepository.deleteById(id);
//     }

//     // Upload Dish Image
//     public String uploadDishImage(String dishId, MultipartFile imageFile) throws IOException {
//         Dish dish = dishRepository.findById(dishId).orElse(null);
//         if (dish != null) {
//             // Save image file
//             String fileName = imageFile.getOriginalFilename();
//             Path imagePath = Paths.get(imageDirectory + fileName);
//             Files.write(imagePath, imageFile.getBytes());

//             // Update image URL in the database (path can be relative or absolute)
//             dish.setImageUrl("/images/" + fileName);
//             dishRepository.save(dish);

//             return dish.getImageUrl();
//         }
//         return null;
//     }

//     // Delete Dish Image
//     public void deleteDishImage(String dishId) throws IOException {
//         Dish dish = dishRepository.findById(dishId).orElse(null);
//         if (dish != null) {
//             String imageUrl = dish.getImageUrl();
//             if (imageUrl != null) {
//                 // Delete the image file
//                 File file = new File(imageDirectory + imageUrl);
//                 if (file.exists()) {
//                     file.delete();
//                 }
//                 // Remove the image URL from the database
//                 dish.setImageUrl(null);
//                 dishRepository.save(dish);
//             }
//         }
//     }
// }