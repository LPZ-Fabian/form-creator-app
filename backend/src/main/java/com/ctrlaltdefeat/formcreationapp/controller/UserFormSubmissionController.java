package com.ctrlaltdefeat.formcreationapp.controller;

import java.util.List;

import com.ctrlaltdefeat.formcreationapp.exception.ResourceNotFoundException;
import com.ctrlaltdefeat.formcreationapp.model.UserFormResponse;
import com.ctrlaltdefeat.formcreationapp.model.UserFormSubmission;
import com.ctrlaltdefeat.formcreationapp.repository.UserFormSubmissionRepository;
import com.ctrlaltdefeat.formcreationapp.repository.UserFormsRepository;
import com.ctrlaltdefeat.formcreationapp.repository.UserResponsesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    private UserFormsRepository userFormsRepository;

    @Autowired
    private UserResponsesRepository userResponsesRepository;

    @Autowired
    private UserFormSubmissionRepository userFormSubmissionRepository;

    @GetMapping
    public List<UserFormSubmission> getAllUserFormResponses() {
        return userFormSubmissionRepository.findAll();
    }

    // TODO: Revisit, the for-loop might map data incorrectly.
    @PostMapping("/record/{formId}")
    public UserFormSubmission recordUserFormResponse(@PathVariable Long formId,
            @RequestBody List<UserFormResponse> responses) {
        UserFormSubmission submission = new UserFormSubmission();
        var form = userFormsRepository.findById(formId).get();
        List<UserFormResponse> formResponses = responses;
        submission.setForm(form);
        userFormSubmissionRepository.save(submission);
        int counter = 0;
        for (int i = 0; i < form.getUserElements().size(); i++) {
            var response = responses.get(counter);
            formResponses.get(counter).setUserFormSubmission(submission);
            formResponses.get(counter).setKey(form.getUserElements().get(i).getKey());
            userResponsesRepository.save(response);
            counter++;
            if (form.getUserElements().get(i).getHiddenElementList().size() != 0) {
                for (int j = 0; j < form.getUserElements().get(i).getHiddenElementList().size(); j++) {
                    formResponses.get(counter).setUserFormSubmission(submission);
                    formResponses.get(counter).setKey(form.getUserElements()
                            .get(i).getHiddenElementList().get(j).getKey());
                    userResponsesRepository.save(responses.get(counter));
                    counter++;
                }
            }
        }
        submission.setFormResponses(formResponses);
        return submission;
    }

    // Create a GET request method to retrieve a submission by ID.
    @GetMapping("/retrieve/{submissionId}")
    public ResponseEntity<UserFormSubmission> getUserFormSubmissionById(@PathVariable Long submissionId) {
        UserFormSubmission submission = userFormSubmissionRepository.findById(submissionId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("User submission does not exist with id: " + submissionId));

        return ResponseEntity.ok(submission);
    }

    // Create a GET request method to retrieve all submissions by form ID.
    @GetMapping("/retrieve/form/{formId}")
    public ResponseEntity<List<UserFormSubmission>> getUserFormSubmissionsByFormId(@PathVariable Long formId) {
        List<UserFormSubmission> submissions;

        if (userFormsRepository.existsById(formId)) {
            submissions = userFormSubmissionRepository.findByFormId(formId);
        } else {
            throw new ResourceNotFoundException("User form does not exist with id:" + formId);
        }

        return ResponseEntity.ok(submissions);
    }

    // Create a DELETE request method to delete a submission by ID.
    @DeleteMapping("/delete/{submissionId}")
    public ResponseEntity<HttpStatus> deleteSubmissionById(@PathVariable Long submissionId) {

        if (userFormSubmissionRepository.existsById(submissionId)) {
            userFormSubmissionRepository.deleteById(submissionId);
        } else {
            throw new ResourceNotFoundException("User submission does not exist with id:" + submissionId);
        }

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
