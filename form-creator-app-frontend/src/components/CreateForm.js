import React, { useState, useEffect } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import { Link, useParams, useNavigate } from "react-router-dom";

const CreateForm = () => {
    const [UserFormElements, setUserFormElements] = useState([]);
    const [UserFormTitle, setUserFormTitle] = useState("");
    const [Description, setDescription] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const pathName = window.location.pathname;

    //create const to store title
    useEffect(() => {
        getAllUserFormElements();
        getFormTitleAndDescription();
    }, []);
    const getFormTitleAndDescription = () => {
        BuildFormService.getUserFormById(id).then((response) => {
            setUserFormTitle(response.data.title);
            setDescription(response.data.description);
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
    const deleteUserFormElement = (elementId) => {
        BuildUserElementService.deleteUserFormElement(elementId)
            .then((response) => {
                getAllUserFormElements();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const buttonType = () => {
        if (pathName.includes("/user-form")) {
            return "Create Form";
        } else {
            return "Update Form";
        }
    };
    const submitForm = (redirect) => {
        const form = {
            title: UserFormTitle,
            description: Description,
        };
        BuildFormService.updateUserForm(id, form)
            .then((response) => {
                if (redirect) {
                    navigate("/manage-forms");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const createWebformElements = (element) => {
        if (element.type == "Checkbox") {
            return (
                <div className="inputs">
                    <div>{element.title}</div>
                    <input type="checkbox" />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs">
                    <div>{element.title}</div>
                    <input type="text" />
                </div>
            );
        }
        if (element.type == "Text Area") {
            return (
                <div className="inputs">
                    <div>{element.title}</div>
                    <textarea />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs">
                    <div>{element.title}</div>
                    <input type="text" />
                </div>
            );
        }
    };

    return (
        <div class="row">
          <div class= "column left">
            <div className="inner-column">
                <div className="form-info">
                    <div className="field">
                        <label>Form Name:</label>
                        <input
                            type="text"
                            value={UserFormTitle}
                            onChange={(e) => setUserFormTitle(e.target.value)}
                            className="not-active"
                            id="title"
                        ></input>
                    </div>
                    <div className="field">
                        <label>Description:</label>

                        <textarea
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="not-active"
                            id="description"
                            rows="3"
                        ></textarea>
                    </div>
                    <Link
                        to={"/add-element/" + id}
                        //onClick={() => submitForm(false)}
                        className="solid-button"
                    >
                        + Add Element
                    </Link>
                </div>
              </div>
              <section className="list-form-elements">
                <div className="form-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Key</th>
                                <th>Type</th>
                                <th>Required</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {UserFormElements.map((form_element) => (
                                <tr key={form_element.id}>
                                    <td>{form_element.title}</td>
                                    <td>{form_element.key}</td>
                                    <td>{form_element.type}</td>
                                    <td>{form_element.required}</td>
                                    <td>
                                        <Link
                                            className="primary-action"
                                            to={
                                                "/update-form-element/" +
                                                JSON.stringify(form_element.id)
                                            }
                                            onClick={() => submitForm(false)}
                                        >
                                            Update
                                        </Link>
                                        <button
                                            className="secondary-action"
                                            onClick={() =>
                                                deleteUserFormElement(
                                                    form_element.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="actions">
                        <button
                            className="solid-button"
                            onClick={() => submitForm(true)}
                        >
                            {buttonType()}
                        </button>
                    </div>
                </div>
            </section>
          </div>
          <div class= "column right">
            <div class= "inner-column">
              <div className="preview-table">
                    <h1 className="overlay-heading">{UserFormTitle} Preview</h1>
                    <div className="preview-container overlay">
                        <form id="preview-form">
                            {UserFormElements.map((element) =>
                                createWebformElements(element)
                            )}
                        </form>
                    </div>
              </div>
            </div>
          </div>
        </div>
    );
};

export default CreateForm;
