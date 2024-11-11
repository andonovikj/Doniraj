package com.example.doniraj.service;

import com.example.doniraj.models.Claim;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;

import java.util.List;

public interface ClaimService {

    Claim getById(Long id);

    //List<Claim> getClaimsByDonor(Long donor_id);

    List<Claim> getClaimsByRecipient(Long recipient_id);

    Claim claimItem(Long recipient_id, Long item_id);

    Claim deleteClaim(Long recipient_id);
}
