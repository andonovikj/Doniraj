package com.example.doniraj.service;

import com.example.doniraj.models.City;
import com.example.doniraj.models.Item;

import java.util.List;


public interface ItemCityService {

    List<Item> findItemsByCity(City city);
    int reassignItemsToCity(City oldCity, City newCity);
}
