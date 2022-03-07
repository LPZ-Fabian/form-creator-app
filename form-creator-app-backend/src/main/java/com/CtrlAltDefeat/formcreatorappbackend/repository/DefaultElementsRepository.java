package com.CtrlAltDefeat.formcreatorappbackend.repository;

import com.CtrlAltDefeat.formcreatorappbackend.model.DefaultFormElement;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DefaultElementsRepository extends JpaRepository<DefaultFormElement, Long>{
    //all crud database methods
    
}
