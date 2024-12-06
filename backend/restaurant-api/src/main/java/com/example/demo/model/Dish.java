package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data

/**
 * Represents a dish in the menu.
 */
@Document
public class Dish {

    @Id
    private String id;
    private String name;
    private String description;
    private double price;             // Price of the dish
    private String imageUrl;          // URL of the dish image
    private boolean isDiscountAvailable; // Indicates if a discount is available
    private double discount;          // Discount percentage or amount
    private String category;          // Category of the dish
    private boolean isVeg;            // Indicates if the dish is vegetarian
    private boolean isAvailable;       // Indicates if the dish is available
    private int rating;

    // // Default constructor
    // public Dish() {}

    // // Constructor with parameters
    // public Dish(String id, String name, String description, double price, String imageUrl,
    //             boolean isDiscountAvailable, double discount, String category, boolean isVeg, boolean isAvailable, int rating) {
    //     this.id = id;
    //     this.name = name;
    //     this.description = description;
    //     this.price = price;
    //     this.imageUrl = imageUrl;
    //     this.isDiscountAvailable = isDiscountAvailable;
    //     this.discount = discount;
    //     this.category = category;
    //     this.isVeg = isVeg;
    //     this.isAvailable = isAvailable;  // Set availability
    //     this.rating=rating;
    // }

    // // Getters and Setters

    // public String getId() {
    //     return id;
    // }

    // public void setId(String id) {
    //     this.id = id;
    // }

    // public String getName() {
    //     return name;
    // }

    // public void setName(String name) {
    //     this.name = name;
    // }

    // public String getDescription() {
    //     return description;
    // }

    // public void setDescription(String description) {
    //     this.description = description;
    // }

    // public double getPrice() {
    //     return price;
    // }

    // public void setPrice(double price) {
    //     if (price < 0) {
    //         throw new IllegalArgumentException("Price cannot be negative");
    //     }
    //     this.price = price;
    // }

    // public String getImageUrl() {
    //     return imageUrl;
    // }

    // public void setImageUrl(String imageUrl) {
    //     this.imageUrl = imageUrl;
    // }

    // public boolean isDiscountAvailable() {
    //     return isDiscountAvailable;
    // }

    // public void setDiscountAvailable(boolean isDiscountAvailable) {
    //     this.isDiscountAvailable = isDiscountAvailable;
    // }

    // public double getDiscount() {
    //     return discount;
    // }

    // public void setDiscount(double discount) {
    //     if (discount < 0) {
    //         throw new IllegalArgumentException("Discount cannot be negative");
    //     }
    //     this.discount = discount;
    // }

    // public String getCategory() {
    //     return category;
    // }

    // public void setCategory(String category) {
    //     this.category = category;
    // }

    // public boolean isVeg() {
    //     return isVeg;
    // }

    // public void setVeg(boolean isVeg) {
    //     this.isVeg = isVeg;
    // }

    // public boolean isAvailable() {
    //     return isAvailable;
    // }

    // public void setAvailable(boolean isAvailable) {
    //     this.isAvailable = isAvailable;
    // }

    // public int getRating() {
    //     return rating;
    // }

    // public void setRating(int rating) {
    //     this.rating = rating;
    // }

    // // Override toString method for better readability
    // @Override
    // public String toString() {
    //     return String.format("Dish{id='%s', name='%s', description='%s', price=%.2f, " +
    //                         "imageUrl='%s', isDiscountAvailable=%b, discount=%.2f, category='%s', " +
    //                         "isVeg=%b, isAvailable=%b, rating=%.1f}",
    //                         id, name, description, price, imageUrl, isDiscountAvailable, discount, category, isVeg, isAvailable, rating);
    // }

}

