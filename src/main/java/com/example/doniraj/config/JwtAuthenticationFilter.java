package com.example.doniraj.config;

import com.example.doniraj.config.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

/*
        This class is a filter that intercepts each HTTP request and extracts,
        validates, and sets the authentication context using JWT.
 */

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter { // Ensures this filter runs once per request.

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;

    public JwtAuthenticationFilter(JwtTokenUtil jwtTokenUtil) {
        this.jwtTokenUtil = jwtTokenUtil;
    }

    // The core method that processes incoming requests:
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        //  Extracts the JWT from the Authorization header if it starts with "Bearer "
        String jwt = getJwtFromRequest(request);

        String authHeader = request.getHeader("Authorization");
        System.out.println("Authorization Header: " + authHeader);

        //System.out.println("JWT: " + jwt);

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No JWT token found in request.");
            chain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        System.out.println("Extracted Token: " + token); // Debugging


        // Validates the token
        if (jwt != null && jwtTokenUtil.validateToken(jwt, jwtTokenUtil.getUsernameFromToken(jwt))) {
            String username = jwtTokenUtil.getUsernameFromToken(jwt);
            var userDetails = userDetailsService.loadUserByUsername(username);

            // Creates an authentication token with user details and sets it in the SecurityContextHolder
            //var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            // Extract role from JWT claims
            String role = jwtTokenUtil.getRoleFromToken(jwt);

            // Ensure Spring Security gets "ROLE_ADMIN" format
            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role));
            //String role = claims.get("role", String.class); // Get role from JWT
//            List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(role)); // Do NOT prefix "ROLE_"

            var authentication = new UsernamePasswordAuthenticationToken(userDetails, null, authorities);


            System.out.println("Assigned Authorities: " + userDetails.getAuthorities()); // Debugging

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        // allow the request to proceed
        chain.doFilter(request, response);
    }


    /*
            Extracts the JWT from the "Authorization" header.
            It removes the "Bearer " prefix to get only the token string.
     */
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}