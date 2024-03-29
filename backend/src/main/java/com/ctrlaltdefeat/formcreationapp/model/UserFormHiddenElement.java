package com.ctrlaltdefeat.formcreationapp.model;

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
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

@Entity
@Table(name = "hidden_elements")
public class UserFormHiddenElement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hidden_id")
    private Long hidden_id;

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
    private UserFormElement hiddenBy;

    public UserFormHiddenElement() {}

    public Long getId() {
        return hidden_id;
    }

    public void setId(Long id) {
        this.hidden_id = id;
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

    public void setHiddenBy(UserFormElement hiddenBy) {
        this.hiddenBy = hiddenBy;
    }
}
