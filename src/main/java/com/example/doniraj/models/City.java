package com.example.doniraj.models;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long city_id;

    private String name;

    private Integer zipcode;

    @OneToMany(mappedBy = "city")
    private List<User> user;

    @OneToMany(mappedBy = "city")
    private List<Item> items;

    public City(Long city_id, String name, Integer zipcode) {
        this.city_id = city_id;
        this.name = name;
        this.zipcode = zipcode;
    }

    public City(Long city_id, String name, Integer zipcode, List<User> user, List<Item> items) {
        this.city_id = city_id;
        this.name = name;
        this.zipcode = zipcode;
        this.user = user;
        this.items = items;
    }

    public City() {

    }

    public Long getCity_id() {
        return city_id;
    }

    public void setCity_id(Long city_id) {
        this.city_id = city_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getZipcode() {
        return zipcode;
    }

    public void setZipcode(Integer zipcode) {
        this.zipcode = zipcode;
    }

    public List<User> getUser() {
        return user;
    }

    public void setUser(List<User> user) {
        this.user = user;
    }

    public List<Item> getItems() {
        return items;
    }

    public void setItems(List<Item> items) {
        this.items = items;
    }
}
