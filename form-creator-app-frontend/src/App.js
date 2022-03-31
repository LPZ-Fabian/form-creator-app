import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ListUserFormElementsComponent from "./components/ListUserFormElementsComponent";
import ListDefaultFormElementsComponent from "./components/ListDefaultFormElementsComponent";
//import AddUserFormElementComponent from "./components/AddUserFormElementComponent";
import UpdateUserElementComponent from "./components/UpdateUserElementComponent";
import AddUserElementComponent from "./components/AddUserElementComponent";
import ManageFormComponent from "./components/ManageFormComponent";
import CreateFormComponent from "./components/CreateFormComponents";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
          <Route exact path = "/manage-forms/" element = {<ManageFormComponent/>}></Route>
            <Route path = "/add-element/:id" element = {<ListDefaultFormElementsComponent/>}></Route>
            <Route path = "/update-form-element/:id" element = {<UpdateUserElementComponent/>}></Route>
            <Route path = "/build-element/:defaultId/:formId" element = {<AddUserElementComponent/>}></Route>
            <Route path = "/update-form/:id" element = {<ListUserFormElementsComponent/>}></Route>
            <Route path = "/user-form/:id" element = {<ListUserFormElementsComponent/>}></Route>
            <Route path = "/build-form/" element = {<CreateFormComponent/>}></Route>
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
