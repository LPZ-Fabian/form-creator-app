import axios from 'axios'

const USER_FORM_BASE_REST_API_URL = 'http://localhost:8080/api/v1/build-form'

class BuildUserFormService{
    getAllUserFormElements(){
        return axios.get(USER_FORM_BASE_REST_API_URL)
    }
    createUserFormElement(element){
        return axios.post(USER_FORM_BASE_REST_API_URL, element)
    }
    getUserFormElementByID(elementId){
        return axios.get(USER_FORM_BASE_REST_API_URL + '/' + elementId);
    }
    updateUserFormElement(elementId, element){
        return axios.put(USER_FORM_BASE_REST_API_URL + "/" + elementId, element)
    }
    deleteUserFormElement(elementId){
        return axios.delete(USER_FORM_BASE_REST_API_URL + "/" + elementId)
    }
}

export default new BuildUserFormService();