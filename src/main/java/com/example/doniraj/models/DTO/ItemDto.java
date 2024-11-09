package com.example.doniraj.models.DTO;

import com.example.doniraj.models.City;
import com.example.doniraj.models.enums.Status;
import lombok.Data;

@Data
public class ItemDto {
    private String name;

    private String description;

    private Status status;

    private Long city_id;

    private Long user_id;
}
