package com.example.doniraj.repository;

import com.example.doniraj.models.City;
import com.example.doniraj.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByName(String name);
    Optional<User> findByNameAndPassword(String name, String password);

    List<User> findByCity(City city);

    @Modifying
    @Query("UPDATE User u SET u.city = :newCity WHERE u.city = :oldCity")
    int reassignUsersToNewCity(@Param("oldCity") City oldCity, @Param("newCity") City newCity);

}
