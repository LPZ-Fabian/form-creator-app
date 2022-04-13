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

@Entity
@Table(name = "user_responses")
public class UserFormResponse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "response_id")
    private long responseId;

    @Column(name = "key_name")
    private String key;

    @Column(name = "response")
    private String response;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserFormSubmission userFormSubmission;

    public long getResponseId() {
        return this.responseId;
    }

    public void setResponseId(long id) {
        this.responseId = id;
    }

    public String getKey() {
        return this.key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getResponse() {
        return this.response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public UserFormSubmission getUserFormSubmission() {
        return userFormSubmission;
    }

    public void setUserFormSubmission(UserFormSubmission userFormSubmission) {
        this.userFormSubmission = userFormSubmission;
    }

}
