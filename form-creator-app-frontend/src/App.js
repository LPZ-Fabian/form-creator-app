import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateForm from "./components/CreateForm";
import SelectElements from "./components/SelectElements";
import UpdateUserElementComponent from "./components/UpdateUserElementComponent";
import CreateElement from "./components/CreateElement";
import ManageForms from "./components/ManageForms";
import CreateFormComponent from "./components/CreateFormComponents";


function App() {
  const redirect = true;
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={redirect ? <Navigate replace to="/manage-forms" /> : <ManageForms />}
        ></Route>
        <Route exact path="/manage-forms/" element={<ManageForms />}></Route>
        <Route path="/add-element/:id" element={<SelectElements />}></Route>
        <Route path="/update-form-element/:id" element={<UpdateUserElementComponent />}></Route>
        <Route path="/build-element/:defaultId/:formId" element={<CreateElement />}></Route>
        <Route path="/update-form/:id" element={<CreateForm />}></Route>
        <Route path="/user-form/:id" element={<CreateForm />}></Route>
        <Route path="/build-form/" element={<CreateFormComponent />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
