package com.example.doniraj.service.impl;

import com.example.doniraj.models.Claim;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;
import com.example.doniraj.models.enums.ClaimStatus;
import com.example.doniraj.models.exception.*;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.ItemService;
import com.example.doniraj.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.doniraj.repository.ClaimRepository;
import com.example.doniraj.service.ClaimService;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class ClaimServiceImpl implements ClaimService {

    public final ClaimRepository claimRepository;

    public final UserService userService;

    public final UserRepository userRepository;

    public final ItemService itemService;

    @Autowired
    public ClaimServiceImpl(ClaimRepository claimRepository, UserService userService, UserRepository userRepository, ItemService itemService) {
        this.claimRepository = claimRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.itemService = itemService;
    }

    public Claim getById(Long id){
        return claimRepository.findById(id).orElseThrow(() -> new InvalidClaimIdException(id));
    }

    @Override
    public List<Claim> getClaimsByRecipient(Long recipient_id) {

        User recipient = userService.getById(recipient_id);

        try
        {
            return claimRepository.findByRecipient(recipient);
        }
        catch (InvalidUserIdException exception)
        {
            System.out.println("Exception occurred: " + exception.getMessage());
            return Collections.emptyList();
        }

    }

    @Override
    public Claim claimItem(Long recipient_id, Long item_id) {

        User recipient = userService.getById(recipient_id);

        Item item = itemService.getById(item_id);

        if (item.getDonor().equals(recipient)) {
            throw new IllegalArgumentException("Donor cannot claim their own item");
        }
        Claim claim = new Claim(recipient, item);
//        claim.setClaimDate(LocalDate.now());
//        claim.setRecipient(recipient);
//        claim.setItem(item);

        return this.claimRepository.save(claim);
    }

    @Override
    public Claim deleteClaim(Long recipient_id) {
        Claim claim = claimRepository.findById(recipient_id).orElseThrow(() -> new InvalidCityIdException(recipient_id));
        claimRepository.deleteById(claim.getClaim_id());
        return claim;
    }

}
