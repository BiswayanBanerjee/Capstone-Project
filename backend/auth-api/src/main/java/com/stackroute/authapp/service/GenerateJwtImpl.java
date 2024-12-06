package com.stackroute.authapp.service;

import com.stackroute.authapp.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class GenerateJwtImpl implements GenerateJwt {

    // Define the secret key and expiration time for the JWT
    private final String SECRET_KEY = "foodieSecretKey"; // Use environment variables or config files in production
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 5; // 1 hour in milliseconds

    @Override
    public Map<String, String> generateToken(User user) {
        Map<String, String> result = new HashMap<>();

        // Creating the JWT token with expiration and roles
        String jwt = Jwts.builder()
                .setSubject(user.getEmail()) // Set the subject as the user's email
                .claim("role", user.getRole()) // Add the user's role (customer, restaurant owner, admin)
                .setIssuer("foodie-app")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Token expiration time
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();

        // Adding the JWT and user details to the result map
        result.put("email", user.getEmail()); // Include email in the result
        result.put("role", user.getRole()); // Include user role in the result
        result.put("token", jwt);
        result.put("message", "Login successful");

        return result;
    }
}
