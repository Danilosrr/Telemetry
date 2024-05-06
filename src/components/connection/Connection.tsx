import { useEffect, useState } from "react";
import { handleGetPorts } from "../../utils/Utils";
import { Icon } from "@iconify/react";
import "./Connection.css";
import useDevice from "../../hooks/UseDevice";

interface ConnectionButtonProps {
  onClick: () => void;
  iconUrl: string;
}

function ConnectionButton({
  onClick,
  iconUrl,
}: Readonly<ConnectionButtonProps>) {
  return (
    <button onClick={onClick}>
      <Icon icon={iconUrl} />
    </button>
  );
}

function Connection() {
  const { setDevicePort } = useDevice();
  const [port, setPort] = useState<string | undefined>(undefined);
  const [portsListed, setPortsListed] = useState<string[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setPort(e.target.value);
    console.log(port);
  }

  useEffect(() => {
    handleGetPorts(setPortsListed);
  }, []);

  return (
    <div className="connection">
      <label>
        {" "}
        Select your device:
        <select value={port} onChange={handleChange}>
          <option disabled> devices </option>
          {portsListed.length > 0 ? (
            portsListed.map((port) => {
              return (
                <option key={port} value={port}>
                  {port}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </select>
      </label>
      <section>
        <ConnectionButton
          iconUrl="mdi:play-arrow"
          onClick={() => {
            port ? setDevicePort(port) : console.log("no device message");
          }}
        />
        <ConnectionButton
          iconUrl="mdi:restart"
          onClick={() => {
            handleGetPorts(setPortsListed);
          }}
        />
      </section>
    </div>
  );
}

export default Connection;
