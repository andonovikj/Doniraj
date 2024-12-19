package com.example.doniraj.service;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.CityDto;

import java.util.List;

public interface CityService {

    List<City> getCities();

    City getById(Long city_id);

    City createCity(CityDto cityDto);

    City updateCity(Long city_id, CityDto cityDto);

    void deleteCity(Long id, Long newCityId);


}
