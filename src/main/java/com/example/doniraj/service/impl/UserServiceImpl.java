package com.example.doniraj.service.impl;

import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.UserDto;
import com.example.doniraj.models.User;
import com.example.doniraj.models.exception.InvalidCityIdException;
import com.example.doniraj.models.exception.InvalidUserIdException;
import com.example.doniraj.models.exception.InvalidUsernameOrPasswordException;
import com.example.doniraj.models.exception.UsernameAlreadyExistsException;
import com.example.doniraj.service.CityService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.UserService;

import java.util.List;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final CityService cityService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, CityService cityService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.cityService = cityService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new InvalidCityIdException(id));
    }

//    @Override
//    public User create(UserDto userdto){
//        String encodedPassword = passwordEncoder.encode(userdto.getPassword());
//        City city = cityService.getById(userdto.getCity_id());
//        User user = new User(userdto.getName(), userdto.getEmail(), encodedPassword, userdto.getPhone_number(), userdto.getRole(), city);
//        return userRepository.save(user);
//    }

    @Override
    public User update(Long user_id, UserDto userdto) {
        User user = userRepository.findById(user_id).orElseThrow(() -> new InvalidUserIdException(user_id));

        user.setName(userdto.getName());
        user.setEmail(userdto.getEmail());
        City city = cityService.getById(userdto.getCity_id());
        user.setCity(city);
        user.setRole(userdto.getRole());
        user.setPhone_number(userdto.getPhone_number());

        if (userdto.getPassword() != null && !userdto.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(userdto.getPassword()));
        }

        return userRepository.save(user);
    }

    @Override
    public User delete(Long user_id){
        User user = userRepository.findById(user_id).orElseThrow(() -> new InvalidUserIdException(user_id));
        userRepository.delete(user);
        return user;
    }

    @Override
    public User register(UserDto userDto) {
        if (userDto.getName()==null || userDto.getName().isEmpty()  || userDto.getPassword()==null || userDto.getPassword().isEmpty())
            throw new InvalidUsernameOrPasswordException();
        //TODO ADD ATTRIBUTE REPEATPASSWORD IN USER ENTITY
        //if (!password.equals(repeatPassword))
        //    throw new PasswordsDoNotMatchException();
        User user = userRepository.findByName(userDto.getName());
        if (!user.getName().isEmpty())
            throw new UsernameAlreadyExistsException(userDto.getName());

        /*if(!userRepository.findByName(userDto.getName()).equals(""))
            throw new UsernameAlreadyExistsException(userDto.getName());*/

        String encodedPassword = passwordEncoder.encode(userDto.getPassword());
        City city = cityService.getById(userDto.getCity_id());
        user = new User(userDto.getName(), userDto.getEmail(), encodedPassword, userDto.getPhone_number(), userDto.getRole(), city);
        return userRepository.save(user);
    }

    @Override
    public User login (UserDetails userDetails){

        if (userDetails.getUsername() == null || userDetails.getPassword() == null ||
                userDetails.getUsername().isEmpty() || userDetails.getPassword().isEmpty()) {
            throw new InvalidUsernameOrPasswordException();
        }

        return userRepository.findByNameAndPassword(userDetails.getUsername(), userDetails.getPassword())
                .orElseThrow(InvalidUsernameOrPasswordException::new);
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        return userRepository.findByName(name);//.orElseThrow(()->new UsernameNotFoundException(name));
        /* This works if User doesn't implement UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getName(),
                user.getPassword(),
                Collections.singletonList(user.getRole())
        );*/
    }
}
