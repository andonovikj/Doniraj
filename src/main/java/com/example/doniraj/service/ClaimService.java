package com.example.doniraj.service;

import com.example.doniraj.models.Claim;
import com.example.doniraj.models.DTO.ClaimDto;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;
import com.example.doniraj.models.enums.ClaimStatus;

import java.util.List;

public interface ClaimService {

    Claim getById(Long id);

    //List<Claim> getClaimsByDonor(Long donor_id);

    List<Claim> getClaims();

    List<Claim> getClaimsByRecipient(Long recipient_id);

    Claim claimItem(ClaimDto claimDto);

    Claim updateClaim(Long claim_id, ClaimDto claimDto);

    Claim deleteClaim(Long recipient_id);
}
