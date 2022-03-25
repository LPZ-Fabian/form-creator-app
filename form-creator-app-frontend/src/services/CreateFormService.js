import axios from 'axios'

const USER_FORM_BASE_REST_API_URL = 'http://localhost:8080/api/v1/forms'

class CreateFormService{
    getAllUserForms(){
        return axios.get(USER_FORM_BASE_REST_API_URL)
    }
    /*
    createUserFormElement(element){
        return axios.post(USER_FORM_BASE_REST_API_URL, element)
    }
    getUserFormElementByID(elementId){
        return axios.get(USER_FORM_BASE_REST_API_URL + '/' + elementId);
    }
    updateUserFormElement(elementId, element){
        return axios.put(USER_FORM_BASE_REST_API_URL + "/" + elementId, element)
    }*/
    deleteUserForm(formId){
        return axios.delete(USER_FORM_BASE_REST_API_URL + "/delete/" + formId)
    }
}

export default new CreateFormService();