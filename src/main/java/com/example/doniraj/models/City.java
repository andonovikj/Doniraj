package com.example.doniraj.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long city_id;

    private String name;

    private Integer zipcode;

    //@OneToMany(fetch = FetchType.LAZY, mappedBy = "city")
    //@JsonIgnore
    //private List<User> user;

    //@OneToMany(mappedBy = "city")
    //private List<Item> items;

    public City(Long city_id, String name, Integer zipcode) {
        this.city_id = city_id;
        this.name = name;
        this.zipcode = zipcode;
    }

    public City(String name, Integer zipcode) {
        this.name = name;
        this.zipcode = zipcode;
    }

}
