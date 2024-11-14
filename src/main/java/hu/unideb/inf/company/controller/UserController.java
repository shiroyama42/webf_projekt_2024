package hu.unideb.inf.company.controller;

import hu.unideb.inf.company.data.entity.UserEntity;
import hu.unideb.inf.company.data.repository.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("")
    public List<UserEntity> getUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public UserEntity getUser(@PathVariable("id") int id){
        UserEntity user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with id: " + id));

        return user;
    }

    @PutMapping("/{id}")
    public UserEntity updateUser(@PathVariable("id") int id, @RequestBody UserEntity userDetails){
        UserEntity user = userRepository.getReferenceById(id);

        user.setDepId(userDetails.getDepId());
        user.setFirstName(userDetails.getFirstName());
        user.setLastName(user.getLastName());
        user.setRole(user.getRole());
        user.setEmailAddress(user.getEmailAddress());

        return userRepository.save(user);
    }

    @PostMapping("/{id}")
    public UserEntity saveUser(@RequestBody UserEntity user){
        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id){
        userRepository.deleteById(id);
    }

}
