package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.Item;
import com.example.doniraj.repository.ItemRepository;
import com.example.doniraj.service.ItemCityService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ItemCityServiceImpl implements ItemCityService {

    private final ItemRepository itemRepository;

    public ItemCityServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public List<Item> findItemsByCity(City city){
        return itemRepository.findByCity(city);
    }

    @Override
    public int reassignItemsToCity(City oldCity, City reassignCity){
        return itemRepository.reassignItemsToNewCity(oldCity, reassignCity);
    }


}
