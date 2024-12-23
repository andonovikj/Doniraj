package com.example.doniraj.service;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.ItemDto;
import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;
import com.example.doniraj.models.enums.ItemStatus;

import java.time.LocalDate;
import java.util.List;

public interface ItemService {

    List<Item> getItems();

    /*
        Get all Items whose ItemStatus is "AVAILABLE"
        which the user can browse on the home page
     */
    List<Item> getItemsByStatus(ItemStatus itemStatus);

    Item getById(Long id);

    Item createItem(ItemDto itemdto);

    Item updateItem(Long id, ItemDto itemdto);

    Item deleteItem(Long id);



}
