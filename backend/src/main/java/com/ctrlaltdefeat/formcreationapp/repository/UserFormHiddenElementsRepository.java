package com.ctrlaltdefeat.formcreationapp.repository;

import java.util.List;
import java.util.Optional;


import com.ctrlaltdefeat.formcreationapp.model.UserFormHiddenElement;
import com.ctrlaltdefeat.formcreationapp.model.UserFormSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFormHiddenElementsRepository extends JpaRepository<UserFormHiddenElement, Long> {
}
