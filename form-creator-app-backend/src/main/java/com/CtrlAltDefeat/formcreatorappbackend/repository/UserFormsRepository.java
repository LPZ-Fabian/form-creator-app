package com.CtrlAltDefeat.formcreatorappbackend.repository;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserFormsRepository extends JpaRepository<UserForm, Long>{
    //all crud database methods

}
