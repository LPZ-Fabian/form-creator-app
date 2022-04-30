package com.CtrlAltDefeat.formcreatorappbackend.model;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

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

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserForm form;

    @OneToMany(mappedBy = "hiddenBy", orphanRemoval = true)
    private List<UserFormHiddenElement> hiddenElementList = new ArrayList<>();

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

    public void setHiddenElementList(List<UserFormHiddenElement> hiddenElementList) {
        this.hiddenElementList = hiddenElementList;
    }

    public List<UserFormHiddenElement> getHiddenElementList() {
        return hiddenElementList;
    }

    public void deleteHiddenElements () {
        hiddenElementList.clear();
    }
}
