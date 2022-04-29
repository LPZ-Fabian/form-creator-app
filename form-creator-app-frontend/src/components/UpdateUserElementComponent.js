import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams, use } from "react-router-dom";
import ElementCard from "./ElementCard";
import BuildUserElementService from "../services/BuildUserElementService";

const UpdateUserElementComponent = () => {
    //const{type} = useParams();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [key, setKey] = useState("");
    const [required, setRequired] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [hiddenElementList, setHiddenElementList] = useState([]);
    const [Cards, setCards] = useState([]);

    const updateHiddenElements = () => {
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

    const UpdateUserFormElement = (e) => {
        e.preventDefault();
        if (checkHiddenCards()) {
        const UserFormElement = {
            title,
            type,
            key,
            required,
            hiddenElementList,
        };
        updateHiddenElements();
        if (id) {
            BuildUserElementService.updateUserFormElement(id, UserFormElement)
                .then((response) => {
                    navigate(-1);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
    };
    useEffect(() => {
        BuildUserElementService.getUserFormElementByID(id)
            .then((response) => {
                setTitle(response.data.title);
                setType(response.data.type);
                setKey(response.data.key);
                setRequired(JSON.parse(response.data.required));
                setHiddenElementList(response.data.hiddenElementList);
            })
            .catch((error) => {
                console.log(error);
            });
        setPageTitle();
    }, []);
    const createHiddenCards = () => {
        console.log(hiddenElementList);
        let tempArray = [];
        hiddenElementList.forEach((element) => {
            tempArray.push([
                ...Cards,
                <ElementCard
                    key={"hidden" + Cards.length + 1}
                    index={Cards.length + 1}
                    element={element}
                />,
            ]);
        });
        setCards(tempArray);
        console.log(Cards);
    };
    const setPageTitle = () => {
        const element = {
            type: type,
            title: title,
        };
        let elementType = element.type;
        return elementType;
    };
    return (
        <section className="update-element">
            <div className="inner-column">
                <h1 className="overlay-heading">Update {setPageTitle()}</h1>
                <div className="overlay">
                    <form
                        className="form-card"
                        onSubmit={(e) => {
                            UpdateUserFormElement(e);
                        }}
                    >
                        <div className="card-inputs">
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
                            <label className="form-label"> Required: </label>
                            <input
                                checked={required}
                                type="checkbox"
                                name="required"
                                className="form-control"
                                onChange={(e) => setRequired(e.target.checked)}
                            ></input>
                        </div>
                        </div>
                        <div className="form-actions">
                            <Link to={-1} className="secondary-action">
                                Cancel
                            </Link>
                            <button type="submit" className="solid-button">
                                Update
                                </button>
                            <button
                                type="button"
                                onClick={() => createHiddenCards()}
                            >
                                View Hidden Elements
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden-container">{Cards}</div>
        </section>
    );
};

export default UpdateUserElementComponent;
