package com.example.doniraj.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User implements UserDetails{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    private String name;

    private String email;

    private String password;

    private Integer phone_number;

    //@Enumerated(value = EnumType.STRING)
    //private Role role;

    private String role;

    @ManyToOne
    @JoinColumn(name = "city_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private City city;

    //@OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    //private List<Item> donatedItems;

    //@OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    //private List<Claim> claims;

    public User(String name, String email, String password, Integer phone_number, String role, City city) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.role = role;
        this.city = city;
    }

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean isAccountNonExpired;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean isAccountNonLocked;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean isCredentialsNonExpired;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private boolean isEnabled;

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        System.out.println("User role from DB: " + role);
//        System.out.println("Assigned authority: " + new SimpleGrantedAuthority(role));
//        return Collections.singletonList(new SimpleGrantedAuthority(role));
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String authority = "ROLE_" + role;  // Double-check if this is causing the problem!
        System.out.println("User role from DB: " + role);
        System.out.println("Manually created authority: " + authority);
        System.out.println("Assigned authority object: " + new SimpleGrantedAuthority(authority));

        return Collections.singletonList(new SimpleGrantedAuthority(authority));
    }



    @Override
    public String getUsername() {
        return name;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
