package com.stackroute.authapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class User {

    @Id
    private String email; // Use email as the primary key
    private String firstName;
    private String lastName;
    private String password;
    private String role; // Role can be 'CUSTOMER', 'OWNER', or 'ADMIN'
    private boolean isApproved; // Indicates if the restaurant owner is approved by admin

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }

}
