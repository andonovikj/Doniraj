package com.example.doniraj.web;

import com.example.doniraj.models.DTO.ItemDto;
import com.example.doniraj.models.Item;
import com.example.doniraj.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    @Autowired
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllItems(){
        List<Item> items = itemService.getItems();

        if (items.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getItem(@PathVariable Long id)
    {
        Item item = itemService.getById(id);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<?> createItem(@RequestBody ItemDto itemdto){
        return new ResponseEntity<>(itemService.createItem(itemdto), HttpStatus.CREATED);
    }
    /*{
        "item_id": 7,
        "name": "novo",
        "description": "novoooo yasss slayyyy",
        "status": "AVAILABLE",
        "city_id": 1,
        "user_id": 2
    }*/
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateItem(@PathVariable Long id, @RequestBody ItemDto itemdto){
        return new ResponseEntity<>(itemService.updateItem(id, itemdto), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteItem(@PathVariable Long id){
        return new ResponseEntity<>(itemService.deleteItem(id), HttpStatus.OK);
    }
}
