package com.CtrlAltDefeat.formcreatorappbackend.service;

import com.CtrlAltDefeat.formcreatorappbackend.model.UserForm;
import com.CtrlAltDefeat.formcreatorappbackend.model.UserFormElement;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserElementsRepository;
import com.CtrlAltDefeat.formcreatorappbackend.repository.UserFormsRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserFormService {
    private UserFormsRepository userFormsRepository;

    private UserElementsRepository userElementsRepository;

    public UserFormService(UserFormsRepository userFormsRepository, UserElementsRepository userElementsRepository) {

        this.userFormsRepository = userFormsRepository;

        this.userElementsRepository = userElementsRepository;

    }


    /**
     * Create a new UserForm along with users
     */

    public ResponseEntity<Object> createUserForm(UserForm form) {
        UserForm newUserForm = new UserForm();
        newUserForm.setTitle(form.getTitle());
        newUserForm.setDescription(form.getDescription());
        newUserForm.setUserElements(form.getUserElements());
        UserForm savedUserForm = userFormsRepository.save(newUserForm);

        for(int i=0; i < form.getUserElements().size(); i++){ 
            UserFormElement savedUserFormElement = userElementsRepository.save(form.getUserElements().get(i)); 
            if(!userFormsRepository.findById(savedUserFormElement.getId()).isPresent())  
                return ResponseEntity.unprocessableEntity().body("Failed creating user and roles" + form.getUserElements().size() + form.getUserElements().get(0));
        } 

        //newUserForm.setUserElements(form.getUserElements());
       // UserForm savedUserForm = userFormsRepository.save(newUserForm);
        if (userFormsRepository.findById(savedUserForm.getId()).isPresent()) {
            return ResponseEntity.accepted().body("Successfully Created UserForm and Users");
        } else
            return ResponseEntity.unprocessableEntity().body("Failed to Create specified UserForm");
        
        }
    /**

     * Delete a specified UserForm given the id
     */

    public ResponseEntity<Object> deleteUserForm(Long id) {
        if (userFormsRepository.findById(id).isPresent()) {
            userFormsRepository.deleteById(id);
            if (userFormsRepository.findById(id).isPresent()) {
                return ResponseEntity.unprocessableEntity().body("Failed to delete the specified record");
            } else return ResponseEntity.ok().body("Successfully deleted specified record");
        } else
            return ResponseEntity.unprocessableEntity().body("No Records Found");
    }
}
