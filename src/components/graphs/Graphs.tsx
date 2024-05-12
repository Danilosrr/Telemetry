import useDevice from "../../hooks/UseDevice";
import { generateRandomColor } from "../../utils/Utils";
import LineChart from "./Chart";
import "./Graphs.css";

function Graphs() {
  const { devicePort } = useDevice();
  const dataSample = {accX:0, accY:0, accZ:0};

  return (
    <section className="chartContainer">
      {devicePort ? (
        Object.keys(dataSample).map((key) => {
          return <LineChart key={key} label={key} color={generateRandomColor()} rate={50} range={10}/>;
        })
      ) : (
        <h5>Connect to a device or upload data</h5>
      )}
    </section>
  );
}

export default Graphs;
