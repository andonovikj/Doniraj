package com.example.doniraj.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long claim_id;

    private LocalDate claimDate;

    @ManyToOne
    @JoinColumn(name = "recipient")
    private User recipient;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;

    public Claim(Long claim_id, LocalDate claimDate, User recipient, Item item) {
        this.claim_id = claim_id;
        this.claimDate = claimDate;
        this.recipient = recipient;
        this.item = item;
    }


}
