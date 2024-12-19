package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.CityDto;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;
import com.example.doniraj.models.exception.InvalidCityIdException;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.ItemCityService;
import com.example.doniraj.service.UserCityService;
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

    private final CityRepository cityRepository;

    private final UserCityService userCityService;

    private final ItemCityService itemCityService;

    private final UserRepository userRepository;

    @Autowired
    public CityServiceImpl(CityRepository cityRepository, UserCityService userCityService, ItemCityService itemCityService, UserRepository userRepository) {
        this.cityRepository = cityRepository;
        this.userCityService = userCityService;
        this.itemCityService = itemCityService;
        this.userRepository = userRepository;
    }

    @Override
    public List<City> getCities() {
        return cityRepository.findAll();
    }

    @Override
    public City getById(Long city_id) {
        System.out.println("City ID received: " + city_id);
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
    public void deleteCity(Long city_id, Long newCityId) {
        City cityToDelete = cityRepository.findById(city_id).orElseThrow(() -> new InvalidCityIdException(city_id));

        // find potential Item fk constraints
        List<Item> deleteCityItems = itemCityService.findItemsByCity(cityToDelete);

        // find potential User fk constaints
        List<User> deleteCityUsers = userRepository.findByCity(cityToDelete);

        // if there are none, the city can be safely deleted
        if(!deleteCityItems.isEmpty())
        {
            City reassignCity = cityRepository.findById(newCityId).orElseThrow(() -> new InvalidCityIdException(newCityId));
            itemCityService.reassignItemsToCity(cityToDelete, reassignCity);
        }
        if (!deleteCityUsers.isEmpty()){
            City reassignCity = cityRepository.findById(newCityId).orElseThrow(() -> new InvalidCityIdException(newCityId));
            userCityService.reassignUsersToCity(cityToDelete, reassignCity);
        }

        cityRepository.deleteById(city_id);
    }
}
