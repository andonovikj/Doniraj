package com.example.doniraj.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final CustomUsernamePasswordAuthenticationProvider authenticationProvider;

    public SecurityConfig(CustomUsernamePasswordAuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception  {

        http
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for simplicity (enable it in production with proper configuration)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/user/**").hasRole("ADMIN") // Only ADMIN can access /user/** endpoints
                        .requestMatchers("/", "/login", "/register", "/items/**").permitAll() // Public access endpoints
                        .anyRequest().authenticated() // All other requests require authentication
                )
                .formLogin((form) -> form
                        .permitAll()
                        .failureUrl("/login?error=BadCredentials")
                        .defaultSuccessUrl("/", true)
                )
                .logout((logout) -> logout
                        .logoutUrl("/logout")
                        .clearAuthentication(true)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessUrl("/")
                );

        return http.build();
    }

    // AuthenticationManager Bean, a core component in Spring Security that handles authentication requests

    @Bean
    public AuthenticationManager authManager(HttpSecurity http) throws Exception {
        // retrieves a shared AuthenticationManagerBuilder instance that Spring manages

        AuthenticationManagerBuilder authenticationManagerBuilder = // customize the authentication setup
                http.getSharedObject(AuthenticationManagerBuilder.class);

        // It configures how Spring should validate user credentials during authentication
        // Specifies the CustomUsernamePasswordAuthenticationProvider to fetch user details

        authenticationManagerBuilder.authenticationProvider(authenticationProvider);

        // The build() method creates an AuthenticationManager instance, which is returned as a bean.
        // This instance becomes globally available in your Spring application and is used during login requests to authenticate users.

        return authenticationManagerBuilder.build();
    }

}
