import React, { useState, useEffect,} from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import { Link, useParams } from 'react-router-dom'

const ListUserFormElementsComponent = () => {
  const [UserFormElements, setUserFormElements] = useState([]);
  const {id} = useParams();
  const [UserFormTitle, setUserFormTitle] = useState("");

  //create const to store title

  useEffect(() => {
    getAllUserFormElements();
    getFormTitle();
  }, [])
  const getFormTitle = () =>{
    if(id){
    BuildFormService.getUserFormById(id).then((response) => {
      setUserFormTitle(response.data.title)
    })
    }else{
      setUserFormTitle('untitled form');
    }
  }
  const getAllUserFormElements = () =>{
    BuildUserElementService.getAllFormElementsByFormId(id).then((response) => {
      setUserFormElements(response.data)
      console.log(response.data)
    }).catch(error =>{
      console.log(error);
    })
  }
  const deleteUserFormElement = (elementId) =>{
        BuildUserElementService.deleteUserFormElement(elementId).then((response) =>{
        getAllUserFormElements();
        }).catch(error =>{
          console.log(error)
        })
  }

  return (
    <div className="container">
      <h2 className="text-center"> {UserFormTitle} </h2>
      <Link to = {"/add-element/" + id} className = "btn btn-primary mb-2"> Add Element </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Title</th>
          <th>Key</th>
          <th>Type</th>
          <th>Required</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            UserFormElements.map(
            form_element =>
            <tr key={form_element.id}>
              {console.log(form_element.id)}
              <td>{form_element.title}</td>
              <td>{form_element.key}</td>
              <td>{form_element.type}</td>
              <td>{form_element.required}</td>
              <td>
                <Link className="btn btn-info" to={"/update-form-element/"+ JSON.stringify(form_element.id)} > Update </Link>
                <button className="btn btn-danger" onClick = {() => deleteUserFormElement(form_element.id)}
                style = {{marginLeft: "10px"}}> Delete </button>

              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Link className= "btn btn-success" to={"/manage-forms/"}>Done</Link>
    </div>
  );
};

export default ListUserFormElementsComponent;