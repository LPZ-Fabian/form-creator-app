package com.CtrlAltDefeat.formcreatorappbackend.repository;

import java.util.List;
import java.util.Optional;


import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormHiddenElement;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFormHiddenElementsRepository extends JpaRepository<UserFormHiddenElement, Long> {
}
