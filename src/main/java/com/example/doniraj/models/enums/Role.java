package com.example.doniraj.models.enums;


import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
    ROLE_ADMIN,
    ROLE_DONOR,
    ROLE_RECIPIENT;

    @Override
    public String getAuthority() {
        return name();
    }
}
