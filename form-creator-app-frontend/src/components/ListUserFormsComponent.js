import React, { useState, useEffect,} from "react";
import { Link } from 'react-router-dom'

const ListUserFormsComponent = () => {

  return (
    <div className="container">
      <h2 className="text-center"> User Forms </h2>
      <Link to = "/user-form" className = "btn btn-primary mb-2"> Create New Form </Link>
      <table className="table table-bordered table-striped">
        <thead>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </thead>
        <tbody>
  
        </tbody>
      </table>
    </div>
  );
};

export default ListUserFormsComponent;