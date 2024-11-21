package hu.unideb.inf.company.controller;

import hu.unideb.inf.company.data.entity.DepartmentEntity;
import hu.unideb.inf.company.data.dto.UserDTO;
import hu.unideb.inf.company.data.entity.UserEntity;
import hu.unideb.inf.company.data.repository.DepartmentRepository;
import hu.unideb.inf.company.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/company/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping("")
    public List<UserDTO> getUsers(){
        List<UserEntity> users = userRepository.findAll();
        return users.stream()
                .map(user -> new UserDTO(
                    user.getId(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole(),
                    user.getEmailAddress(),
                    user.getDepId() != null ? user.getDepId().getDepName() : null))
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable("id") int id){
        UserEntity user = userRepository.findById(id).orElseThrow(() ->
                new RuntimeException("User not found with id: " + id));

        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getEmailAddress(),
                user.getDepId() != null ? user.getDepId().getDepName() : null
        );
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

    @PostMapping("")
    public UserEntity saveUser(@RequestBody UserEntity user){
        DepartmentEntity department = departmentRepository.findById(user.getDepId().getId())
                        .orElseThrow(() -> new RuntimeException("Department not found"));

        user.setDepId(department);

        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id){
        userRepository.deleteById(id);
    }

}
