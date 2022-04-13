package com.CtrlAltDefeat.formcreatorappbackend.repository;

import java.util.List;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserElementsRepository extends JpaRepository<UserFormElement, Long> {
    List<UserFormElement> findByFormId(Long formId);
}
