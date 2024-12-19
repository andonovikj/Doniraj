package com.example.doniraj.service;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.ItemDto;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;

import java.time.LocalDate;
import java.util.List;

public interface ItemService {

    List<Item> getItems();

    Item getById(Long id);

    Item createItem(ItemDto itemdto);

    Item updateItem(Long id, ItemDto itemdto);

    Item deleteItem(Long id);


}
