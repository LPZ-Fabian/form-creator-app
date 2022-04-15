import axios from "axios";

const USER_FORM_BASE_REST_API_URL =
    "http://localhost:8080/api/v1/form-submissions";

class FormSubmissionService {
    createFormSubmission(formId, responses) {
        return axios.post(
            USER_FORM_BASE_REST_API_URL + "/record/" + formId, responses
        );
    }
    getSubmissionsByFormID(formId){
        return axios.get(USER_FORM_BASE_REST_API_URL + "/retrieve/form/"+ formId)
    }
    getSubmissionById(id){
        return axios.get(USER_FORM_BASE_REST_API_URL + "/retrieve/" + id)
    }
    deleteFormSubmission(id){
        return axios.delete(USER_FORM_BASE_REST_API_URL + "/delete/" + id);
    }
}

export default new FormSubmissionService();
