import React, { useState, useEffect } from "react";
import BuildUserElementService from "../services/BuildUserElementService";
import BuildFormService from "../services/BuildFormService";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateForm = () => {
  const [UserFormElements, setUserFormElements] = useState([]);
  const [UserFormTitle, setUserFormTitle] = useState("");
  const [Description, setDescription] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  //create const to store title
  useEffect(() => {
    getAllUserFormElements();
    getFormTitleAndDescription();
  }, []);
  const getFormTitleAndDescription = () => {
    BuildFormService.getUserFormById(id).then((response) => {
      setUserFormTitle(response.data.title);
      setDescription(response.data.description);
    });
  };
  const getAllUserFormElements = () => {
    BuildUserElementService.getAllFormElementsByFormId(id)
      .then((response) => {
        setUserFormElements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteUserFormElement = (elementId) => {
    BuildUserElementService.deleteUserFormElement(elementId)
      .then((response) => {
        getAllUserFormElements();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const submitForm = (redirect) => {
    const form = {
      title: UserFormTitle,
      description: Description,
    };
    BuildFormService.updateUserForm(id, form)
      .then((response) => {
        if (redirect) {
          navigate("/manage-forms");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="list-form-elements">
      <div className="inner-column">
        <div className="form-info">
          <div className="field">
            <label>Form Name:</label>
            <input
              type="text"
              value={UserFormTitle}
              onChange={(e) => setUserFormTitle(e.target.value)}
              className="not-active"
              id="title"
            ></input>
          </div>
          <div className="field">
            <label>Description:</label>

            <textarea
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="not-active"
              id="description"
              rows="3"
            ></textarea>
          </div>
        </div>

        <div className="form-table">
          <Link
            to={"/add-element/" + id}
            onClick={() => submitForm(false)}
            className="solid-button"
          >
            + Add Element
          </Link>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Key</th>
                <th>Type</th>
                <th>Required</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {UserFormElements.map((form_element) => (
                <tr key={form_element.id}>
                  <td>{form_element.title}</td>
                  <td>{form_element.key}</td>
                  <td>{form_element.type}</td>
                  <td>{form_element.required}</td>
                  <td>
                    <Link
                      className="primary-action"
                      to={"/update-form-element/" + JSON.stringify(form_element.id)}
                      onClick={() => submitForm(false)}
                    >
                      Update
                    </Link>
                    <button
                      className="secondary-action"
                      onClick={() => deleteUserFormElement(form_element.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
              </tr>
            </tbody>
          </table>
          <div className="create-form">
            <button className="solid-button" onClick={() => submitForm(true)}>
              Update Form
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpdateForm;
