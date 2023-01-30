package com.ctrlaltdefeat.formcreationapp.controller;

import java.util.List;

import com.ctrlaltdefeat.formcreationapp.exception.ResourceNotFoundException;
import com.ctrlaltdefeat.formcreationapp.model.DefaultFormElement;
import com.ctrlaltdefeat.formcreationapp.repository.DefaultElementsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/add-element")
public class DefaultFormElementController {
    @Autowired
    private DefaultElementsRepository defaultElementsRepository;

    @GetMapping
    public List<DefaultFormElement> getAllDefaultFormElements() {
        return defaultElementsRepository.findAll();
    }

    // Build create default form Element REST API
    // NOTE: No PostMapping needed...
    public DefaultFormElement createDefaultFormElement(@RequestBody DefaultFormElement element) {
        return defaultElementsRepository.save(element);
    }

    // Build get default form element by ID REST API
    @GetMapping("{id}")
    public ResponseEntity<DefaultFormElement> getDefaultFormElementById(@PathVariable long id) {
        DefaultFormElement element = defaultElementsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Default form element does not exist with id: " + id));
        return ResponseEntity.ok(element);
    }
}
