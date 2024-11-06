package com.example.doniraj.service.impl;

import org.springframework.stereotype.Service;
import com.example.doniraj.repository.ClaimRepository;
import com.example.doniraj.service.ClaimService;

@Service
public class ClaimServiceImpl implements ClaimService {

    public final ClaimRepository claimRepository;


    public ClaimServiceImpl(ClaimRepository claimRepository) {
        this.claimRepository = claimRepository;
    }
}
