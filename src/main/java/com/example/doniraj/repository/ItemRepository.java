package com.example.doniraj.repository;

import com.example.doniraj.models.City;
import com.example.doniraj.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

    List<Item> findByCity(City city);

    @Modifying
    @Query("UPDATE Item i SET i.city = :newCity WHERE i.city = :oldCity")
    int reassignItemsToNewCity(@Param("oldCity") City oldCity, @Param("newCity") City newCity);
}
