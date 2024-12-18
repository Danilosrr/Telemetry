import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import { DeviceProvider } from "./contexts/DeviceContext";
import { BufferProvider } from "./contexts/BufferContext";
import Data from "./page/Data";
import Payload from "./page/Payload";
import Upload from "./page/Upload";
import LiveModel from "./page/LiveModel";

function App() {
  return (
    <DeviceProvider>
    <BufferProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/connection" element={<Home />} />
          <Route path="/graphs" element={<Data />} />
          <Route path="/payload" element={<Payload />} />
          <Route path="/model" element={<LiveModel />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/options" element={<Home />} />
          <Route path="/help" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </BufferProvider>
    </DeviceProvider>
  );
}

export default App;
