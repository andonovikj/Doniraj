package com.example.doniraj.models.DTO;

import com.example.doniraj.models.Item;
import com.example.doniraj.models.User;
import com.example.doniraj.models.enums.ClaimStatus;
import lombok.Data;

@Data
public class ClaimDto {

    private ClaimStatus status;

    private Long recipient_id;

    private Long item_id;

}
