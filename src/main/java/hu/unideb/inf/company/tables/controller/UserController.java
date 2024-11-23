package hu.unideb.inf.company.tables.controller;

import hu.unideb.inf.company.tables.data.entity.DepartmentEntity;
import hu.unideb.inf.company.tables.data.dto.UserDTO;
import hu.unideb.inf.company.tables.data.entity.UserEntity;
import hu.unideb.inf.company.tables.data.repository.DepartmentRepository;
import hu.unideb.inf.company.tables.data.repository.UserRepository;
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
    public UserDTO updateUser(@PathVariable("id") int id, @RequestBody UserEntity userDetails) {
        // Fetch the user entity from the database
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Validate and update department
        if (userDetails.getDepId() != null && userDetails.getDepId().getId() != 0) {
            DepartmentEntity department = departmentRepository.findById(userDetails.getDepId().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            user.setDepId(department);
        }

        // Update other fields
        if (userDetails.getFirstName() != null) user.setFirstName(userDetails.getFirstName());
        if (userDetails.getLastName() != null) user.setLastName(userDetails.getLastName());
        if (userDetails.getRole() != null) user.setRole(userDetails.getRole());
        if (userDetails.getEmailAddress() != null) user.setEmailAddress(userDetails.getEmailAddress());

        // Save updated user
        userRepository.save(user);

        return new UserDTO(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getRole(),
                user.getEmailAddress(),
                user.getDepId() != null ? user.getDepId().getDepName() : null
        );
    }

    @PostMapping("")
    public UserEntity saveUser(@RequestBody UserEntity user){
        if (user.getDepId() != null && user.getDepId().getId() != 0) {
            DepartmentEntity department = departmentRepository.findById(user.getDepId().getId())
                    .orElseThrow(() -> new RuntimeException("Department not found"));
            user.setDepId(department);
        } else {
            user.setDepId(null);
        }

        return userRepository.save(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") int id){
        userRepository.deleteById(id);
    }

}
