import { useEffect, useState } from "react";
import useDevice from "../../hooks/UseDevice";
import { generateRandomColor, parseJson } from "../../utils/Utils";
import LineChart from "./Chart";
import "./Graphs.css";
import { listen } from "@tauri-apps/api/event";
import { Payload } from "../../contexts/BufferContext";
import useBuffer from "../../hooks/UseBuffer";
import Loader from "../loader/Loader";

function Graphs() {
  const { devicePort, connected } = useDevice();
  const { append, accessBuffer } = useBuffer();
  const [dataKeys, setDataKeys] = useState<string[]>([]);
  const buffer = accessBuffer();
  const running = devicePort && connected;

  function updateFormat() {
    if (Object.keys(buffer).length === 0) {
      setTimeout(() => {
        updateFormat();
      }, 2000);
      return;
    }

    const bufferData = accessBuffer();
    const newKeys = Object.keys(bufferData || {});

    if (JSON.stringify(newKeys) !== JSON.stringify(dataKeys)) {
      setDataKeys(newKeys);
    }
  }

  useEffect(() => {
    const unlisten = listen<Payload>("updateSerial", (event) => {
      const json = parseJson(event.payload.message);
      if (json) append(json);
    });
    if (running) updateFormat();
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  if (running && dataKeys.length>0) {
    return (
      <section className="chartContainer">
        {dataKeys.map((key) => {
          return (
            <LineChart key={key} label={key} color={generateRandomColor()} rate={100} delay={1000} range={10000} />
          );
        })}
      </section>
    );
  }

  if (!running) {
    return (
      <div className="chartWarning">
        <h5>Connect to a device or upload data</h5>
      </div>
    )
  }

  if (dataKeys.length==0) {
    return (
        <Loader text="Initializing device..."/>
    )
  }
}

export default Graphs;
