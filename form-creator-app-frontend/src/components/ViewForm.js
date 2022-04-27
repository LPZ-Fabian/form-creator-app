import React, { useState, useEffect } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import FormSubmissionService from "../services/FormSubmissionService";
import { Link, useParams, useNavigate } from "react-router-dom";
//import FormSubmissionService from "../services/FormSubmissionService";

const ViewForm = () => {
    const [UserFormElements, setUserFormElements] = useState([]);
    const [UserFormTitle, setUserFormTitle] = useState("");
    const [Responses, setResponses] = useState([]);
    const [Submissions, setSubmissions] = useState([]);
    const { id } = useParams();

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
    const getAllFormSubmissions = () => {
        FormSubmissionService.getSubmissionsByFormID(id)
            .then((response) => {
                setSubmissions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const createFormSubmission = () => {
        FormSubmissionService.createFormSubmission(id, Responses)
            .then((response) => {
                console.log(response.data);
                getAllFormSubmissions();
                setResponses([]);
                const form = document.getElementById("form");
                form.reset();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const deleteFormSubmission = (submissionId) => {
        FormSubmissionService.deleteFormSubmission(submissionId)
            .then((response) => {
                console.log(response.data);
                getAllFormSubmissions();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const createWebformElements = (element) => {
        const placeHolder = element.title;
        const required = JSON.parse(element.required);
        const id = element.key;
        if (element.type == "Checkbox") {
            return (
                <div className="inputs" key={element.id}>
                    <label>{element.title}</label>
                    <input id={id} required={required} type="checkbox" />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs" key={element.id}>
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
                <div className="inputs" key={element.id}>
                    <label>{element.title}</label>
                    <textarea id={id} required={required} />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs" key={element.id}>
                    <label>{element.title}</label>
                    <input id={id} type="text" />
                </div>
            );
        }
    };
    const submit = (e) => {
        e.preventDefault();
        let resp;
        UserFormElements.map((element) => {
            if (element.type == "Checkbox") {
                resp = document.getElementById(element.key).checked;
            } else {
                resp = document.getElementById(element.key).value;
            }
            Responses.push({
                response: resp,
            });
        });
        console.table(Submissions);
        createFormSubmission();
    };
    return (
        <div className="row display-form">
                <div className="final-form">
                    <h1 className="overlay-heading">{UserFormTitle}</h1>
                    <div className="preview-container overlay">
                        <form
                            id="form"
                            className="form"
                            onSubmit={(e) => submit(e)}
                        >
                            {UserFormElements.map((element) =>
                                createWebformElements(element)
                            )}
                            <button className="solid-button">Submit Response</button>
                        </form>
                    </div>
                </div>
        </div>
    );
};

export default ViewForm;
