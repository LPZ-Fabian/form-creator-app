package com.CtrlAltDefeat.formcreatorappbackend.controller;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.service.UserFormService;
import com.CtrlAltDefeat.formcreatorappbackend.exception.ResourceNotFoundException;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/v1/forms")
@RestController
public class UserFormController {
    
    @Autowired
    private UserFormsRepository userFormRepository;
    /**
     * GET method to return all of a user's forms
     */
    @GetMapping()
    public List <UserForm> getAllUserForms(){
        return userFormRepository.findAll();
    }
    /**
     * GET method to return user form by id
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserForm> getUserFormById(@PathVariable long id){
        UserForm form = userFormRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form does not exist with id: " + id));
        return ResponseEntity.ok(form);
    }
    /**
     * POST method to create a new Userform
     */
    @PostMapping("/create")
    public UserForm createUserForm(@RequestBody UserForm form){
        UserForm formResponse = userFormRepository.save(form);
        return formResponse;
    }
    /**
     * PUT method to update a user form
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<UserForm> updateUserForm(@PathVariable long id,@RequestBody UserForm updatedForm){
        UserForm updatedUserForm = userFormRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form does not exist with id:" + id));

        updatedUserForm.setTitle(updatedForm.getTitle());
        updatedUserForm.setDescription(updatedForm.getDescription());
        updatedUserForm.setUserElements(updatedForm.getUserElements());

        userFormRepository.save(updatedUserForm);
        return ResponseEntity.ok(updatedUserForm);
    }
    /**
     * DELETE method to delete an existing user form
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteUserForm(@PathVariable long id){
        UserForm form = userFormRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User form does not exist with id: " + id));
            
            userFormRepository.delete(form);
            
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    
}