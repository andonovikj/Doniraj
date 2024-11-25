package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.CityDto;
import com.example.doniraj.models.exception.InvalidCityIdException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.doniraj.repository.CityRepository;
import com.example.doniraj.service.CityService;
import org.springframework.web.bind.annotation.RequestBody;

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
        return cityRepository.findById(city_id).orElseThrow(() -> new InvalidCityIdException(city_id));
    }

    @Override
    public City createCity(CityDto cityDto) {
        City city = new City(cityDto.getName(), cityDto.getZipcode());
        return cityRepository.save(city);
    }

    @Override
    public City updateCity(Long city_id, @RequestBody CityDto cityDto) {
        City city = cityRepository.findById(city_id).orElseThrow(() -> new InvalidCityIdException(city_id));

        city.setName(cityDto.getName());
        city.setZipcode(cityDto.getZipcode());

        return cityRepository.save(city);
    }

    @Override
    public City deleteCity(Long city_id) {
        City city = cityRepository.findById(city_id).orElseThrow(() -> new InvalidCityIdException(city_id));
        cityRepository.deleteById(city_id);
        return city;
    }
}
