import React, { useState, useEffect,} from "react";
import { Link, useParams } from 'react-router-dom'
import BuildFormService from "../services/BuildFormService";

const ManageFormComponent = () => {
  const [UserForms, setUserForms] = useState([]);
  //const {formId} = useParams();

  useEffect(() => {
    getAllUserForms();
  }, [])

  const getAllUserForms = () =>{
    BuildFormService.getAllUserForms().then((response) => {
      setUserForms(response.data)
      console.log(response.data)
    }).catch(error =>{
      console.log(error);
    })
  }
  const deleteUserForm = (formId) =>{
        BuildFormService.deleteUserForm(formId).then((response) =>{
        getAllUserForms();
        }).catch(error =>{
          console.log(error)
        })
  }

  return (
    <div className="container">
      <h2 className="text-center"> Manage User Forms </h2>
      <Link to = "/build-form" className = "btn btn-primary mb-2"> Create New Form </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {
            UserForms.map(
            form =>
            <tr key={form.id}>
              {console.log(form.id)}
              <td>{form.title}</td>
              <td>{form.description}</td>
              <td>
                <Link className="btn btn-info" to={"/update-form/"+ JSON.stringify(form.id)} > Update </Link>
                <button className="btn btn-danger" onClick = {() => deleteUserForm(form.id)}
                style = {{marginLeft: "10px"}}> Delete </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageFormComponent;