import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams, use } from "react-router-dom";
//import AddDefaultFormElementService from '../services/AddDefaultFormElementService';
import BuildUserElementService from "../services/BuildUserElementService";

const UpdateUserElementComponent = () => {
  //const{type} = useParams();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [key, setKey] = useState("");
  const [required, setRequired] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const UpdateUserFormElement = (e) => {
    e.preventDefault();
    const UserFormElement = { title, type, key, required };

    if (id) {
      BuildUserElementService.updateUserFormElement(id, UserFormElement)
        .then((response) => {
          navigate(-1);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    BuildUserElementService.getUserFormElementByID(id)
      .then((response) => {
        setTitle(response.data.title);
        setType(response.data.type);
        setKey(response.data.key);
        setRequired(response.data.required);
      })
      .catch((error) => {
        console.log(error);
      });
    setPageTitle();
  }, []);
  const setPageTitle = () => {
    const element = {
      type: type,
      title: title,
    };
    let elementType = element.type;
    console.log(element.type);
    return elementType;
  };

  return (
    <section class="update-element">
      <div className="inner-column">
        <h1 class="overlay-heading">Update {setPageTitle()}</h1>
        <div className="overlay">
          <form>
            <div className="field">
              <label className="form-label">Title:</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className="field">
              <label className="form-label">Key:</label>
              <input
                type="text"
                name="key"
                className="form-control"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              ></input>
            </div>
            <div className="field">
              <label className="form-label"> Required: </label>
              <input
                type="text"
                name="required"
                className="form-control"
                value={required}
                onChange={(e) => setRequired(e.target.value)}
              ></input>
            </div>
            <div className="form-actions">
              <button className="solid-button" onClick={(e) => UpdateUserFormElement(e)}>
                Update
              </button>
              <Link to={-1} className="secondary-action">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateUserElementComponent;
