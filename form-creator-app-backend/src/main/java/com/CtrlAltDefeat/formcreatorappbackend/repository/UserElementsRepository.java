package com.CtrlAltDefeat.formcreatorappbackend.repository;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserElementsRepository extends JpaRepository<UserFormElement, Long>{
    //all crud database methods

}
