import React, { useState, useEffect, Fragment } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import FormSubmissionService from "../services/FormSubmissionService";
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
        //  getAllFormSubmissions();
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
        BuildUserElementService.deleteUserFormElement(elementId).then(
            (response) => {
                getAllUserFormElements();
                getFormTitleAndDescription();
            },
            []
        );
        const getFormTitleAndDescription = () => {
            BuildFormService.getUserFormById(id)
                .then((response) => {
                    setUserFormTitle(response.data.title);
                    setDescription(response.data.description);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
    };
    const buttonType = () => {
        if (pathName.includes("/user-form")) {
            return "Create Form";
        } else {
            return "Update Form";
        }
    };
    const updateForm = (redirect) => {
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
    const createWebformElements = (element) => {
        if (element.type == "Checkbox") {
            return (
                <div className="field" key={element.id}>
                    <label>{element.title}</label>
                    <input
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
                <div className="field" key={element.id}>
                    <label>{element.title}</label>
                    <input placeholder={element.title} type="text" />
                </div>
            );
        }
        if (element.type == "Text Area") {
            return (
                <div className="field" key={element.id}>
                    <label>{element.title}</label>
                    <textarea placeholder={element.title} />
                </div>
            );
        }
    };

    return (
        <section className="container">
            <div className="form-builder">
                <div className="inner-column">
                    <div className="entire-form">
                        <div className="form-info">
                            <div className="field">
                                <label>Form Name:</label>
                                <input
                                    type="text"
                                    value={UserFormTitle}
                                    onChange={(e) =>
                                        setUserFormTitle(e.target.value)
                                    }
                                    className="not-active"
                                    id="title"
                                ></input>
                            </div>
                            <div className="field">
                                <label>Description:</label>
                                <textarea
                                    value={Description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="not-active"
                                    id="description"
                                    rows="3"
                                ></textarea>
                            </div>
                            <Link
                                to={"/add-element/" + id}
                                className="solid-button"
                                onClick={() => updateForm(false)}
                            >
                                + Add Element
                            </Link>
                        </div>
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
                                    {UserFormElements.map((element) => {
                                        return (
                                            <Fragment>
                                                <tr key={element.id}>
                                                    <td>{element.title}</td>
                                                    <td>{element.key}</td>
                                                    <td>{element.type}</td>
                                                    <td>{element.required}</td>
                                                    <td>
                                                        <Link
                                                            className="secondary-button"
                                                            to={
                                                                "/update-form-element/" +
                                                                JSON.stringify(
                                                                    element.id
                                                                )
                                                            }
                                                            onClick={() =>
                                                                updateForm(
                                                                    false
                                                                )
                                                            }
                                                        >
                                                            Update
                                                        </Link>
                                                        <button
                                                            className="danger-button"
                                                            onClick={() =>
                                                                deleteUserFormElement(
                                                                    element.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                                <Fragment>
                                                    {element.hiddenElementList.map(
                                                        (hidden) => {
                                                            return (
                                                                <tr
                                                                    key={
                                                                        hidden.id
                                                                    }
                                                                    className="hidden-row"
                                                                >
                                                                    <td>
                                                                        {
                                                                            hidden.title
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            hidden.key
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            hidden.type
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            hidden.required
                                                                        }
                                                                    </td>
                                                                    <td></td>
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </Fragment>
                                            </Fragment>
                                        );
                                    })}
                                    <tr>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="actions">
                                <button
                                    className="solid-button"
                                    onClick={() => updateForm(true)}
                                >
                                    {buttonType()}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="preview-table">
                <div className="inner-column">
                    <h2 className="overlay-heading">{UserFormTitle} Preview</h2>
                    <div className="preview-container overlay">
                        <form className="form">
                            {UserFormElements.map((element) =>
                                createWebformElements(element)
                            )}
                            <button type="button" className="solid-button">
                                Submit Response
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CreateForm;
