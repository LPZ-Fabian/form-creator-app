import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import BuildFormService from "../services/BuildFormService";

const ManageForms = () => {
  const [UserForms, setUserForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllUserForms();
  }, []);

  const createForm = () => {
    const form = {
      title: "",
      description: "",
    };
    BuildFormService.createForm(form).then((response) => {
      navigate("/user-form/" + response.data.id);
    });
  };

  const getAllUserForms = () => {
    BuildFormService.getAllUserForms()
      .then((response) => {
        setUserForms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteUserForm = (formId) => {
    BuildFormService.deleteUserForm(formId)
      .then((response) => {
        getAllUserForms();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section>
      <div className="inner-column">
        <h1 className="loud-voice"> Manage User Forms </h1>
        <button className="solid-button" onClick={() => createForm()}>
          + New Form
        </button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th className="table-actions">Operations</th>
            </tr>
          </thead>
          <tbody className="manage-form">
            {UserForms.map((form) => (
              <tr key={form.id}>
                <td>
                  <svg width="11" height="16.3" viewBox="0 0 25 37" fill="none">
                    <ellipse cx="4.325" cy="4.502" rx="4.2" ry="3.814" fill="#AFAFAF" />
                    <ellipse cx="20.075" cy="4.502" rx="4.2" ry="3.814" fill="#AFAFAF" />
                    <ellipse cx="4.325" cy="18.802" rx="4.2" ry="3.814" fill="#AFAFAF" />
                    <ellipse cx="20.075" cy="18.802" rx="4.2" ry="3.814" fill="#AFAFAF" />
                    <ellipse cx="4.325" cy="33.103" rx="4.2" ry="3.814" fill="#AFAFAF" />
                    <ellipse cx="20.075" cy="33.103" rx="4.2" ry="3.814" fill="#AFAFAF" />
                  </svg>
                  {form.title}
                </td>
                <td>{form.description}</td>
                <td>
                  <div className="dropdown">
                    <button className="secondary-button">Edit</button>
                    <div className="dropdown-content">
                      <Link
                        className="secondary-action"
                        to={"/update-form/" + JSON.stringify(form.id)}
                      >
                        Update
                      </Link>
                      <button className="secondary-action" onClick={() => deleteUserForm(form.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button className="solid-button">View</button>
                    <div className="dropdown-content">
                      <Link
                        className="secondary-action"
                        to={"/view-form/" + JSON.stringify(form.id)}
                      >
                        View Form
                      </Link>
                      <Link
                        className="secondary-action"
                        to={"/view-submissions/" + JSON.stringify(form.id)}
                      >
                        View Responses
                      </Link>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageForms;
