package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.exception.InvalidCityIdException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.doniraj.repository.CityRepository;
import com.example.doniraj.service.CityService;

import java.util.List;

@Service
@Transactional
public class CityServiceImpl implements CityService {

    public final CityRepository cityRepository;

    @Autowired
    public CityServiceImpl(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    @Override
    public List<City> getCities() {
        return cityRepository.findAll();
    }

    @Override
    public City getById(Long city_id) {
        return cityRepository.findById(city_id).orElseThrow(InvalidCityIdException :: new);
    }

    @Override
    public City createCity(City city) {
        //City city = new City(name, zipcode);
        return cityRepository.save(city);
    }

    @Override
    public City updateCity(Long city_id, String name, Integer zipcode) {
        City city = cityRepository.findById(city_id).orElseThrow(InvalidCityIdException :: new);

        city.setName(name);
        city.setZipcode(zipcode);

        return cityRepository.save(city);
    }

    @Override
    public City deleteCity(Long city_id) {
        City city = cityRepository.findById(city_id).orElseThrow(InvalidCityIdException :: new);
        cityRepository.deleteById(city_id);
        return city;
    }
}
