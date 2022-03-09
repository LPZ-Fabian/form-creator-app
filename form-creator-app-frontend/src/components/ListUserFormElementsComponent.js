import React, { useState, useEffect,} from "react";
import BuildUserFormService from "../services/BuildUserFormService";
import { Link } from 'react-router-dom'

const ListUserFormElementsComponent = () => {
  const [UserFormElements, setUserFormElements] = useState([]);

  useEffect(() => {
    getAllUserFormElements();
  }, [])

  const getAllUserFormElements = () =>{
    BuildUserFormService.getAllUserFormElements().then((response) => {
      setUserFormElements(response.data)
      console.log(response.data)
    }).catch(error =>{
      console.log(error);
    })
  }
  const deleteUserFormElement = (elementId) =>{
        BuildUserFormService.deleteUserFormElement(elementId).then((response) =>{
        getAllUserFormElements();
        }).catch(error =>{
          console.log(error)
        })
  }

  return (
    <div className="container">
      <h2 className="text-center"> User Form </h2>
      <Link to = "/add-element" className = "btn btn-primary mb-2"> Add Element </Link>
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
    </div>
  );
};

export default ListUserFormElementsComponent;