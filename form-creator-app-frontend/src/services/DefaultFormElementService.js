import axios from 'axios'

const ADD_ELEMENT_BASE_REST_API_URL = 'http://localhost:8080/api/v1/add-element'

class AddFormElementService{
    getAllDefaultFormElements(){
        return axios.get(ADD_ELEMENT_BASE_REST_API_URL)
    }
    getDefaultFormElementById(elementId){
        return axios.get(ADD_ELEMENT_BASE_REST_API_URL + '/' + elementId);
    }
}

export default new AddFormElementService();