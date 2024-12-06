package com.FoodieApp.RegisteredUser.model;

import java.util.List;
import java.util.Map;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "customers")
public class Customer {

    @Id
    private String email;
    private String firstName;
    private String lastName;
    private String gender;
    private String profileImageUrl;
    private String password;
    private List<CustomerAddress> customerAddress;
    private String phone;
    
    private List<CustomerOrders> customerOrders; // order history
    private List<String> favourites; // will save favourite dishes
    private List<String> customerCart;
    private Map<String, Integer> customerRating;
    
}

