import axios from "axios";

const USER_FORM_BASE_REST_API_URL =
    "http://localhost:8080/api/v1/form-responses";

class FormSubmissionService {
    createFormResponse(formId, responses) {
        return axios.post(
            USER_FORM_BASE_REST_API_URL + "/record/responses/" + formId, responses
        );
    }
}

export default new FormSubmissionService();
