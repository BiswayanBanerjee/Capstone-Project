package com.stackroute.authapp.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Message {
    private String type;    // The type of the message, e.g., "success", "error", etc.
    private String message; // The actual message content.
}
