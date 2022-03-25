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

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "forms")
public class UserForm {//extends AuditModel{

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

    /*public UserForm() {}

    public UserForm(long form_id, String title, String description, List<UserFormElement> formElements) {
        this.form_id = form_id;
        this.title = title;
        this.description = description;
        this.formElements = formElements;
    }*/
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
        //UserFormElement e = new UserFormElement("title", "type", "key", "required");
        List<UserFormElement> list = new ArrayList<UserFormElement>();
       // list.add(e);
        //list.add(e);

        return formElements;
    }
    public void setUserElements(List<UserFormElement> formElements){
        this.formElements = formElements;
    }
}
