package hu.unideb.inf.company.tables.data.repository;

import hu.unideb.inf.company.tables.data.entity.DepartmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Integer> {
}
