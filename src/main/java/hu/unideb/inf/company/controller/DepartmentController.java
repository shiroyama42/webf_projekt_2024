package hu.unideb.inf.company.controller;

import hu.unideb.inf.company.data.entity.DepartmentEntity;
import hu.unideb.inf.company.data.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/company/departments")
@CrossOrigin(origins = "http://localhost:3000")
public class DepartmentController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @GetMapping("")
    public List<DepartmentEntity> getDepartments() {
        return departmentRepository.findAll();  // Get all departments
    }
}
