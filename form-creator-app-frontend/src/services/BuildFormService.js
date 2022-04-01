import axios from 'axios'

const USER_FORM_BASE_REST_API_URL = 'http://localhost:8080/api/v1/forms'

class CreateFormService{
    getAllUserForms(){
        return axios.get(USER_FORM_BASE_REST_API_URL)
    }
    createForm(form){
        return axios.post(USER_FORM_BASE_REST_API_URL + "/create", form)
    }
    getUserFormById(formId){
        return axios.get(USER_FORM_BASE_REST_API_URL + '/' + formId);
    }
    updateUserForm(formId, form){
        return axios.put(USER_FORM_BASE_REST_API_URL + "/" + formId, form)
    }
    deleteUserForm(formId){
        return axios.delete(USER_FORM_BASE_REST_API_URL + "/delete/" + formId)
    }
}

export default new CreateFormService();