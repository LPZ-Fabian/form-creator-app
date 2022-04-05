import React, { useState, useEffect } from "react";
import DefaultFormElementService from "../services/DefaultFormElementService";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SelectElements = () => {
  const navigate = useNavigate();
  const [DefaultFormElements, setDefaultFormElements] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    DefaultFormElementService.getAllDefaultFormElements()
      .then((response) => {
        setDefaultFormElements(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className="select-elements">
      <div className="inner-column">
        <h2 className="text-center">Select an Element to Add</h2>
        <table className="select-element-table">
          <thead>
            <tr>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {DefaultFormElements.map((default_form_element) => (
              <tr key={default_form_element.id}>
                <td>{default_form_element.type}</td>
                <td>
                  <Link
                    to={"/build-element/" + JSON.stringify(default_form_element.id) + "/" + id}
                    className="solid-button"
                  >
                    + Add Element
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="actions">
          <Link to={"/user-form/" + id} class="solid-button confirm-action">
            Done
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SelectElements;
