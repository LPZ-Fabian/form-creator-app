package com.CtrlAltDefeat.formcreatorappbackend.repository;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResponsesRepository extends JpaRepository<UserFormResponse, Long> {
}
