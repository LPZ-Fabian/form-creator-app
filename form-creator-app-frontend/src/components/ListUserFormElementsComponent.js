import React, { useState, useEffect } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import { Link, useParams, useNavigate } from "react-router-dom";

const ListUserFormElementsComponent = () => {
    const [UserFormElements, setUserFormElements] = useState([]);
    const [UserFormTitle, setUserFormTitle] = useState("");
    const [Description, setDescription] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

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
    const submitForm = () => {
        const form = {
            title: UserFormTitle,
            description: Description,
        };
        BuildFormService.updateUserForm(id, form)
            .then((response) => {
                navigate("/manage-forms");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div className="info">
                <input
                    type="text"
                    value={UserFormTitle}
                    onChange={(e) => setUserFormTitle(e.target.value)}
                    className="not-active"
                    id="title"
                ></input>{" "}
                <textarea
                    value={Description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="not-active"
                    id="description"
                ></textarea>{" "}
            </div>
            <Link to={"/add-element/" + id} className="btn btn-primary mb-2">
                {" "}
                Add Element{" "}
            </Link>
            <table className="table table-bordered table-striped">
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
                                    className="btn btn-info"
                                    to={
                                        "/update-form-element/" +
                                        JSON.stringify(form_element.id)
                                    }
                                >
                                    {" "}
                                    Update{" "}
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        deleteUserFormElement(form_element.id)
                                    }
                                    style={{ marginLeft: "10px" }}
                                >
                                    {" "}
                                    Delete{" "}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => submitForm()}>Done</button>
        </div>
    );
};

export default ListUserFormElementsComponent;
