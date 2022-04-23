package com.CtrlAltDefeat.formcreatorappbackend.controller;

import java.util.List;
import java.util.Optional;

import com.CtrlAltDefeat.formcreatorappbackend.exception.ResourceNotFoundException;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormHiddenElement;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormHiddenElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormsRepository;

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
        if (userFormsRepository.existsById(formId)) {
            UserForm testForm = new UserForm();
            Optional<UserForm> form = userFormsRepository.findById(formId);
            testForm = form.get();
            element.setForm(testForm);
            testForm.addUserFormElement(element);
            userElementsRepository.save(element);
        }
        if (element.getHiddenElementList() != null) {
        for (int i = 0; i < element.getHiddenElementList().size(); i++) {
            element.getHiddenElementList().get(i).setHiddenBy(element);
            userFormHiddenElementsRepository.save(element.getHiddenElementList().get(i));
        }
        element.setHiddenElementList(element.getHiddenElementList());
        }
        return element;
    }

    // POST method used to update a form element
    @PutMapping("{id}")
    public ResponseEntity<UserFormElement> updateUserFormElement(@PathVariable long id,
            @RequestBody UserFormElement userElementDetails) {
        UserFormElement updateUserElement = userElementsRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User form element does not exist with id:" + id));

        updateUserElement.setTitle(userElementDetails.getTitle());
        // updateUserElement.setType(userElementDetails.getType());
        updateUserElement.setKey(userElementDetails.getKey());
        updateUserElement.setRequired(userElementDetails.getRequired());

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
