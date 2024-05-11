import useDevice from "../../hooks/UseDevice";
import LineChart from "./Chart";
import "./Graphs.css";

function Graphs() {
  const { devicePort } = useDevice();

  return (
    <div className="container">
      {devicePort ? (
        <LineChart/>
      ) : (
        <h5>Connect to a device or upload data</h5>
      )}
    </div>
  );
}

export default Graphs;
