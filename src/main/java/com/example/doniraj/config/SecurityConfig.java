package com.example.doniraj.config;

import com.example.doniraj.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.XXssProtectionHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
    private final CustomUsernamePasswordAuthenticationProvider authenticationProvider;

    //private final JwtAuthenticationFilter jwtAuthenticationFilter;

    private final JwtTokenUtil jwtTokenUtil;

    private final UserService userService;


    public SecurityConfig(CustomUsernamePasswordAuthenticationProvider authenticationProvider, JwtTokenUtil jwtTokenUtil, UserService userService) {
        this.authenticationProvider = authenticationProvider;
        this.jwtTokenUtil = jwtTokenUtil;
        //this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userService = userService;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            var user = userService.loadUserByUsername(username);
            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }
            return org.springframework.security.core.userdetails.User
                    .withUsername(user.getUsername())
                    .password(user.getPassword())
                    //.roles(String.valueOf(user.getAuthorities()))
                    .authorities(user.getAuthorities())
                    .build();
        };
    }

//    @Bean
//    GrantedAuthorityDefaults grantedAuthorityDefaults() {
//        return new GrantedAuthorityDefaults(""); // Remove the ROLE_ prefix
//    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception  {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF for simplicity (enable it in production with proper configuration)
                .authorizeHttpRequests(auth -> {
                    System.out.println("Security check: Checking roles...");
                    auth

                            .requestMatchers("/", "/api/auth/**", "/api/item/all/available").permitAll() // Public access endpoints
                            .requestMatchers("/api/user/**").hasAuthority("ROLE_ADMIN") // Only ADMIN can access /user/** endpoints
                            .anyRequest().authenticated(); // All other requests require authentication
                })
                .logout((logout) -> logout
                        .logoutUrl("/api/auth/logout")
                        .clearAuthentication(true)
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .logoutSuccessHandler((request, response, authentication) -> {
                            response.setStatus(HttpServletResponse.SC_OK); // Set status 200 for a successful logout
                            response.getWriter().write("{\"message\":\"Hello from backend, Logged out successfully\"}"); // Send success message
                        })
                        .logoutSuccessUrl("/items")
                )
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED) // Only create a session when required
                )
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
        ;

        //TODO LOOK INTO STORED XSS ATTACK
        http.headers(headers ->
                headers.xssProtection( // xxsProtection configures the X-XSS-Protection HTTP response header to prevent reflected XSS attacks
                        // If malicious content is detected, the browser blocks the page instead of rendering it
                        xss -> xss.headerValue(XXssProtectionHeaderWriter.HeaderValue.ENABLED_MODE_BLOCK) // Enables the browser's built-in XSS filter
                ).contentSecurityPolicy( // Adds the Content-Security-Policy (CSP) header to control allowed resources (like scripts)
                        cps -> cps.policyDirectives("script-src 'self'") // Allow JavaScript only from the same domain as the application
                        // Blocks inline scripts or scripts from untrusted sources
                )
        );

        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtTokenUtil);
    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
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