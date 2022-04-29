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
    const [hiddenElementList, setHiddenElementList] = useState([]);

    const addHiddenElements = () => {
        const titles = document.querySelectorAll(".element-title");
        const types = document.querySelectorAll(".element-type");
        const keys = document.querySelectorAll(".element-key");
        const reqs = document.querySelectorAll(".element-req");
        for (let i = 0; i < titles.length; i++) {
            const title = titles[i].value;
            const type = types[i].value;
            const key = keys[i].value;
            const required = reqs[i].checked;
            const hiddenElement = {
                title,
                type,
                key,
                required,
            };
            console.log(hiddenElement);
            hiddenElementList.push(hiddenElement);
        }
        console.table(hiddenElementList);
    };

    const checkHiddenCards = () => {
        let valid = true;
        const hiddenCards = document.querySelectorAll(".hidden-cards");
        hiddenCards.forEach((card) => {
            if (!card.checkValidity()) {
                card.reportValidity();
                valid = false;
            }
        });
        return valid;
    };

    const addElementToForm = (e) => {
        e.preventDefault();
        if (checkHiddenCards()) {
            const UserFormElement = {
                title,
                type,
                key,
                required,
                hiddenElementList,
            };
            addHiddenElements();
            BuildUserElementService.createUserFormElement(
                formId,
                UserFormElement
            )
                .then((response) => {
                    console.log(response.data);
                    navigate("/user-form/" + formId);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    useEffect(() => {
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
                            <Link
                                to={"/add-element/" + formId}
                                className="secondary-action"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                    <button
                        type="button"
                        className="solid-button"
                        onClick={() => {
                            setCards([
                                ...Cards,
                                <ElementCard
                                    key={"hidden" + Cards.length + 1}
                                    index={Cards.length + 1}
                                />,
                            ]);
                        }}
                    >
                        Add Hidden Element
                    </button>
                </div>
            </div>
            <div className="hidden-container">{Cards}</div>
        </section>
    );
};

export default CreateElement;
