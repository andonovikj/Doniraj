package models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Entity
@Data
public class Claim {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long claim_id;

    private LocalDate claimDate;

    @ManyToOne
    @JoinColumn(name = "recipient", nullable = false)
    private User recipient;

    @OneToOne
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    public Claim(Long claim_id, LocalDate claimDate, User recipient, Item item) {
        this.claim_id = claim_id;
        this.claimDate = claimDate;
        this.recipient = recipient;
        this.item = item;
    }

    public Claim(){}

    public Long getClaim_id() {
        return claim_id;
    }

    public void setClaim_id(Long claim_id) {
        this.claim_id = claim_id;
    }

    public LocalDate getClaimDate() {
        return claimDate;
    }

    public void setClaimDate(LocalDate claimDate) {
        this.claimDate = claimDate;
    }

    public User getRecipient() {
        return recipient;
    }

    public void setRecipient(User recipient) {
        this.recipient = recipient;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }
}
