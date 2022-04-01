import React, { useState, useEffect } from "react";
import DefaultFormElementService from "../services/DefaultFormElementService";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ListDefaultFormElementsComponent = () => {
    const navigate = useNavigate();
    const [DefaultFormElements, setDefaultFormElements] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        DefaultFormElementService.getAllDefaultFormElements()
            .then((response) => {
                setDefaultFormElements(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <h2 className="text-center"> Select an Element to Add </h2>
            <Link to={"/user-form/" + id} className="btn btn-primary mb-2 sm">
                {" "}
                Done{" "}
            </Link>

            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {DefaultFormElements.map((default_form_element) => (
                        <tr key={default_form_element.id}>
                            <td>{default_form_element.type}</td>
                            <td>
                                <Link
                                    className="btn btn-primary mb-2 sm"
                                    to={
                                        "/build-element/" +
                                        JSON.stringify(
                                            default_form_element.id
                                        ) +
                                        "/" +
                                        id
                                    }
                                >
                                    {" "}
                                    Add{" "}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListDefaultFormElementsComponent;
