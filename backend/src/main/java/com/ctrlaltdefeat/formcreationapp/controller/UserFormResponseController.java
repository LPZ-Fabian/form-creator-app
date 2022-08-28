package com.ctrlaltdefeat.formcreationapp.controller;

import java.util.List;

import com.ctrlaltdefeat.formcreationapp.model.UserFormResponse;
import com.ctrlaltdefeat.formcreationapp.repository.UserResponsesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/form-responses")
public class UserFormResponseController {
    @Autowired
    private UserResponsesRepository userResponsesRepository;

    @GetMapping
    public List<UserFormResponse> getAllUserFormResponses() {
        return userResponsesRepository.findAll();
    }
}
