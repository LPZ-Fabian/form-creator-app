import "./App.css";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ListUserFormElementsComponent from "./components/ListUserFormElementsComponent";
import ListDefaultFormElementsComponent from "./components/ListDefaultFormElementsComponent";
import AddUserFormElementComponent from "./components/AddUserFormElementComponent";
import UpdateUserElementComponent from "./components/UpdateUserElementComponent";
import AddUserElementComponent from "./components/AddUserElementComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
          <Route exact path = "/user-form" element = {<ListUserFormElementsComponent/>}></Route>
            <Route path = "/add-element" element = {<ListDefaultFormElementsComponent/>}></Route>
            <Route path = "/build-element" element = {<AddUserFormElementComponent/>}></Route>
            //<Route path = "/update-form-element/:id" element = {<AddUserFormElementComponent/>}></Route>
            <Route path = "/update-form-element/:id" element = {<UpdateUserElementComponent/>}></Route>

            <Route path = "/build-element/:id" element = {<AddUserElementComponent/>}></Route>



          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
