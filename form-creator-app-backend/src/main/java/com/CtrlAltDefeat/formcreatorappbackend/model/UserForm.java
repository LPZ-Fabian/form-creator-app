package com.CtrlAltDefeat.formcreatorappbackend.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "user_forms")
public class UserForm {//extends AuditModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "form",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<UserFormElement> user_elements;

    public UserForm() {}

    public UserForm(long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
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
    public List<UserFormElement> getUserElements(){
        return user_elements;
    }
    public void setUserElements(List<UserFormElement> user_elements){
        this.user_elements = user_elements;

    }
}
