package com.example.doniraj.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import com.example.doniraj.models.enums.Status;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
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

    @ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    private User donor;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    //@OneToOne(mappedBy = "item")
    //private Claim claim;

    public Item(Long item_id, String name, String description, LocalDate date_created, Status status, User donor, City city) {
        this.item_id = item_id;
        this.name = name;
        this.description = description;
        this.date_created = date_created;
        this.status = status;
        this.donor = donor;
        this.city = city;
    }

    public Item(String name, String description, LocalDate date_created, Status status, User donor, City city) {
        this.name = name;
        this.description = description;
        this.date_created = date_created;
        this.status = status;
        this.donor = donor;
        this.city = city;
    }
}
