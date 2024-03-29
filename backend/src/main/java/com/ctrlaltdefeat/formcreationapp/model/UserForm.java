package com.ctrlaltdefeat.formcreationapp.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "forms")
public class UserForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL)
    private List<UserFormElement> formElements;

    @OneToMany(mappedBy = "form", cascade = CascadeType.ALL)
    private List<UserFormSubmission> userFormSubmissions;

    public UserForm() {
    }

    public UserForm(long id, String title, String description, List<UserFormElement> formElements) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.formElements = formElements;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<UserFormElement> getUserElements() {
        return formElements;
    }

    public void setUserElements(List<UserFormElement> formElements) {
        this.formElements = formElements;
    }

    public void addUserFormElement(UserFormElement element) {
        formElements.add(element);
    }

    public List<UserFormSubmission> getUserFormSubmissions() {
        return userFormSubmissions;
    }

    public void setUserFormSubmissions(List<UserFormSubmission> userFormSubmissions) {
        this.userFormSubmissions = userFormSubmissions;
    }

    public void addUserFormSubmission(UserFormSubmission userFormSubmission) {
        userFormSubmissions.add(userFormSubmission);
    }
}
