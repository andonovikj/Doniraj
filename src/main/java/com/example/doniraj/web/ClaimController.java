package com.example.doniraj.web;

import com.example.doniraj.models.Claim;
import com.example.doniraj.models.DTO.ClaimDto;
import com.example.doniraj.models.enums.ClaimStatus;
import com.example.doniraj.service.ClaimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/claim")
public class ClaimController {
    private final ClaimService claimService;

    @Autowired
    public ClaimController(ClaimService claimService) {
        this.claimService = claimService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getClaims(){
        return new ResponseEntity<>(claimService.getClaims(), HttpStatus.OK);
    }

    @GetMapping("/all/{recipient_id}")
    public ResponseEntity<?> getClaimsByRecipient(@PathVariable Long recipient_id){
        List<Claim> claims = claimService.getClaimsByRecipient(recipient_id);
        if (claims.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(claims, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return new ResponseEntity<>(claimService.getById(id), HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createClaim(@RequestBody ClaimDto claimdto){
        return new ResponseEntity<>(claimService.claimItem(claimdto), HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateClaim(@PathVariable Long id,
                                         @RequestBody ClaimDto claimDto) {
        return new ResponseEntity<>(claimService.updateClaim(id, claimDto), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClaim(@PathVariable Long id)
    {
        return new ResponseEntity<>(claimService.deleteClaim(id), HttpStatus.OK);
    }

}
