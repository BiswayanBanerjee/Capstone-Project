package com.FoodieApp.RegisteredUser.repository;

import com.FoodieApp.RegisteredUser.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends MongoRepository<Customer, String> {

    // Custom query methods can be added here if needed
    // Example: Find by email
    Customer findByEmail(String email);
}
