package com.CtrlAltDefeat.formcreatorappbackend.repository;

import java.util.List;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResponsesRepository extends JpaRepository<UserFormResponse, Long> {
    List<UserFormResponse> findByFormId(Long id);

    // List<UserFormResponse> findByElementId(Long id);
    // List<UserFormResponse> findByFormIdAndElementId(Long formId, Long elementId);
}
