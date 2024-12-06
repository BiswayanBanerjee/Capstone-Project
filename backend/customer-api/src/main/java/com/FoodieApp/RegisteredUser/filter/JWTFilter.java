package com.FoodieApp.RegisteredUser.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

public class JWTFilter extends GenericFilterBean
{
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException
    {
        HttpServletRequest request = (HttpServletRequest) servletRequest;

        String authHeader = request.getHeader("authorization");

        if( authHeader==null || !authHeader.startsWith("Bearer"))
        {
            throw new ServletException();
        }

        else
        {
            String token = authHeader.substring(7);

            Claims claims = Jwts.parser().setSigningKey("foodieSecretKey").parseClaimsJws(token).getBody();

            String emailId = (String)claims.get("CurrentUserEmailId");
            String name = (String)claims.get("CurrentUserName");
            String role = (String)claims.get("CurrentUserRole");
            System.out.println("----JwtFilter------");
            System.out.println(emailId);
            System.out.println(name);
            System.out.println(role);
            request.setAttribute("EmailId", emailId);
            request.setAttribute("Name", name);
            request.setAttribute("Role", role);
            filterChain.doFilter(request,servletResponse);
        }
    }
}
