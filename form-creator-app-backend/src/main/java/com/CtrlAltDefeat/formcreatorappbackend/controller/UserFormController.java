package com.CtrlAltDefeat.formcreatorappbackend.controller;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.exception.ResourceNotFoundException;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/forms")
public class UserFormController {
    @Autowired
    private UserFormsRepository userFormRepository;
    
    @GetMapping()
    public List <UserForm> getAllUserForms(){
        return userFormRepository.findAll();
    }
    //Build create UserForm REST API
    @PostMapping()
    public UserForm createUserForm(@RequestBody UserForm form){
        return userFormRepository.save(form);
    }
    //Build get User Element by ID Rest API
    @GetMapping("{id}")
    public ResponseEntity<UserForm> getUserFormById(@PathVariable long id){
        UserForm form = userFormRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form does not exist with id: " + id));
        return ResponseEntity.ok(form);
    }
    //Build update employeeRest API
    @PutMapping("{id}")
    public ResponseEntity<UserForm> updateUserForm(@PathVariable long id,@RequestBody UserForm formDetails){
        UserForm updateUserElement = userFormRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form does not exist with id:" + id));

        updateUserElement.setTitle(formDetails.getTitle());
        //updateUserElement.setType(userElementDetails.getType());
        updateUserElement.setDescription(formDetails.getDescription());
       // updateUserElement.setRequired(userElementDetails.getRequired());

        userFormRepository.save(updateUserElement);
        return ResponseEntity.ok(updateUserElement);
    }
    //Build delete Element REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteForm(@PathVariable long id){
        UserForm form = userFormRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form does not exist with id: " + id));
            
            userFormRepository.delete(form);
            
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}