import React, {useState, useEffect, Fragment} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import BuildUserElementService from '../services/BuildUserElementService';
import BuildFormService from '../services/BuildFormService';
import FormSubmissionService from '../services/FormSubmissionService';

const ViewSubmissions = () => {
  const [UserFormElements, setUserFormElements] = useState([]);
  const [UserFormTitle, setUserFormTitle] = useState('');
  const [Submissions, setSubmissions] = useState([]);
  const {id} = useParams();

  useEffect(() => {
    getAllUserFormElements();
    getFormTitle();
    getAllFormSubmissions();
  }, []);
  const getFormTitle = () => {
    BuildFormService.getUserFormById(id).then((response) => {
      setUserFormTitle(response.data.title);
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
    //console.log(UserFormElements)
  };

  const getAllFormSubmissions = () => {
    FormSubmissionService.getSubmissionsByFormID(id)
      .then((response) => {
        setSubmissions(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteFormSubmission = (submissionId) => {
    FormSubmissionService.deleteFormSubmission(submissionId)
      .then((response) => {
        console.log(response.data);
        getAllFormSubmissions();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getHiddenHeader = (list) => {
    if (list !== undefined) {
      return (
        <>
          {list.map((hidden) => {
            return <th key={"hidden-header-" + hidden.id}>{hidden.title + ' (hidden)'}</th>;
          })}
        </>
      );
    }
  };
  return (
    <section>
      <div className="inner column">
        <h1>{UserFormTitle} Form Responses</h1>
        <table>
          <thead>
            <tr>
              {UserFormElements.map((element) => (
                <Fragment key={"header-" + element.id}>
                  <th>{element.title}</th>
                  {getHiddenHeader(element.hiddenElementList)}
                </Fragment>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Submissions.map((submission) => (
              <tr key={"submission-" + submission.id}>
                {submission.formResponses.map((response) => (
                  <td key={"response-" + response.responseId}>{response.response}</td>
                ))}
                <td>
                  <button
                    className="danger-button"
                    onClick={() => deleteFormSubmission(submission.id)}>
                    {' '}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ViewSubmissions;
