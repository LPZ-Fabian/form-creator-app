import React, { useState, useEffect } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import { Link, useParams, useNavigate } from "react-router-dom";
import FormSubmissionService from "../services/FormSubmissionService";

const ViewForm = () => {
    const [UserFormElements, setUserFormElements] = useState([]);
    const [UserFormTitle, setUserFormTitle] = useState("");
    const [Responses, setResponses] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getAllUserFormElements();
        getFormTitle();
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
    const createFormSubmission = () => {
        FormSubmissionService.createFormSubmission(id, Responses)
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error)
            })
    };
    const createWebformElements = (element) => {
        const placeHolder = element.title;
        const required = JSON.parse(element.required);
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
                        <form className="form"
                        onSubmit={() => {
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
                                        console.table(Responses);
                                        createFormSubmission();
                                    }
                                }}>
                            {UserFormElements.map((element) =>
                                createWebformElements(element)
                            )}
                            <button
                                type="submit"
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
                                {/* <th>Response #</th> */}
                                {UserFormElements.map((element) => (
                                    <th key={element.id}>{element.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                <tr>
                                    {Responses.map((test) => {
                                        <td>{test.response}</td>;
                                    })}
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewForm;
