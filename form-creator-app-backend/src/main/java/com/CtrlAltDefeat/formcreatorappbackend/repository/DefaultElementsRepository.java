package com.CtrlAltDefeat.formcreatorappbackend.repository;

import com.CtrlAltDefeat.formcreatorappbackend.model.DefaultFormElement;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DefaultElementsRepository extends JpaRepository<DefaultFormElement, Long>{
    //all crud database methods
    
}
