package com.CtrlAltDefeat.formcreatorappbackend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "form_submissions")
public class UserFormSubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "submission_id")
    private long submissionId;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    private UserForm form;

    @OneToMany(mappedBy = "userFormSubmission", cascade = CascadeType.ALL)
    private List<UserFormResponse> formResponses;

    public UserFormSubmission() {}

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

    public void setFormResponses (List<UserFormResponse> formResponses) {
        this.formResponses = formResponses;
    }
}
