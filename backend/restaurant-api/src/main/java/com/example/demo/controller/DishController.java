// package com.example.demo.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.web.multipart.MultipartFile;

// import com.example.demo.model.Dish;
// import com.example.demo.service.DishService;

// import java.io.IOException;
// import java.util.List;

// @RestController
// @RequestMapping("/api/dishes")
// public class DishController {

//     @Autowired
//     private DishService dishService;

    
//     @GetMapping("/restaurant/{restaurantId}")
//     public List<Dish> getDishesByRestaurant(@PathVariable String restaurantId) {
//         return dishService.getAllDishes(restaurantId);
//     }

//     @GetMapping("/{id}")
//     public Dish getDishById(@PathVariable String id) {
//         return dishService.getDishById(id);
//     }

//     @PostMapping
//     public Dish createDish(@RequestBody Dish dish) {
//         return dishService.addDish(dish);
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<Dish> updateDish(@PathVariable String id, @RequestBody Dish dish) {
//         Dish updatedDish = dishService.updateDish(id, dish);
//         return ResponseEntity.ok(updatedDish);
//     }

//     @DeleteMapping("/{id}")
//     public void deleteDish(@PathVariable String id) {
//         dishService.deleteDish(id);
//     }

//     // Upload dish image
//     @PostMapping("/{dishId}/image")
//     public ResponseEntity<String> uploadDishImage(@PathVariable String dishId, @RequestParam("image") MultipartFile imageFile) {
//         try {
//             String imageUrl = dishService.uploadDishImage(dishId, imageFile);
//             return new ResponseEntity<>("Image uploaded successfully: " + imageUrl, HttpStatus.OK);
//         } catch (IOException e) {
//             return new ResponseEntity<>("Failed to upload image", HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }

//     // Delete dish image
//     @DeleteMapping("/{dishId}/image")
//     public ResponseEntity<String> deleteDishImage(@PathVariable String dishId) {
//         try {
//             dishService.deleteDishImage(dishId);
//             return new ResponseEntity<>("Image deleted successfully", HttpStatus.OK);
//         } catch (IOException e) {
//             return new ResponseEntity<>("Failed to delete image", HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// }
