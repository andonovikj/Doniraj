package com.example.doniraj.service;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.CityDto;

import java.util.List;

public interface CityService {

    List<City> getCities();

    City getById(Long city_id);

    City createCity(City city);

    City updateCity(Long city_id, String name, Integer zipcode);

    City deleteCity(Long id);


}
