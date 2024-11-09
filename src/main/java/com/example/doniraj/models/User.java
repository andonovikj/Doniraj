package com.example.doniraj.models;

import com.example.doniraj.models.enums.Role;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_id;

    private String name;

    private String email;

    private String password;

    //add-to-favorites

    private Integer phone_number;

    @Enumerated(value = EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    //@OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    //private List<Item> donatedItems;

    //@OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    //private List<Claim> claims;

    public User(Long user_id, String name, String email, String password, Integer phone_number, City city) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.city = city;
    }

    /*public User(Long user_id, String name, String email, String password, Integer phone_number, Role role, City city, List<Item> donatedItems, List<Claim> claims) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.role = role;
        this.city = city;
        this.donatedItems = donatedItems;
        this.claims = claims;
    }
*/
}
