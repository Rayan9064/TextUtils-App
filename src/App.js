import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TextUtils from "./components/TextUtils";
import Alert from "./components/Alert";
import About from "./components/About";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  const [mode, setMode] = useState("light");
  const [alert, setAlert] = useState(null);

  const toggleMode = () => {
    if(mode === "dark"){
      setMode("light");
      document.body.style.backgroundColor = "white";
      showAlert("Success", "light mode has been enabled");
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#2b2f32";
      showAlert("Success", "dark mode has been enabled");
    } 
  }

  const showAlert = (type, message) => {
    setAlert({
      type: type,
      msg: message
    })
    setTimeout(() => {
      setAlert(null) 
    }, 1500);
  }

  const handleColor = () => {
    document.body.style.backgroundColor = 'blue';
  }

  return (
    <>
    <Router>
 <Navbar about="About" mode={mode} toggleMode={toggleMode} />
 <Alert alert={alert}/>
 <Routes>
          <Route exact path="/about" element={<About/>}/>
          <Route exact path="/" element={<TextUtils showAlert={showAlert} heading="Text area" mode={mode}/>}/>
        </Routes>
 </Router>
    </>
  );
}

export default App;