package com.example.doniraj.models;

import com.example.doniraj.models.enums.ClaimStatus;
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

    @Enumerated
    private ClaimStatus status;

    @ManyToOne
    @JoinColumn(name = "recipient")
    private User recipient;

    @OneToOne
    @JoinColumn(name = "item_id")
    private Item item;


    public Claim(User recipient, Item item) {
        this.claimDate = LocalDate.now();
        this.recipient = recipient;
        this.status = ClaimStatus.CREATED;
        this.item = item;
    }

}
