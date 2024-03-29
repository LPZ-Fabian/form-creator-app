package com.ctrlaltdefeat.formcreationapp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.ctrlaltdefeat.formcreationapp.exception.ResourceNotFoundException;
import com.ctrlaltdefeat.formcreationapp.model.UserForm;
import com.ctrlaltdefeat.formcreationapp.model.UserFormElement;
import com.ctrlaltdefeat.formcreationapp.model.UserFormHiddenElement;
import com.ctrlaltdefeat.formcreationapp.repository.UserElementsRepository;
import com.ctrlaltdefeat.formcreationapp.repository.UserFormHiddenElementsRepository;
import com.ctrlaltdefeat.formcreationapp.repository.UserFormsRepository;

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

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/form-elements")
public class UserFormElementController {
    @Autowired
    private UserElementsRepository userElementsRepository;

    @Autowired
    private UserFormsRepository userFormsRepository;

    @Autowired
    private UserFormHiddenElementsRepository userFormHiddenElementsRepository;

    // GET method to return all user form elements
    @GetMapping
    public List<UserFormElement> getAllUserFormElements() {
        return userElementsRepository.findAll();
    }

    // GET method used to return default form element type and map to user form
    // element
    @GetMapping("{id}")
    public ResponseEntity<UserFormElement> getDefaultFormElementById(@PathVariable long id) {
        UserFormElement element = userElementsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id: " + id));
        return ResponseEntity.ok(element);
    }

    // GET method used to return all the elements contained within a form
    @GetMapping("/form/{formId}")
    public ResponseEntity<List<UserFormElement>> getAllFormElementsByFormId(@PathVariable long formId) {
        if (!userFormsRepository.existsById(formId)) {
            throw new ResourceNotFoundException("Form not found with id: " + formId);
        }
        List<UserFormElement> elements = userElementsRepository.findByFormId(formId);
        return ResponseEntity.ok(elements);
    }

    // POST method used to create a new user element
    @PostMapping("/create/{formId}")
    public UserFormElement createUserFormElement(@PathVariable Long formId, @RequestBody UserFormElement element) {
        List<UserFormHiddenElement> hiddenElementList = element.getHiddenElementList();
        List<UserFormHiddenElement> tempList = new ArrayList<>();
         if (userFormsRepository.existsById(formId)) {
            UserForm testForm = new UserForm();
            Optional<UserForm> form = userFormsRepository.findById(formId);
            testForm = form.get();
            element.setForm(testForm);
            testForm.addUserFormElement(element);
            userElementsRepository.save(element);
        }
        if (hiddenElementList != null) {
            for (int i = 0; i < hiddenElementList.size(); i++) {
                element.getHiddenElementList().get(i).setHiddenBy(element);
                userFormHiddenElementsRepository.save(element.getHiddenElementList().get(i));
            }
            userElementsRepository.save(element);
        }
        return element;
    }

    // PUT method used to update a form element
    @PutMapping("{id}")
    public ResponseEntity<UserFormElement> updateUserFormElement(@PathVariable long id,
            @RequestBody UserFormElement userElementDetails) {
        UserFormElement updateUserElement = userElementsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id:" + id));
        updateUserElement.setTitle(userElementDetails.getTitle());
        updateUserElement.setKey(userElementDetails.getKey());
        updateUserElement.setRequired(userElementDetails.getRequired());

        List<UserFormHiddenElement> hiddenElements = userElementDetails.getHiddenElementList();
        List<UserFormHiddenElement> existingHiddenElements = updateUserElement.getHiddenElementList();

        for (UserFormHiddenElement hiddenElement : existingHiddenElements) {
            UserFormHiddenElement test = userFormHiddenElementsRepository.findById(hiddenElement.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id: " + hiddenElement.getId()));
            userFormHiddenElementsRepository.delete(test);
        }
        updateUserElement.deleteHiddenElements();
        userElementsRepository.save(updateUserElement);
        for (UserFormHiddenElement hiddenElement : hiddenElements) {
                updateUserElement.getHiddenElementList().add(hiddenElement);
                hiddenElement.setHiddenBy(updateUserElement);
                userFormHiddenElementsRepository.save(hiddenElement);
        }
//        updateUserElement.setHiddenElementList(userElementDetails.getHiddenElementList());
        userElementsRepository.save(updateUserElement);
        return ResponseEntity.ok(updateUserElement);
    }

    // DELETE method used to delete a user element
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteUserFormElement(@PathVariable long id) {
        UserFormElement element = userElementsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id: " + id));
        userElementsRepository.delete(element);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
