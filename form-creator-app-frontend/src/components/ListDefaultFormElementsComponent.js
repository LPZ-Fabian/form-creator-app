import React, { useState, useEffect } from "react";
import AddFormElementService from "../services/AddFormElementService";
import { Link } from 'react-router-dom'
//import { Button } from 'react-boostrap';
import {useNavigate} from 'react-router-dom';

const ListDefaultFormElementsComponent = () => {
  const navigate = useNavigate();
  const [DefaultFormElements, setDefaultFormElements] = useState([]);

  useEffect(() => {
    AddFormElementService.getAllDefaultFormElements().then((response) => {
      setDefaultFormElements(response.data)
      console.log(response.data)
    }).catch(error =>{
      console.log(error);
    })
  }, [])
  

  return (
    <div className="container">
      <h2 className="text-center"> Select an Element to Add </h2>
      <Link to = "/user-form" className = "btn btn-primary mb-2 sm"> Done </Link>

      <table className="table table-bordered table-striped">
        <thead>
          <th>Type</th>
          <th>Actions</th>
        </thead>
        <tbody>
          {DefaultFormElements.map((default_form_element) => (
            <tr key={default_form_element.id}>
              <td>{default_form_element.type}</td>
              <td>
                <button className = "btn btn-primary mb-2 sm" onClick={() => {
                  navigate("/build-element", {
                    element_type: default_form_element.type});
                    }} 
                    >add
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListDefaultFormElementsComponent;
