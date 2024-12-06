package com.stackroute.authapp.service;


import com.stackroute.authapp.model.User;

import java.util.Map;

public interface GenerateJwt {
    public abstract Map<String, String> generateToken(User user);
}
