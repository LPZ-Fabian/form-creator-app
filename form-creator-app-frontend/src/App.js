import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateForm from "./components/FormBuilder";
import SelectElements from "./components/SelectElements";
import UpdateElement from "./components/UpdateElement";
import CreateElement from "./components/CreateElement";
import ManageForms from "./components/ManageForms";
import ViewForm from "./components/ViewForm";
import ViewSubmissions from "./components/ViewSubmissions";


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
        <Route path="/update-form-element/:id" element={<UpdateElement />}></Route>
        <Route path="/build-element/:elementType/:formId" element={<CreateElement />}></Route>
        <Route path="/update-form/:id" element={<CreateForm />}></Route>
        <Route path="/user-form/:id" element={<CreateForm />}></Route>
        <Route path="/view-form/:id" element={<ViewForm/>}></Route>
        <Route path="/view-submissions/:id" element={<ViewSubmissions/>}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
