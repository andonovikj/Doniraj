package com.example.doniraj.web;

import com.example.doniraj.models.City;
import com.example.doniraj.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/city")
public class CityController {
    private final CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllCities(){
        List<City> cities = cityService.getCities();
        if (cities.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // or HttpStatus.NOT_FOUND if that’s preferable
        }
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCity(@PathVariable Long id)
    {
        City city = cityService.getById(id);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createCity(@RequestBody City city) {
        City newCity = cityService.createCity(city);
        return new ResponseEntity<>(newCity, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCity(@PathVariable Long id,
                                        @RequestParam String name,
                                        @RequestParam Integer zipcode) {
        City updatedCity = cityService.updateCity(id, name, zipcode);

        return new ResponseEntity<>(updatedCity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id){
        return new ResponseEntity<>(cityService.deleteCity(id), HttpStatus.OK);
    }

}
