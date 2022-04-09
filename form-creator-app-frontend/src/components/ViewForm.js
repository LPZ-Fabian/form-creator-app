import React, { useState, useEffect } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import { Link, useParams, useNavigate } from "react-router-dom";

const ViewForm = () => {
    const [UserFormElements, setUserFormElements] = useState([]);
    const [UserFormTitle, setUserFormTitle] = useState("");
    const [Description, setDescription] = useState("");
    const { id } = useParams();

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
    const createWebformElements = (element) => {
        const placeHolder = element.title;
        const required = element.required.toLowerCase() == "yes" ? true : false;
        const name = element.key;
        if (element.type == "Checkbox") {
            return (
                <div className="inputs">
                    <label>{element.title}</label>
                    <input name={name} required={required} type="checkbox" />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs">
                    <label>{element.title}</label>

                    <input
                        name={name}
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
                    <textarea name={name} required={required} />
                </div>
            );
        }
        if (element.type == "Text Field") {
            return (
                <div className="inputs">
                    <label>{element.title}</label>
                    <input name={name} type="text" />
                </div>
            );
        }
    };
    return (
        <div className="final-form">
            <h1 className="overlay-heading">{UserFormTitle}</h1>
            <div className="preview-container overlay">
                <form className="form">
                    {UserFormElements.map((element) =>
                        createWebformElements(element)
                    )}
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    );
};

export default ViewForm;
