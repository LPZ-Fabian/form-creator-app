import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import ElementCard from "./ElementCard";
import BuildUserElementService from "../services/BuildUserElementService";
import DefaultFormElementService from "../services/DefaultFormElementService";

const CreateElement = () => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [key, setKey] = useState("");
    const [required, setRequired] = useState(false);
    const navigate = useNavigate();
    const { defaultId } = useParams();
    const { formId } = useParams();
    const [Cards, setCards] = useState([]);
    const [Elements, setElements] = useState([]);
    const parentObj = {
        title: "parentObj",
        type: "check",
        key: "key",
        required: "req",
        hasHidden: "true",
        hiddenById: 0
    }
    const childObj = {
        title: "childObj",
        type: "check",
        key: "key",
        required: "req",
        hiddenById: 1
    }

    const addElementToForm = (e) => {
        e.preventDefault();
        const UserFormElement = { title, type, key, required };

        BuildUserElementService.createUserFormElement(formId, parentObj)
            .then((response) => {
                console.log(response.data);
                // BuildUserElementService.setHiddenTest(response.data.id, true)
                // navigate("/user-form/" + formId);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        // BuildUserElementService.createUserFormElement(formId, parentObj)
        // .then((response) => {
        //     console.log(response.data);
        //     // navigate("/user-form/" + formId);
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
        Elements.push(parentObj);
        Elements.push(childObj);
        console.log(Elements);
        DefaultFormElementService.getDefaultFormElementById(defaultId)
            .then((response) => {
                setType(response.data.type);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const pageTitle = () => {
        let titleType;
        if (defaultId == 1) {
            titleType = "Checkbox";
        } else if (defaultId == 2) {
            titleType = "Text Field";
        } else if (defaultId == 3) {
            titleType = "Text Area";
        } else {
            titleType = "Hidden";
        }
        return titleType;
    };
    const createCard = () => {
        return <ElementCard />;
    };

    return (
        <section id="sectiontest" className="create-element">
            <div className="inner-column">
                <h1 className="overlay-heading">Create New Form Element</h1>
                <div className="overlay">
                    <h2 className="page-title">{pageTitle()}</h2>
                    <form
                        onSubmit={(e) => {
                            addElementToForm(e);
                        }}
                    >
                        <div className="field">
                            <label className="form-label">Title:</label>
                            <input
                                required
                                type="text"
                                name="title"
                                className="form-control"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            ></input>
                        </div>
                        <div className="field">
                            <label className="form-label">Key:</label>
                            <input
                                required
                                type="text"
                                name="key"
                                className="form-control"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                            ></input>
                        </div>
                        <div className="field">
                            <label className="form-label"> Required:</label>
                            <input
                                type="checkbox"
                                name="required"
                                className="form-control"
                                onChange={(e) => setRequired(e.target.checked)}
                            ></input>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="solid-button">
                                Add Element
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setCards([...Cards, <ElementCard />]);
                                }}
                            >
                                T
                            </button>
                            <Link
                                to={"/add-element/" + formId}
                                className="secondary-action"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
                
            </div>
            {Cards}
        </section>
    );
};

export default CreateElement;
