package com.stackroute.authapp;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class AuthappApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthappApplication.class, args);
	}
		@Bean
		public FilterRegistrationBean<CorsFilter> filterRegistrationBean() {
    			final CorsConfiguration config = new CorsConfiguration();
    			config.setAllowCredentials(false);
    			config.addAllowedOrigin("*");  // Allows all origins, which includes your Railway frontend
    			config.addAllowedHeader("*");
    			config.addAllowedMethod("*");

    			final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    			source.registerCorsConfiguration("/**", config);

    			FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
    			bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    			return bean;
		}
}
