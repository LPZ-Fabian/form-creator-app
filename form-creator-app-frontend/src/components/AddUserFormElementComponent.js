import React, {useState, useEffect} from 'react'
import {useNavigate, Link, useParams} from 'react-router-dom';
import BuildUserFormService from '../services/BuildUserFormService'

const AddUserFormElementComponent = () => {
    //const{type} = useParams();
    const [title, setTitle] = useState('')
    const [type, setType] = useState('')
    const [key, setKey] = useState('')
    const [required, setRequired] = useState('')
    const navigate = useNavigate();
    const {id} = useParams();

    const saveOrUpdateUserFormElement = (e) => {
        e.preventDefault();
        const UserFormElement = {title, type, key,required}

        if(id){
            BuildUserFormService.updateUserFormElement(id, UserFormElement).then((response) =>{
                navigate('/user-form')
            }).catch(error =>{
                console.log(error)
            })

        }else{
            BuildUserFormService.createUserFormElement(UserFormElement).then((response) =>{
                console.log(response.data)
                navigate('/add-element');
    
            }).catch(error => {
                console.log(error)
            })
        }
    }
    useEffect(() => {
        BuildUserFormService.getUserFormElementByID(id).then((response) =>{
            setTitle(response.data.title)
            setType(response.data.type)
            setKey(response.data.key)
            setRequired(response.data.required)
        }).catch(error =>{
            console.log(error)
        })
    }, [])
    const pageTitle = () => {
        if(id){
            return <h2> Update Form Element</h2>
        }else{
            return <h2> Create Element</h2>
        }
    }
    const pageButton = () => {
        if(id){
            return <Link to="/user-form" className="btn btn-danger"> Cancel </Link>
        }else{
            return <Link to="/add-element" className="btn btn-danger"> Cancel </Link>
        } 
    }

  return (
    <div>
        <div className = "container">
            <div className = "row">
                <div className = "card col-md-6 offset-md-3 offset-md-3">
                    {
                        pageTitle()
                    }
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
                            <button className = "btn btn-success" onClick = {(e) => saveOrUpdateUserFormElement(e) }> Submit </button>
                            {
                                pageButton()
                            }
                        </form>
                    </div>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddUserFormElementComponent