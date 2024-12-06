package com.example.demo.repository;

import java.util.List;

import org.springframework.data.geo.Distance;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;

//import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Restaurant;

@Repository
public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    // Custom query methods can be added here
    // List<Restaurant> findByOwnerEmail(String ownerEmail);
    // Find restaurants near a certain location (longitude, latitude) within a distance
    List<Restaurant> findByLocationNear(GeoJsonPoint location, Distance distance);
}

