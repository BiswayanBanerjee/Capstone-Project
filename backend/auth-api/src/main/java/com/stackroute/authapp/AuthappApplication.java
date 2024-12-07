package com.stackroute.authapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.Optional;

@SpringBootApplication
public class AuthappApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthappApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> filterRegistrationBean() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);

        // Load allowed origins from environment variable
        String allowedOrigins = System.getenv("ALLOWED_ORIGINS");
        Optional.ofNullable(allowedOrigins)
                .map(origins -> origins.split(","))
                .ifPresentOrElse(
                        origins -> Arrays.stream(origins)
                                         .map(String::trim) // Trim whitespaces
                                         .forEach(config::addAllowedOrigin),
                        () -> config.addAllowedOrigin("http://localhost:3000") // Default for local dev
                );

        // Configure headers, methods, and cache duration
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        config.setMaxAge(3600L); // Cache preflight response for 1 hour

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}

