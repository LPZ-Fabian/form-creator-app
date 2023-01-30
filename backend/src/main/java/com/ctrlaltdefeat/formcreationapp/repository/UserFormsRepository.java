package com.ctrlaltdefeat.formcreationapp.repository;

import com.ctrlaltdefeat.formcreationapp.model.UserForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFormsRepository extends JpaRepository<UserForm, Long> {
}
