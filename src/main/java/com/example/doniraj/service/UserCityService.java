package com.example.doniraj.service;

import com.example.doniraj.models.City;
import com.example.doniraj.models.User;

import java.util.List;

public interface UserCityService {
   int reassignUsersToCity(City oldCity, City newCity);
}
