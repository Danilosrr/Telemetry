import { useEffect, useState } from "react";
import { Payload, Reading } from "../../contexts/BufferContext";
import "./LiveReading.css";
import { listen } from "@tauri-apps/api/event";
import { parseJson } from "../../utils/Utils";
import Loader from "../loader/Loader";

function LiveReading() {
  const [payload, setPayload] = useState<Reading>({});
  const [size, setSize] = useState<number>(0);

  function setColor(value: number) {
    return value >= 0 ? "positive" : "negative";
  }

  useEffect(() => {
    const unlisten = listen<Payload>("updateSerial", (event) => {
      const json = parseJson(event.payload.message);
      if (json) {
        setPayload(json);
        if (event.payload.message.length != size) {
          setSize(event.payload.message.length);
        }
      }
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  return (
    <section className="payloadBg">
      {Object.keys(payload).length > 0 ? (
        <div className="payload">
          <label>
            size: <input type="text" value={`${size}B`} disabled />
          </label>
          {Object.keys(payload).map((key) => {
            return (
              <label key={key}>
                {key}:
                <input
                  className={setColor(payload[key])}
                  type="text"
                  value={payload[key]}
                  disabled
                />
              </label>
            );
          })}
        </div>
      ) : (
        <Loader text="waiting device connection" />
      )}
    </section>
  );
}

export default LiveReading;
