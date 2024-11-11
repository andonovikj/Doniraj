package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.ItemDto;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;
import com.example.doniraj.models.exception.InvalidCityIdException;
import com.example.doniraj.models.exception.InvalidItemIdException;
import com.example.doniraj.repository.CityRepository;
import com.example.doniraj.service.CityService;
import com.example.doniraj.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.doniraj.repository.ItemRepository;
import com.example.doniraj.service.ItemService;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;

    private final UserService userService;

    private final CityService cityService;

    @Autowired
    public ItemServiceImpl(ItemRepository itemRepository, UserService userService, CityService cityService) {
        this.itemRepository = itemRepository;
        this.userService = userService;
        this.cityService = cityService;
    }

    @Override
    public List<Item> getItems() {
        return itemRepository.findAll();
    }

    @Override
    public Item getById(Long item_id) {
        return itemRepository.findById(item_id).orElseThrow(() -> new InvalidCityIdException(item_id));
    }

    @Override
    public Item createItem(ItemDto itemdto) {
        City city = cityService.getById(itemdto.getCity_id());
        // find and add user

        User donor = userService.getById(itemdto.getUser_id());
        Item item = new Item(itemdto.getName(), itemdto.getDescription(), LocalDate.now(), itemdto.getStatus(), donor, city);

        return itemRepository.save(item);
    }

    @Override
    public Item updateItem(Long id, ItemDto itemdto) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new InvalidCityIdException(id));

        item.setName(itemdto.getName());
        item.setDescription(item.getDescription());
        item.setStatus(itemdto.getStatus());
        item.setDate_created(LocalDate.now());
        City city = cityService.getById(itemdto.getCity_id());
        item.setCity(city);

        // Fetch the user (e.g., authenticated user)
        User donor = userService.getById(itemdto.getUser_id()); // Replace with actual method to get user (could be from a token)

        item.setDonor(donor);

        return itemRepository.save(item);
    }

    @Override
    public Item deleteItem(Long id) {
        Item item = itemRepository.findById(id).orElseThrow(() -> new InvalidCityIdException(id));
        itemRepository.delete(item);
        return item;
    }
}
