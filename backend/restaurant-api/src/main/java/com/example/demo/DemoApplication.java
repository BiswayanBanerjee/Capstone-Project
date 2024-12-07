package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Bean
    public FilterRegistrationBean<CorsFilter> filterRegistrationBean() {
        final CorsConfiguration config = new CorsConfiguration();

        // Allow credentials to be sent in CORS requests
        config.setAllowCredentials(true);

        // Get allowed origins from environment variable or set default value
        String allowedOrigins = System.getenv("ALLOWED_ORIGINS");
        if (allowedOrigins != null) {
            // Split the comma-separated list of allowed origins and add them
            for (String origin : allowedOrigins.split(",")) {
                config.addAllowedOrigin(origin.trim());
            }
        } else {
            // Default to allowing localhost in development
            config.addAllowedOrigin("http://localhost:3000");
        }

        // Allow all headers and methods
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        // Set the CORS configuration to apply to all URLs
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        // Register the CORS filter with high precedence
        FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }
}

