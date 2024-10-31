package models;

import jakarta.persistence.*;
import lombok.Data;
import models.enums.Role;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
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

    @OneToMany(mappedBy = "donor", cascade = CascadeType.ALL)
    private List<Item> donatedItems;

    @OneToMany(mappedBy = "recipient", cascade = CascadeType.ALL)
    private List<Claim> claims;

    public User(Long user_id, String name, String email, String password, Integer phone_number, City city) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone_number = phone_number;
        this.city = city;
    }

    public User(Long user_id, String name, String email, String password, Integer phone_number, Role role, City city, List<Item> donatedItems, List<Claim> claims) {
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

    public User() {

    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getPhone_number() {
        return phone_number;
    }

    public void setPhone_number(Integer phone_number) {
        this.phone_number = phone_number;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public List<Item> getDonatedItems() {
        return donatedItems;
    }

    public void setDonatedItems(List<Item> donatedItems) {
        this.donatedItems = donatedItems;
    }

    public List<Claim> getClaims() {
        return claims;
    }

    public void setClaims(List<Claim> claims) {
        this.claims = claims;
    }
}
