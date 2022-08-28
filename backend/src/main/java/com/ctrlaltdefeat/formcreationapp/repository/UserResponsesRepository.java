package com.ctrlaltdefeat.formcreationapp.repository;

import com.ctrlaltdefeat.formcreationapp.model.UserFormResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserResponsesRepository extends JpaRepository<UserFormResponse, Long> {
}
