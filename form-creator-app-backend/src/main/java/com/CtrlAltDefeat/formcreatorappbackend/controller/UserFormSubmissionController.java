package com.CtrlAltDefeat.formcreatorappbackend.controller;

import java.util.List;
import java.util.Optional;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormResponse;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormSubmission;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormSubmissionRepository;
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
@RequestMapping("/api/v1/form-submissions")
public class UserFormSubmissionController {
    @Autowired
    private UserElementsRepository userElementsRepository;

    @Autowired
    private UserFormsRepository userFormsRepository;

    @Autowired
    private UserResponsesRepository userResponsesRepository;

    @Autowired
    private UserFormSubmissionRepository userFormSubmissionRepository;

    @GetMapping
    public List<UserFormResponse> getAllUserFormResponses(){
        return userResponsesRepository.findAll();
    }

    // TODO: Revisit, the for-loop might map data incorrectly.
    @PostMapping("/record/{formId}")
    public UserFormSubmission recordUserFormResponse(@PathVariable Long formId, @RequestBody List<UserFormResponse> responses) {
        UserFormSubmission submission = new UserFormSubmission();
        var form = userFormsRepository.findById(formId).get();
        List<UserFormResponse> formResponses = responses;
        submission.setForm(form);
        userFormSubmissionRepository.save(submission);
        for (int i = 0; i < formResponses.size(); i++) {
                var response = responses.get(i);
                formResponses.get(i).setUserFormSubmission(submission);
                formResponses.get(i).setKey(form.getUserElements().get(i).getKey());
                userResponsesRepository.save(response);
            }
        submission.setFormResponses(formResponses);
        return submission;
    }
}
