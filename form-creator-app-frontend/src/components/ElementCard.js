import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import BuildUserElementService from "../services/BuildUserElementService";
import DefaultFormElementService from "../services/DefaultFormElementService";

const ElementCard = (index, element) => {
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [key, setKey] = useState("");
    const [required, setRequired] = useState(false);
    const [cardTitle, setCardTitle] = useState("Element");
    const pathName = window.location.pathname;

    useEffect(() => {
        console.log(index);
        try{
            setTitle(index.element.title);
            setCardTitle(index.element.type)
            setType(index.element.type);
            setKey(index.element.key);
            setRequired(JSON.parse(index.element.required));
            getTitle()
        } catch (e) {}
    }, []);
    const getTitleText = () => {
        if (document.getElementById("type-drop" + index.index).value !== null) {
            setCardTitle(
                document.getElementById("type-drop" + index.index).value
            );
        }
    };
    const getTitle = () => {
        if (pathName.includes("/update")) {
            const updateCards = document.querySelectorAll(".dropdown-title")
            updateCards.forEach((card) => {
                card.hidden = true;
            })
            const types = document.querySelectorAll(".element-type") 
            types.forEach((type) => {
                type.required = false; 
            })
        }
    }

    return (
        <div className="card-container" id={index.index}>
            <h1 className="overlay-heading">Create New Hidden Form Element</h1>
            <div className="overlay">
                <h2 className="page-title element-title">{cardTitle}</h2>
                <form className="hidden-cards">
                    <div className="field dropdown-title">
                        <label>Please pick an element type</label>
                        <select
                            onChange={() => getTitleText()}
                            className="element-type"
                            id={"type-drop" + index.index}
                            required
                            name="element-type"
                        >
                            <option value={""}>--Please pick a type--</option>
                            <option value={"Checkbox"}>Checkbox</option>
                            <option value={"Text Field"}>Text Field</option>
                            <option value={"Text Area"}>Text Area</option>
                        </select>
                    </div>
                    <div className="field">
                        <label className="form-label">Title:</label>
                        <input
                            required
                            type="text"
                            name="title"
                            className="form-control element-title"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div className="field">
                        <label className="form-label">Key:</label>
                        <input
                            required
                            type="text"
                            name="key"
                            className="form-control element-key"
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                        ></input>
                    </div>
                    <div className="field">
                        <label className="form-label"> Required:</label>
                        <input
                        checked={required}
                            type="checkbox"
                            name="required"
                            className="form-control element-req"
                            onChange={(e) => setRequired(e.target.checked)}
                        ></input>
                    </div>
                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={() => {
                                document
                                    .querySelector(".hidden-container")
                                    .removeChild(
                                        document.getElementById(index.index)
                                    );
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ElementCard;
