package com.example.doniraj.models.DTO;

import com.example.doniraj.models.City;
import com.example.doniraj.models.enums.Role;
import lombok.Data;

@Data
public class UserDto {

    private String name;

    private String password;

    private String email;

    private Integer phone_number;

    private Long city_id;

    private Role role;

}
