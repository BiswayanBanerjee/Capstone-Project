package com.FoodieApp.RegisteredUser.model;

import java.util.List;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document
public class CustomerAddress {

    private List<String> receiverDetails;
    private List<String> saveAddressAs;
    private String house_number;
    private String street;
    private String landMark;
    private long postcode;
    private String city;
    private String state;
    private String country;

    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)  // Geospatial indexing for querying by location
    private List<Double> location;
}