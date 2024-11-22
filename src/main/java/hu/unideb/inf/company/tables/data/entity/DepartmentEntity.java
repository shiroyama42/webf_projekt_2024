package hu.unideb.inf.company.tables.data.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "department")
public class DepartmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String depName;

    public DepartmentEntity() {
    }

    public int getId() {
        return id;
    }

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }
}
