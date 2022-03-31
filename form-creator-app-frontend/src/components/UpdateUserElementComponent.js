import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams,use} from 'react-router-dom';
//import AddDefaultFormElementService from '../services/AddDefaultFormElementService';
import BuildUserElementService from '../services/BuildUserElementService'

const UpdateUserElementComponent = () => {
    //const{type} = useParams();
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [key, setKey] = useState('')
    const [required, setRequired] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();


    const UpdateUserFormElement = (e) => {
        e.preventDefault();
        const UserFormElement = {title, type, key,required}

        if(id){
            BuildUserElementService.updateUserFormElement(id, UserFormElement).then((response) =>{
                navigate(-1)
            }).catch(error =>{
                console.log(error)
            })
        }
    }
    useEffect(() => {
        BuildUserElementService.getUserFormElementByID(id).then((response) =>{
            setTitle(response.data.title)
            setType(response.data.type)
            setKey(response.data.key)
            setRequired(response.data.required)
        }).catch(error =>{
            console.log(error)
        })
    }, [])

  return (
    <div>
        <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                <h2> Update Form Element</h2>
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
                            <button className = "btn btn-success" onClick = {(e) => UpdateUserFormElement(e) }> Update </button>
                            <Link to={-1} className="btn btn-danger"> Cancel </Link>
                        </form>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default UpdateUserElementComponent