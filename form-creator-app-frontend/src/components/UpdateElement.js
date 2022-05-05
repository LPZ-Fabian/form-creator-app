import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams, use } from "react-router-dom";
import ElementCard from "./ElementCard";
import BuildUserElementService from "../services/BuildUserElementService";

const UpdateElement = () => {
    //const{type} = useParams();
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [key, setKey] = useState("");
    const [required, setRequired] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [hiddenElementList, setHiddenElementList] = useState([]);
    const [Cards, setCards] = useState([]);

    useEffect(() => {
        BuildUserElementService.getUserFormElementByID(id)
            .then((response) => {
                setTitle(response.data.title);
                setType(response.data.type);
                setKey(response.data.key);
                setRequired(JSON.parse(response.data.required));
                setHiddenElementList(response.data.hiddenElementList);
                createCurrentHiddenCards(response.data.hiddenElementList);
                initialStyling(response.data.type);
            })
            .catch((error) => {
                console.log(error);
            });
        setPageTitle();
    }, []);

    const initialStyling = (type) => {
        if (document.querySelectorAll(".hidden-cards").length == 0) {
            document.querySelector(".overall-hidden").style.display = "none";
        }
        if (type.toLowerCase() === "checkbox") {
            document.getElementById("checkbox-field").classList.add("hide");
        } else {
            document.querySelector(".add-hidden").classList.add("hide");
        }
    };
    const updateHiddenElements = () => {
        const titles = document.querySelectorAll(".element-title");
        const types = document.querySelectorAll(".card-title");
        const keys = document.querySelectorAll(".element-key");
        const reqs = document.querySelectorAll(".element-req");
        for (let i = 0; i < titles.length; i++) {
            const title = titles[i].value;
            const type = types[i].textContent;
            const key = keys[i].value;
            const required = reqs[i].checked;
            const hiddenElement = {
                title,
                type,
                key,
                required,
            };
            hiddenElementList.push(hiddenElement);
        }
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
    const clearArray = () => {
        setHiddenElementList([]);
    };

    const UpdateUserFormElement = (e) => {
        e.preventDefault();
        if (checkHiddenCards()) {
            clearArray();
            console.table(hiddenElementList);
            updateHiddenElements();
            const UserFormElement = {
                title,
                type,
                key,
                required,
                hiddenElementList,
            };
            if (id) {
                BuildUserElementService.updateUserFormElement(
                    id,
                    UserFormElement
                )
                    .then((response) => {
                        navigate(-1);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };
    const createCurrentHiddenCards = (list) => {
        if (Cards.length === 0) {
            let tempArray = [];
            list.forEach((element) => {
                tempArray.push([
                    ...Cards,
                    <ElementCard
                        key={"hidden" + element.id}
                        index={element.id}
                        element={element}
                    />,
                ]);
            });
            setCards(tempArray);
            setHiddenElementList([]);
        }
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
            <div className="card-container">
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
                            <div id="checkbox-field" className="field">
                                <label className="form-label">
                                    {" "}
                                    Required:{" "}
                                </label>
                                <input
                                    checked={required}
                                    type="checkbox"
                                    name="required"
                                    className="form-control"
                                    onChange={(e) =>
                                        setRequired(e.target.checked)
                                    }
                                ></input>
                            </div>
                        </div>
                        <div className="form-actions">
                            <button
                                type="button"
                                className="secondary-button add-hidden"
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
                                Add New Hidden Element
                            </button>
                            <div className="form-buttons">
                                <button type="submit" className="solid-button">
                                    Update
                                </button>
                                <Link to={-1} className="secondary-action">
                                    Cancel
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="overall-hidden">
                <div className="hidden-container">{Cards}</div>
            </div>
        </section>
    );
};

export default UpdateElement;
