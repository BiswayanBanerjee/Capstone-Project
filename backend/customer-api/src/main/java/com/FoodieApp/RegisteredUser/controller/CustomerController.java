package com.FoodieApp.RegisteredUser.controller;

import com.FoodieApp.RegisteredUser.model.Customer;
import com.FoodieApp.RegisteredUser.model.CustomerOrders;
import com.FoodieApp.RegisteredUser.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable String id) {
        Optional<Customer> customer = customerService.getCustomerById(id);
        return customer.map(ResponseEntity::ok)
                       .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // @PostMapping
    // public Customer addCustomer(@RequestPart("customer") Customer customer, @RequestParam(value = "imageUrl", required = false) String imageUrl) {
    //     return customerService.addCustomer(customer, imageUrl);
    // }

    @PostMapping
    public Customer addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer); // Set imageUrl to null if not used
    }

    // @PutMapping("/{id}")
    // public ResponseEntity<Customer> updateCustomer(@PathVariable String id, @RequestPart("customer") Customer customerDetails, 
    //                                                @RequestParam(value = "imageUrl", required = false) String imageUrl) {
    //     Customer updatedCustomer = customerService.updateCustomer(id, customerDetails, imageUrl);
    //     return ResponseEntity.ok(updatedCustomer);
    // }

    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable String id, @RequestBody Customer customerDetails) {
        Customer updatedCustomer = customerService.updateCustomer(id, customerDetails);
        return ResponseEntity.ok(updatedCustomer);
}


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

//     @PatchMapping("/{id}/orders")
//     public ResponseEntity<Customer> updateCustomerOrders(@PathVariable String id, @RequestBody List<CustomerOrders> customerOrders) {    
//         Optional<Customer> customerOptional = customerService.getCustomerById(id);
//         if (customerOptional.isPresent()) {
//             Customer customer = customerOptional.get();
//             customer.setCustomerOrders(customerOrders);
//             customerService.saveCustomer(customer);
//             return ResponseEntity.ok(customer);
//     }
//     return ResponseEntity.notFound().build();
// }

// @PatchMapping("/{id}/orders")
// public ResponseEntity<Customer> updateCustomerOrders(@PathVariable String id, @RequestBody List<CustomerOrders> customerOrders) {
//     Optional<Customer> customerOptional = customerService.getCustomerById(id);
//     if (customerOptional.isPresent()) {
//         Customer customer = customerOptional.get();
//         customer.setCustomerOrders(customerOrders);
//         customerService.saveCustomer(customer);
//         return ResponseEntity.ok(customer);
//     }
//     return ResponseEntity.notFound().build();
// }

@PatchMapping("/{id}/orders")
public ResponseEntity<Customer> updateCustomerOrders(@PathVariable String id, @RequestBody CustomerOrders newOrder) {
    Optional<Customer> customerOptional = customerService.getCustomerById(id);
    if (customerOptional.isPresent()) {
        Customer customer = customerOptional.get();

        // Retrieve the existing orders
        List<CustomerOrders> existingOrders = customer.getCustomerOrders();

        // Check if the existingOrders list is null; if it is, initialize it
        if (existingOrders == null) {
            existingOrders = new ArrayList<>();
        }

        // Add the new order to the existing orders
        existingOrders.add(newOrder);

        // Set the updated list back to the customer
        customer.setCustomerOrders(existingOrders);

        // Save the customer with the updated orders
        customerService.saveCustomer(customer);
        
        return ResponseEntity.ok(customer);
    }
    return ResponseEntity.notFound().build();
}





    @PatchMapping("/{id}/favourites")
    public ResponseEntity<Customer> updateFavourites(@PathVariable String id, 
                                                 @RequestBody List<String> favourites) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
            if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            customer.setFavourites(favourites);
            customerService.saveCustomer(customer);
            return ResponseEntity.ok(customer);
    }
    return ResponseEntity.notFound().build();
}

//     @PatchMapping("/{id}/cart")
//     public ResponseEntity<Customer> updateCustomerCart(@PathVariable String id, 
//                                                    @RequestBody List<String> customerCart) {
//         Optional<Customer> customerOptional = customerService.getCustomerById(id);
//         if (customerOptional.isPresent()) {
//             Customer customer = customerOptional.get();
//             customer.setCustomerCart(customerCart);
//             customerService.saveCustomer(customer);
//             return ResponseEntity.ok(customer);
//     }
//     return ResponseEntity.notFound().build();
// }

@PatchMapping("/{id}/cart")
public ResponseEntity<Customer> updateCustomerCart(@PathVariable String id, 
                                                   @RequestBody List<String> customerCart) {
    Optional<Customer> customerOptional = customerService.getCustomerById(id);
    if (customerOptional.isPresent()) {
        Customer customer = customerOptional.get();

        // Instead of adding to the existing cart, replace it with the incoming customerCart
        customer.setCustomerCart(customerCart);

        // Save the updated customer
        customerService.saveCustomer(customer);
        return ResponseEntity.ok(customer);
    }
    return ResponseEntity.notFound().build();
}



    @PatchMapping("/{id}/rating")
    public ResponseEntity<Customer> updateCustomerRating(@PathVariable String id, 
                                                     @RequestBody Map<String, Integer> customerRating) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
        if (customerOptional.isPresent()) {
            Customer customer = customerOptional.get();
            customer.setCustomerRating(customerRating);
            customerService.saveCustomer(customer);
            return ResponseEntity.ok(customer);
    }
    return ResponseEntity.notFound().build();
}
    @GetMapping("/{id}/cart")
    public ResponseEntity<List<String>> getCustomerCart(@PathVariable String id) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
        if (customerOptional.isPresent()) {
            return ResponseEntity.ok(customerOptional.get().getCustomerCart());
    }
    return ResponseEntity.notFound().build();
}
    @GetMapping("/{id}/favourites")
    public ResponseEntity<List<String>> getFavourites(@PathVariable String id) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
        if (customerOptional.isPresent()) {
            return ResponseEntity.ok(customerOptional.get().getFavourites());
    }
    return ResponseEntity.notFound().build();
}
    @GetMapping("/{id}/orders")
    public ResponseEntity<List<CustomerOrders>> getCustomerOrders(@PathVariable String id) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
        if (customerOptional.isPresent()) {
            return ResponseEntity.ok(customerOptional.get().getCustomerOrders());
    }
    return ResponseEntity.notFound().build();
}
    @GetMapping("/{id}/rating")
    public ResponseEntity<Map<String, Integer>> getCustomerRating(@PathVariable String id) {
        Optional<Customer> customerOptional = customerService.getCustomerById(id);
        if (customerOptional.isPresent()) {
            return ResponseEntity.ok(customerOptional.get().getCustomerRating());
    }
    return ResponseEntity.notFound().build();
}





}
