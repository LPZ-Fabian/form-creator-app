import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom';
import AddFormElementService from '../services/AddFormElementService';
import CreateFormService from '../services/CreateFormService';

const CreateFormComponent = () => {
    //const{type} = useParams();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

    const createForm = (e) => {
        e.preventDefault();
        const Form = {title, description}

        CreateFormService.createForm(Form).then((response) =>{
            console.log(response.data)
            navigate('/manage-forms');
    
            }).catch(error => {
                console.log(error)
            })
        }

return (
    <div>
        <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h2> Create Form</h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label"> Form Title: </label>
                                <input
                                    type = "text"
                                    placeholder = "Enter a title for your Form"
                                    name = "title"
                                    className = "form-control"
                                    value = {title}
                                    onChange = {(e) => setTitle(e.target.value)}
                                >
                                </input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label"> Form description: </label>
                                <input
                                    type = "text"
                                    placeholder = "Enter a key"
                                    name = "key"
                                    className = "form-control"
                                    value = {description}
                                    onChange = {(e) => setDescription(e.target.value)}
                                >
                                </input>
                            </div>
                            <button className = "btn btn-success" onClick = {(e) => createForm(e) }> Create </button>
                            <Link to="/user-form" className="btn btn-danger"> Cancel </Link>

                        </form>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateFormComponent