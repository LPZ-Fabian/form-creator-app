import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom';
import BuildFormService from '../services/BuildFormService';

const CreateFormComponent = () => {
    //const{type} = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    const { formId } = useParams();
    const pathName = window.location.pathname;

    const createOrUpdateForm = (e) => {
        e.preventDefault();
        const form = { 
            title: title,
            description: description,
        };
        if (pathName.includes("/build-form")) {
            BuildFormService.createForm(form)
                .then((response) => {
                    console.log(response.data);
                    navigate("/user-form/" + response.data.id);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            BuildFormService.updateForm(formId, form).then((response) => {
                navigate("/manage")
            }).catch(error => {
                console.log(error)
            })
        }
    };

    useEffect(() => {

    });

    const pageTitle = () => {
        if (pathName.includes("/build-form")) {
            return <h2>Create Form</h2>
        } else {
            BuildFormService.getFormById(formId).then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description);
            }).catch(error => {
                console.log(error)
            })
            return <h2>Update Form</h2>
        }
    }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {pageTitle()}
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        {" "}
                                        Title:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter a title"
                                        name="title"
                                        className="form-control"
                                        value={title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    ></input>
                                </div>
                                <div className="form-group mb-2">
                                    <label className="form-label">
                                        {" "}
                                        Description:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter a Description"
                                        name="description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></input>
                                </div>
                                <button
                                    className="btn btn-success"
                                    onClick={(e) => createOrUpdateForm(e)}
                                >
                                    {" "}
                                    Create{" "}
                                </button>
                                <Link to="/manage-forms" className="btn btn-danger">
                                    {" "}
                                    Cancel{" "}
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateFormComponent