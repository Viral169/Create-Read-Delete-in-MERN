import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./compontents/Signup";
import Home from "./compontents/Home";
import Login from "./compontents/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
