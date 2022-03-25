package com.CtrlAltDefeat.formcreatorappbackend.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "user_elements")
public class UserFormElement {//extends AuditModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "element_id")
    private long element_id;

    @Column(name = "title")
    private String title;

    @Column(name = "type")
    private String type;

    @Column(name = "key_name")
    private String key;

    @Column(name = "required")
    private String required;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserForm form;
    //@JoinColumn(name = "user_form_id")
    //@JsonIgnoreProperties("user_elements")
    //@ManyToOne(fetch = FetchType.LAZY, optional = false)
    //@JoinColumn(name = "tutorial_id", nullable = false)
    //@OnDelete(action = OnDeleteAction.CASCADE)
    //@JsonIgnore
    //private UserForm form;

    public UserFormElement() {}

    public UserFormElement(long id, String title, String type, String key, String required, UserForm form) {
        this.element_id = id;
        this.title = title;
        this.type = type;
        this.key = key;
        this.required = required;
        this.form = form;
    }
    public long getId() {
        return element_id;
    }
    public void setId(long id) {
        this.element_id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getType() {
        return type;
    }
    public void setType(String type) {
        this.type = type;
    }
    public String getKey(){
        return key;
    }
    public void setKey(String key){
        this.key = key;
    }
    public String getRequired(){
        return required;
    }
    public void setRequired(String required){
        this.required = required;
    }
    /*
    public void setForm(UserForm form ){
        this.form = form;
    }
    public UserForm getForm(){
        return form;
    }*/
}
