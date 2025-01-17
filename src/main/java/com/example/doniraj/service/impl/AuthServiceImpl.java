package com.example.doniraj.service.impl;

import com.example.doniraj.config.JwtTokenUtil;
import com.example.doniraj.models.City;
import com.example.doniraj.models.DTO.LoginRequestDTO;
import com.example.doniraj.models.DTO.UserDto;
import com.example.doniraj.models.User;
import com.example.doniraj.models.exception.InvalidUsernameOrPasswordException;
import com.example.doniraj.repository.UserRepository;
import com.example.doniraj.service.AuthService;
import com.example.doniraj.service.CityService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtTokenUtil jwtTokenUtil;

    private final CityService cityService;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JwtTokenUtil jwtTokenUtil, CityService cityService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.cityService = cityService;
    }

    @Override
    public User register(UserDto userDto) {
        if (userDto.getName()==null || userDto.getName().isEmpty()  || userDto.getPassword()==null || userDto.getPassword().isEmpty())
            throw new InvalidUsernameOrPasswordException();
        // TODO ADD ATTRIBUTE REPEATPASSWORD IN USER ENTITY
        //if (!password.equals(repeatPassword))
        //    throw new PasswordsDoNotMatchException();
        User user = userRepository.findByName(userDto.getName());
        //if (!user.getName().isEmpty() && user != null) TODO: fix this later
        //    throw new UsernameAlreadyExistsException(userDto.getName());

        /*if(!userRepository.findByName(userDto.getName()).equals(""))
            throw new UsernameAlreadyExistsException(userDto.getName()); */


        String encodedPassword = passwordEncoder.encode(userDto.getPassword());

        if (userDto.getCity_id() == null) {
            System.out.println(userDto.getCity_id() + "  = null");
        }

        City city = cityService.getById(userDto.getCity_id());
        //City city = cityRepository.findById(userDto.getCity_id()).orElseThrow(() -> new InvalidCityIdException(userDto.getCity_id()));
        user = new User(userDto.getName(), userDto.getEmail(), encodedPassword, userDto.getPhone_number(), userDto.getRole(), city);
        return userRepository.save(user);
    }

    @Override
    public String login (LoginRequestDTO loginRequestDTO){
        try {
            var authenticationToken = new UsernamePasswordAuthenticationToken(loginRequestDTO.getUsername(), loginRequestDTO.getPassword());
            var authentication = authenticationManager.authenticate(authenticationToken);
            var jwt = jwtTokenUtil.generateToken(authentication.getName());
            return jwt;
        } catch (AuthenticationException e) {
            return "Invalid credentials";
        }
        //return userRepository.findByNameAndPassword(loginRequestDTO.getUsername(), loginRequestDTO.getPassword())
          //      .orElseThrow(InvalidUsernameOrPasswordException::new);
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication){
        // Clear the SecurityContext for the current user.
        // Destroy the user’s session, ensuring their data isn't cached on the server.
        SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        logoutHandler.logout(request, response, authentication);
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
