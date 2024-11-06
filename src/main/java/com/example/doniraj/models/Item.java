package com.example.doniraj.models;

import jakarta.persistence.*;
import com.example.doniraj.models.enums.Status;

import java.time.LocalDate;

@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long item_id;

    private String name;

    private String description;

    private LocalDate date_created;

    //private String imageUrl;

    @Enumerated(value = EnumType.STRING)
    private Status status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    @ManyToOne
    @JoinColumn(name = "city_id")
    private City city;

    @OneToOne(mappedBy = "item", cascade = CascadeType.ALL)
    private Claim claim;

    public Item(Long item_id, String name, String description, LocalDate date_created, User donor, City city) {
        this.item_id = item_id;
        this.name = name;
        this.description = description;
        this.date_created = date_created;
        this.donor = donor;
        this.city = city;

    }

    public Item(Long item_id, String name, String description, LocalDate date_created, Status status, User donor, City city, Claim claim) {
        this.item_id = item_id;
        this.name = name;
        this.description = description;
        this.date_created = date_created;
        this.status = status;
        this.donor = donor;
        this.city = city;
        this.claim = claim;
    }

    public Item() {

    }

    public Long getItem_id() {
        return item_id;
    }

    public void setItem_id(Long item_id) {
        this.item_id = item_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate_created() {
        return date_created;
    }

    public void setDate_created(LocalDate date_created) {
        this.date_created = date_created;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public User getDonor() {
        return donor;
    }

    public void setDonor(User donor) {
        this.donor = donor;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public Claim getClaim() {
        return claim;
    }

    public void setClaim(Claim claim) {
        this.claim = claim;
    }
}
