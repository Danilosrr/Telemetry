import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Home />} />
        <Route path="/data" element={<Home />} />
        <Route path="/options" element={<Home />} />
        <Route path="/help" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
