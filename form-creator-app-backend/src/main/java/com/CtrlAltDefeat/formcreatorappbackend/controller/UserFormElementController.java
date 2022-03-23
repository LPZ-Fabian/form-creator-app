package com.CtrlAltDefeat.formcreatorappbackend.controller;

import com.CtrlAltDefeat.formcreatorappbackend.repository.UserElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.exception.ResourceNotFoundException;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;

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
@RequestMapping("/api/v1/form-elements")
public class UserFormElementController {
    @Autowired
    private UserElementsRepository userElementsRepository;

    @Autowired
    private UserFormsRepository userFormsRepository;
    
    @GetMapping
    public List <UserFormElement> getAllUserFormElements(){
        return userElementsRepository.findAll();
    }
    //Build create UserFormElement REST API
    @PostMapping
    public UserFormElement createUserFormElement(@RequestBody UserFormElement element){
        return userElementsRepository.save(element);
    }
    //Build get User Element by ID Rest API
    @GetMapping("{id}")
    public ResponseEntity<UserFormElement> getDefaultFormElementById(@PathVariable long id){
        UserFormElement element = userElementsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id: " + id));
        return ResponseEntity.ok(element);
    }
    //Build get User Element by form Rest APi
    /*@GetMapping("/user-forms/{formId}")
    public ResponseEntity<List<UserFormElement>> getAllFormElementByFormId(@PathVariable long formId){
        if(!userFormsRepository.existsById(formId)){
            throw new ResourceNotFoundException("Form not found with id: " + formId);
        }
        List <UserFormElement> elements = userElementsRepository.findByFormId(formId);
        return ResponseEntity.ok(elements);
    }*/

    //Build update employeeRest API
    @PutMapping("{id}")
    public ResponseEntity<UserFormElement> updateUserFormElement(@PathVariable long id,@RequestBody UserFormElement userElementDetails){
        UserFormElement updateUserElement = userElementsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id:" + id));

        updateUserElement.setTitle(userElementDetails.getTitle());
        //updateUserElement.setType(userElementDetails.getType());
        updateUserElement.setKey(userElementDetails.getKey());
        updateUserElement.setRequired(userElementDetails.getRequired());

        userElementsRepository.save(updateUserElement);
        return ResponseEntity.ok(updateUserElement);
    }
    //Build delete employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){
        UserFormElement element = userElementsRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id: " + id));
            
            userElementsRepository.delete(element);
            
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}