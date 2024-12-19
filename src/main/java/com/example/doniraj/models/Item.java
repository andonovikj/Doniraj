package com.example.doniraj.models;

import com.example.doniraj.models.enums.ItemStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    private ItemStatus status;

    @ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "donor_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User donor;

    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    private City city;

    //@OneToOne(mappedBy = "item")
    //private Claim claim;

    public Item(String name, String description, LocalDate date_created, ItemStatus status, User donor, City city) {
        this.name = name;
        this.description = description;
        this.date_created = LocalDate.now();
        this.status = status;
        this.donor = donor;
        this.city = city;
    }
}
