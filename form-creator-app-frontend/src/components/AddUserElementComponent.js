import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom';
import BuildUserElementService from '../services/BuildUserElementService';
import DefaultFormElementService from '../services/DefaultFormElementService'

const AddUserElementComponent = () => {
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [key, setKey] = useState('')
    const [required, setRequired] = useState('')
    const navigate = useNavigate();
    const {defaultId} = useParams();
    const {formId} = useParams();

    const addElementToForm = (e) => {
        e.preventDefault();
        const UserFormElement = {title, type, key,required}

        BuildUserElementService.createUserFormElement(formId,UserFormElement).then((response) =>{
            console.log(response.data)
            navigate('/user-form/' + formId );
            }).catch(error => {
                console.log(error)
            })
        }
    useEffect(() => {
       DefaultFormElementService.getDefaultFormElementById(defaultId).then((response) =>{
            setType(response.data.type)
        }).catch(error =>{
            console.log(error)
        })
    }, [])

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
        return <h2>Create {titleType}</h2>;
    };

return (
    <div>
        <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                {pageTitle()}
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label"> Title: </label>
                                <input
                                    type = "text"
                                    placeholder = "Enter a title"
                                    name = "title"
                                    className = "form-control"
                                    value = {title}
                                    onChange = {(e) => setTitle(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Key: </label>
                                <input
                                    type = "text"
                                    placeholder = "Enter a key"
                                    name = "key"
                                    className = "form-control"
                                    value = {key}
                                    onChange = {(e) => setKey(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Required: </label>
                                <input
                                    type = "text"
                                    placeholder = "Yes/No"
                                    name = "required"
                                    className = "form-control"
                                    value = {required}
                                    onChange = {(e) => setRequired(e.target.value)}
                                >
                                </input>
                            </div>
                            <button className = "btn btn-success" onClick = {(e) => addElementToForm(e) }> Submit </button>
                            <Link to= {"/add-element/" + formId} className="btn btn-danger"> Cancel </Link>

                        </form>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddUserElementComponent