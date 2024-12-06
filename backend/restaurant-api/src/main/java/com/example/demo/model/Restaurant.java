package com.example.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "restaurants")
public class Restaurant {

    @Id
    private String id;               // Unique identifier for the restaurant
    private String name;             // Name of the restaurant
    private String ownerName;        // Name of the restaurant owner
    private String address;          // Address of the restaurant
    private String phoneNumber;      // Contact number of the restaurant
    private String email;            // Email of the restaurant or owner
    private String imageUrl;         // URL for the restaurant's image
    private int rating;
    
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)  // Geospatial indexing for querying by location
    private Location location;   // Location as [longitude, latitude]       
    
    private List<Dish> dishes;       // List of dishes offered by the restaurant


}

