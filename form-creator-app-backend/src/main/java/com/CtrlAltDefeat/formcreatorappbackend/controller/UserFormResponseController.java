package com.CtrlAltDefeat.formcreatorappbackend.controller;

import java.util.List;
import java.util.Optional;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormResponse;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserResponsesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/form-responses")
public class UserFormResponseController {
    @Autowired
    private UserElementsRepository userElementsRepository;

    @Autowired
    private UserFormsRepository userFormsRepository;

    @Autowired
    private UserResponsesRepository userResponsesRepository;

    @GetMapping
    public List<UserFormResponse> getAllUserFormResponses(){
        return userResponsesRepository.findAll();
    }

//    // TODO: Revisit, the for-loop might map data incorrectly.
//    @PostMapping("/record/responses/{formId}")
//    public List<UserFormResponse> recordUserFormResponse(@PathVariable Long formId, @RequestBody List<UserFormResponse> responses) {
//
//        // Check if the form exists.
//        if (userFormsRepository.existsById(formId)) {
//
//            // Get the form.
//            var userForm = userFormsRepository.findById(formId).get();
//
//            // Retrieve all of the user form elements.
//            List<UserFormElement> userFormElements = userForm.getUserElements(); // userElementsRepository.findByFormId(formId);
//
//            for (int i = 0; i < responses.size(); i++) {
//
//                var response = responses.get(i);
//                var userFormElement = userFormElements.get(i);
//
//                response.setUserFormElement(userFormElement);
//                response.setKey(userFormElement.getKey());
//                response.setForm(userForm);
////                response.setUserFormSubmission(response.getUserFormSubmission());
//
//                userResponsesRepository.save(response);
//            }
//        }
//
//        return responses;
//    }

}
