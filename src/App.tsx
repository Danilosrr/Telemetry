import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import { DeviceProvider } from "./contexts/DeviceContext";
import { BufferProvider } from "./contexts/BufferContext";
import Data from "./page/Data";

function App() {
  return (
    <DeviceProvider>
    <BufferProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/options" element={<Home />} />
          <Route path="/help" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </BufferProvider>
    </DeviceProvider>
  );
}

export default App;
