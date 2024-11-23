package hu.unideb.inf.company.login.controller;

import hu.unideb.inf.company.login.dto.RegisterRequest;
import hu.unideb.inf.company.tables.data.entity.UserEntity;
import hu.unideb.inf.company.tables.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {
    @Autowired
    UserRepository userRepository;

    @PostMapping("/register")
    public UserEntity register(@RequestBody UserEntity userEntity){
       return userRepository.save(userEntity);
    }
}
