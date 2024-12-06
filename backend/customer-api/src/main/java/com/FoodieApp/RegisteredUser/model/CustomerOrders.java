package com.FoodieApp.RegisteredUser.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class CustomerOrders {

    @Id
    private String orderId;
    private String customerEmail; // Reference to Customer
    private List<String> dishIds; // List of dish IDs
    private double totalAmount;
    private String deliveryAddress;
    private String status; // e.g., "Delivered" (e.g., orderAccepted, beingPrepared, outForDelivery, Delivered)
    private LocalDateTime orderDate; // Updated to LocalDateTime for both date and time
    private String deliveryInstruction;
    private Map<String, Integer> customerOrders;

    // Custom getter for formatted date
    public String getFormattedOrderDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        return orderDate.format(formatter);
    }

    // Lombok's @Data will generate the default toString, but you can print getFormattedOrderDate() separately if needed
}
