package com.example.doniraj.service.impl;

import org.springframework.stereotype.Service;
import com.example.doniraj.repository.ItemRepository;
import com.example.doniraj.service.ItemService;

@Service
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;


    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }
}
