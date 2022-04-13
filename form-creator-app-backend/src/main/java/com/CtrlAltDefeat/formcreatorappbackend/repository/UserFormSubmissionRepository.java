package com.CtrlAltDefeat.formcreatorappbackend.repository;

import java.util.List;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormResponse;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFormSubmissionRepository extends JpaRepository<UserFormSubmission, Long> {
    List<UserFormSubmission> findByFormId(Long id);

}
