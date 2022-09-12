import React, { useState } from "react";
import About from "./components/About";
import NavBar from "./components/NavBar";
import TextForm from "./components/TextForm";
import Alert from "./components/Alert";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {

  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = "#042743";
      showAlert("dark mode has been enabled", "success");
      document.title = 'TextUtils - Dark Mode';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("light mode has been enabled", "success");
      document.title = 'TextUtils - Light Mode';
    }
  };


  return (
    <>
      <Router>
        <NavBar title="TextUtils" aboutText="About" mode={mode} toggleMode={toggleMode} />
        <Alert alert={alert} />

        <div className="container my-3">
          <Routes>

            <Route exact path="/about" element={<About mode={mode} />}>
            </Route>

            <Route exact path="/" element={<TextForm heading="Try TextUtils App - Word counter , Character counter , Copy text" showAlert={showAlert} mode={mode} />}>
            </Route>

          </Routes>
        </div>
      </Router >
    </>
  );
}

export default App;

