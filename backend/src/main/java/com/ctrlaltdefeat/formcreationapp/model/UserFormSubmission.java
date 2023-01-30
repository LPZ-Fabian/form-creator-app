package com.ctrlaltdefeat.formcreationapp.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "form_submissions")
public class UserFormSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submission_id")
    private Long submissionId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserForm form;

    @OneToMany(mappedBy = "userFormSubmission", cascade = CascadeType.ALL)
    private List<UserFormResponse> formResponses;

    public UserFormSubmission() {
    }

    public Long getId() {
        return submissionId;
    }

    public void setId(Long id) {
        this.submissionId = id;
    }

    public UserForm getForm() {
        return this.form;
    }

    public void setForm(UserForm form) {
        this.form = form;
    }

    public List<UserFormResponse> getFormResponses() {
        return formResponses;
    }

    public void setFormResponses(List<UserFormResponse> formResponses) {
        this.formResponses = formResponses;
    }
}
