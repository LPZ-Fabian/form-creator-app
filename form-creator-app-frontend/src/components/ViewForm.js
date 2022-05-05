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
                getAllFormSubmissions();
                setResponses([]);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const createHidden = (element) => {
        if (element.hiddenElementList === undefined) {
            return;
        }
        return (
            <div
                className="hidden-input hide-input"
                id={"hidden-input" + element.id}
            >
                {element.hiddenElementList.map((hidden) => {
                    return createWebformElements(hidden, "hidden");
                })}
            </div>
        );
    };
    const createWebformElements = (element, name) => {
        const placeHolder = element.title;
        const required = JSON.parse(element.required);
        /* Generate unique id for each input element based on element keyname
         type of element (regular or hidden) and corresponding id. */
        const id = `${element.key}-${name}-${element.id}`;
        if (element.type == "Checkbox") {
            return (
                <div className="inputs" key={element.id}>
                    <label>{element.title}</label>
                    <input
                        id={id}
                        required={required}
                        type="checkbox"
                        onChange={() => {
                            document
                                .getElementById("hidden-input" + element.id)
                                .classList.toggle("hidden-input");
                        }}
                    />
                    {createHidden(element)}
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
    const clearHidden = () => {
        UserFormElements.map((element) => {
            element.hiddenElementList.map((hidden) => {
                if (
                    document.getElementById(
                        `${element.key}-regular-${element.id}`
                    ).checked === false
                ) {
                    document.getElementById(
                        `${hidden.key}-hidden-${hidden.id}`
                    ).required = false;
                }
            });
        });
    };
    const submit = (e) => {
        e.preventDefault();
        const form = document.getElementById("form");
        clearHidden();
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        let resp;
        UserFormElements.map((element) => {
            if (element.type == "Checkbox") {
                resp = document.getElementById(
                    `${element.key}-regular-${element.id}`
                ).checked;
            } else {
                resp = document.getElementById(
                    `${element.key}-regular-${element.id}`
                ).value;
            }
            Responses.push({
                response: resp,
            });
            element.hiddenElementList.map((hidden) => {
                let hiddenResp;
                if (hidden.type == "Checkbox") {
                    hiddenResp = document.getElementById(
                        `${hidden.key}-hidden-${hidden.id}`
                    ).checked;
                } else {
                    hiddenResp = document.getElementById(
                        `${hidden.key}-hidden-${hidden.id}`
                    ).value;
                }
                if (
                    document.getElementById(
                        `${element.key}-regular-${element.id}`
                    ).checked == false
                ) {
                    hiddenResp = "N/A";
                }
                Responses.push({
                    response: hiddenResp,
                });
            });
        });
        createFormSubmission();
        form.submit();
    };
    return (
        <section className="view-form">
            <div className="inner-column">
                <h1 className="overlay-heading">{UserFormTitle}</h1>
                <div className="overlay">
                    <form
                        id="form"
                        className="form-card"
                        // onSubmit={(e) => submit(e)}
                    >
                        <div className="card-inputs">
                            {UserFormElements.map((element) =>
                                createWebformElements(element, "regular")
                            )}
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="solid-button"
                                onClick={(e) => {
                                    submit(e);
                                }}
                            >
                                Submit Response
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ViewForm;
