import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom';
import AddFormElementService from '../services/AddFormElementService';
import BuildUserFormService from '../services/BuildUserFormService'

const AddUserElementComponent = () => {
    //const{type} = useParams();
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [key, setKey] = useState('')
    const [required, setRequired] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

    const addElementToForm = (e) => {
        e.preventDefault();
        const UserFormElement = {title, type, key,required}

        BuildUserFormService.createUserFormElement(UserFormElement).then((response) =>{
            console.log(response.data)
            navigate('/user-form');
    
            }).catch(error => {
                console.log(error)
            })
        }
    useEffect(() => {
        AddFormElementService.getDefaultFormElementById(id).then((response) =>{
            setType(response.data.type)
        }).catch(error =>{
            console.log(error)
        })
    }, [])

return (
    <div>
        <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h2> Create Element</h2>
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
                            <Link to="/add-element" className="btn btn-danger"> Cancel </Link>

                        </form>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddUserElementComponent