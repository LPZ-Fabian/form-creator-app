import React, { useState, useEffect } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import FormSubmissionService from "../services/FormSubmissionService";
import { Link, useParams, useNavigate } from "react-router-dom";
//import FormSubmissionService from "../services/FormSubmissionService";

const ViewForm = () => {
    const [UserFormElements, setUserFormElements] = useState([]);
    const [UserFormTitle, setUserFormTitle] = useState("");
    const [Responses, setReponses] = useState([])
    const [Submissions, setSubmissions] = useState([]);
    const { id } = useParams();
    let SubmissionNumber = 0;

    useEffect(() => {
        getAllUserFormElements();
        getFormTitle();
        getAllFormSubmissions();
    }, []);

    const getFormTitle = () => {
        BuildFormService.getUserFormById(id).then((response) => {
            setUserFormTitle(response.data.title);
        });
    };

    const getAllUserFormElements = () => {
        BuildUserElementService.getAllFormElementsByFormId(id)
            .then((response) => {
                setUserFormElements(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            //console.log(UserFormElements)
    };
    const getAllFormSubmissions = () =>{
        FormSubmissionService.getSubmissionsByFormID(id)
            .then((response) => {
                setSubmissions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const createFormSubmission = () => {
        FormSubmissionService.createFormSubmission(id, Responses)
            .then((response) => {
                console.log(response.data);
                getAllFormSubmissions();
                setReponses([]);
                const form = document.getElementById("form");
                form.reset();
            })
            .catch((error) => {
                console.log(error)
            })
    };
    const deleteFormSubmission = (submissionId) =>{
        FormSubmissionService.deleteFormSubmission(submissionId)
            .then((response) => {
                console.log(response.data);
                getAllFormSubmissions();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const incrementCounter = () =>{
        SubmissionNumber++
        //return counter
    }
    const createWebformElements = (element) => {
        const placeHolder = element.title;
        const required = JSON.parse(element.required);
        //console.log(required + " " + element.title)
        const id = element.key;
        if (element.type == "Checkbox") {
            return (
                <div className="inputs">
                    <label>{element.title}</label>
                    <input id={id} required={required} type="checkbox" />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs">
                    <label>{element.title}</label>

                    <input
                        id={id}
                        required={required}
                        placeholder={placeHolder}
                        type="text"
                    />
                </div>
            );
        }
        if (element.type == "Text Area") {
            return (
                <div className="inputs">
                    <label>{element.title}</label>
                    <textarea id={id} required={required} />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs">
                    <label>{element.title}</label>
                    <input id={id} type="text" />
                </div>
            );
        }
    };
    return (
        <div>
            <div className="row top">
                <div className="final-form">
                    <h1 className="overlay-heading">{UserFormTitle}</h1>
                    <div className="preview-container overlay">
                        <form id="form" className="form">
                            {UserFormElements.map((element) =>
                                createWebformElements(element)
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    {
                                        let resp;
                                        UserFormElements.map((element) => {
                                            if (element.type == "Checkbox") {
                                                resp = document.getElementById(
                                                    element.key
                                                ).checked;
                                            } else {
                                                resp = document.getElementById(
                                                    element.key
                                                ).value;
                                            }
                                            Responses.push({
                                            response: resp,
                                            });
                                        });
                                        console.table(Submissions);
                                        createFormSubmission();
                                    }
                                }}
                            >
                                test
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="row bottom">
                <div className="inner column">
                    <h1>{UserFormTitle} Form Responses</h1>
                    <table>
                        <thead>
                            <tr>
    
                                {UserFormElements.map((element) => (
                                    <th key={element.id}>{element.title}</th>
                                ))}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
            
                            {Submissions.map((submission) => (
                                <tr key={submission.id}>
                                
                                
                                {submission.formResponses.map((response) => (
                                    <td key={response.id}>
                                        {response.response}
                                    </td>


                                ))}
                                <button onClick={() => deleteFormSubmission(submission.id)}> Delete</button>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewForm;
