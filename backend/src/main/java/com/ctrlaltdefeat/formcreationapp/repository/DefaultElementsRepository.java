package com.ctrlaltdefeat.formcreationapp.repository;

import com.ctrlaltdefeat.formcreationapp.model.DefaultFormElement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DefaultElementsRepository extends JpaRepository<DefaultFormElement, Long> {

}
