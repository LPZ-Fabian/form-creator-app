import React, {useState, useEffect} from 'react';
import {useNavigate, Link, useParams} from 'react-router-dom';
import ElementCard from './ElementCard';
import BuildUserElementService from '../services/BuildUserElementService';
import DefaultFormElementService from '../services/DefaultFormElementService';

const CreateElement = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [key, setKey] = useState('');
  const [required, setRequired] = useState(false);
  const navigate = useNavigate();
  const {elementType} = useParams();
  const {formId} = useParams();
  const [Cards, setCards] = useState([]);
  const [hiddenElementList, setHiddenElementList] = useState([]);

  useEffect(() => {
    setType(elementType.replace(/([a-z])([A-Z])/g, '$1 $2'));
    initialStyling();
  }, []);

  const initialStyling = () => {
    document.querySelector('.overall-hidden').style.display = 'none';
    if (elementType.toLowerCase() === 'checkbox') {
      document.getElementById('checkbox-field').classList.add('hide');
    }
  };

  const addHiddenElements = () => {
    const titles = document.querySelectorAll('.element-title');
    const types = document.querySelectorAll('.element-type');
    const keys = document.querySelectorAll('.element-key');
    const reqs = document.querySelectorAll('.element-req');
    for (let i = 0; i < titles.length; i++) {
      const title = titles[i].value;
      const type = types[i].value;
      const key = keys[i].value;
      const required = reqs[i].checked;
      const hiddenElement = {
        title,
        type,
        key,
        required,
      };
      hiddenElementList.push(hiddenElement);
    }
  };

  const checkHiddenCards = () => {
    let valid = true;
    const hiddenCards = document.querySelectorAll('.hidden-cards');
    hiddenCards.forEach((card) => {
      if (!card.checkValidity()) {
        card.reportValidity();
        valid = false;
      }
    });
    return valid;
  };

  const addElementToForm = (e) => {
    e.preventDefault();
    if (checkHiddenCards()) {
      console.log(hiddenElementList);
      addHiddenElements();
      console.log(hiddenElementList);
      const UserFormElement = {
        title,
        type,
        key,
        required,
        hiddenElementList,
      };
      BuildUserElementService.createUserFormElement(formId, UserFormElement)
        .then((response) => {
          console.log(response.data);
          navigate('/user-form/' + formId);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <section id="sectiontest" className="create-element">
      <div className="card-container">
        <h1 className="overlay-heading">Create New Form Element</h1>
        <div className="overlay">
          <h2 className="page-title">{type}</h2>
          <form
            className="form-card"
            onSubmit={(e) => {
              addElementToForm(e);
            }}>
            <div className="card-inputs">
              <div className="field">
                <label className="form-label">Title:</label>
                <input
                  required
                  type="text"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}></input>
              </div>
              <div className="field">
                <label className="form-label">Key:</label>
                <input
                  required
                  type="text"
                  name="key"
                  className="form-control"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}></input>
              </div>
              <div id="checkbox-field" className="field">
                <label className="form-label"> Required:</label>
                <input
                  type="checkbox"
                  name="required"
                  className="form-control"
                  onChange={(e) => setRequired(e.target.checked)}></input>
              </div>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => {
                  setCards([
                    ...Cards,
                    <ElementCard key={'hidden' + Cards.length + 1} index={Cards.length + 1} />,
                  ]);
                  document.querySelector('.overall-hidden').style.display = 'flex';
                }}>
                Add Hidden Element
              </button>
              <div className="form-buttons">
              <Link to={'/add-element/' + formId} className="secondary-action">
                  Cancel
                </Link>
                <button type="submit" className="solid-button">
                  Create Element
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="overall-hidden">
        <div className="hidden-container">{Cards}</div>
      </div>
    </section>
  );
};

export default CreateElement;
