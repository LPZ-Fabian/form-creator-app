package com.CtrlAltDefeat.formcreatorappbackend.controller;

import com.CtrlAltDefeat.formcreatorappbackend.repository.DefaultElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.exception.ResourceNotFoundException;
import com.CtrlAltDefeat.formcreatorappbackend.model.DefaultFormElement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/add-element")
public class DefaultFormElementController {
    @Autowired
    private DefaultElementsRepository defaultElementsRepository;
    
    @GetMapping
    public List <DefaultFormElement> getAllDefaultFormElements(){
        return defaultElementsRepository.findAll();
    }
    //build create default form Element REST API
    public DefaultFormElement createDefaultFormElement(@RequestBody DefaultFormElement element){
        return defaultElementsRepository.save(element);
    }
    //build get default form element by id REST API
    @GetMapping("{id}")
    public ResponseEntity<DefaultFormElement> getDefaultFormElementById(@PathVariable long id){
        DefaultFormElement element = defaultElementsRepository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("Default form element does not exist with id: " + id));
        return ResponseEntity.ok(element);
    }
}
