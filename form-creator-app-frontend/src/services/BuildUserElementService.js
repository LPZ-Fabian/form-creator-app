import axios from "axios";

const USER_FORM_BASE_REST_API_URL =
    "http://localhost:8080/api/v1/form-elements";

class BuildUserFormService {
    getAllUserFormElements() {
        return axios.get(USER_FORM_BASE_REST_API_URL);
    }
    getAllFormElementsByFormId(formId) {
        return axios.get(USER_FORM_BASE_REST_API_URL + "/form/" + formId);
    }
    createUserFormElement(formId, element, hiddenElements) {
        return axios.post(
            USER_FORM_BASE_REST_API_URL + "/create/" + formId,
            element, hiddenElements
        );
    }
    getUserFormElementByID(elementId) {
        return axios.get(USER_FORM_BASE_REST_API_URL + "/" + elementId);
    }
    updateUserFormElement(elementId, element) {
        return axios.put(
            USER_FORM_BASE_REST_API_URL + "/" + elementId,
            element
        );
    }
    deleteUserFormElement(elementId) {
        return axios.delete(USER_FORM_BASE_REST_API_URL + "/" + elementId);
    }
}

export default new BuildUserFormService();
