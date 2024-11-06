package com.example.doniraj.service.impl;

import org.springframework.stereotype.Service;
import com.example.doniraj.repository.CityRepository;
import com.example.doniraj.service.CityService;

@Service
public class CityServiceImpl implements CityService {

    public final CityRepository cityRepository;


    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }
}
