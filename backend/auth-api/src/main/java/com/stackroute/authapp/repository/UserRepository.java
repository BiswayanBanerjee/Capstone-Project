package com.stackroute.authapp.repository;


import com.stackroute.authapp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    // Find a user by email and password for authentication
    public abstract User findByEmailAndPassword(String email, String password);

    // Optionally, you can add a method to find by email only
    public abstract User findByEmail(String email);
}
