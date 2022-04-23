package com.CtrlAltDefeat.formcreatorappbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "user_elements")
public class UserFormElement {// extends AuditModel{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "element_id")
    private Long element_id;

    @Column(name = "title")
    private String title;

    @Column(name = "type")
    private String type;

    @Column(name = "key_name")
    private String key;

    @Column(name = "required")
    private String required;

    @Column(name = "hasHidden")
    private String hasHidden;

    @Column(name = "hiddenById")
    private long hiddenById;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserForm form;

    public UserFormElement() {}

    public Long getId() {
        return element_id;
    }

    public void setId(Long id) {
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

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getRequired() {
        return required;
    }

    public void setRequired(String required) {
        this.required = required;
    }

    public void setForm(UserForm form) {
        this.form = form;
    }

    public UserForm getForm() {
        return form;
    }

    public void setHasHidden(String hasHidden) {
        this.hasHidden = hasHidden;
    }

    public String getHasHidden() {
        return hasHidden;
    }

    public long getHiddenById() {
        return hiddenById;
    }
}
