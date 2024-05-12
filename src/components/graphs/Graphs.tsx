import useDevice from "../../hooks/UseDevice";
import LineChart from "./Chart";
import "./Graphs.css";

function Graphs() {
  const { devicePort } = useDevice();
  const variables = [1, 2, 3];

  return (
    <section className="chartContainer">
      {devicePort ? (
        variables.map((v) => {
          return <LineChart key={v} />;
        })
      ) : (
        <h5>Connect to a device or upload data</h5>
      )}
    </section>
  );
}

export default Graphs;
