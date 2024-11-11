package com.example.doniraj.repository;

import com.example.doniraj.models.Claim;
import com.example.doniraj.models.User;
import com.example.doniraj.models.enums.ClaimStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    List<Claim> findByRecipient(User recipient);

}
