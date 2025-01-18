package com.example.doniraj.service.impl;

import com.example.doniraj.models.Claim;
import com.example.doniraj.models.DTO.ClaimDto;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;
import com.example.doniraj.models.enums.ClaimStatus;
import com.example.doniraj.models.enums.ItemStatus;
import com.example.doniraj.models.exception.*;
import com.example.doniraj.service.EmailService;
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

    private final ClaimRepository claimRepository;

    private final UserService userService;

    private final EmailService emailService;

    private final ItemService itemService;

    @Autowired
    public ClaimServiceImpl(ClaimRepository claimRepository, UserService userService, EmailService emailService, ItemService itemService) {
        this.claimRepository = claimRepository;
        this.userService = userService;
        this.emailService = emailService;
        this.itemService = itemService;
    }

    public Claim getById(Long id){
        return claimRepository.findById(id).orElseThrow(() -> new InvalidClaimIdException(id));
    }

    public List<Claim> getClaims(){
        return claimRepository.findAll();
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
    public Claim claimItem(ClaimDto claimDto) {

        User recipient = userService.getById(claimDto.getRecipient_id());

        Item item = itemService.getById(claimDto.getItem_id());

        if (item.getDonor().equals(recipient)) {
            throw new IllegalArgumentException("Donor cannot claim their own item");
        }
        Claim claim = new Claim(recipient, item, ClaimStatus.CREATED);
        claim.setClaimDate(LocalDate.now());

        // Send an email to the recipient with the Donor's info

        /*
        User donor = item.getDonor();

        String recipientEmail = recipient.getEmail();

        emailService.SendMail(recipientEmail,
                "Claim Confirmation - Donor Information",
                String.format("\"Hello %s,\\n\\nYou have claimed an item. " +
                        "Here are the donor's details:" +
                        "\\nName: %s\\nEmail: %s\\nPhone: %s\\n\\n" +
                        "Please contact them to arrange for item pickup.\\n\\n" +
                        "Thank you for using Doniraj!\",\n",
                        recipient.getName(), donor.getName(), donor.getEmail(), donor.getPhone_number()));
        */
        item.setStatus(ItemStatus.CLAIMED);
//        claim.setRecipient(recipient);
//        claim.setItem(item);

        return this.claimRepository.save(claim);
    }

    @Override
    public Claim updateClaim(Long claim_id, ClaimDto claimDto) {

        Claim claim = claimRepository.findById(claim_id).orElseThrow(() -> new InvalidClaimIdException(claim_id));

        Item item = itemService.getById(claimDto.getItem_id());

        User recipient = userService.getById(claimDto.getRecipient_id());

        if (claimDto.getStatus() != null){
            claim.setStatus(claimDto.getStatus());
        }

        claim.setItem(item);
        claim.setRecipient(recipient);

        return claimRepository.save(claim);
    }

    @Override
    public Claim deleteClaim(Long recipient_id) {
        Claim claim = claimRepository.findById(recipient_id).orElseThrow(() -> new InvalidCityIdException(recipient_id));
        claimRepository.deleteById(claim.getClaim_id());
        return claim;
    }

}
