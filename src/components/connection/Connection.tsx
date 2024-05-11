import { useEffect, useState } from "react";
import { getBaudList, handleGetPorts } from "../../utils/Utils";
import { Icon } from "@iconify/react";
import useDevice from "../../hooks/UseDevice";
import "./Connection.css";

interface ConnectionButtonProps {
  onClick: () => void;
  text?: string;
  iconUrl: string;
}

function ConnectionButton({
  onClick,
  text,
  iconUrl,
}: Readonly<ConnectionButtonProps>) {
  return (
    <button onClick={onClick} title={text}>
      <Icon icon={iconUrl} />
    </button>
  );
}

function Connection() {
  const baudrateList = getBaudList();
  const { devicePort, setBaudrate, setDevicePort } = useDevice();
  const [rate, setRate] = useState<number>(9600);
  const [port, setPort] = useState<string | undefined>(undefined);
  const [portsListed, setPortsListed] = useState<string[]>([]);

  function handlePortChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setPort(e.target.value);
  }

  function handleBaudrateChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setRate(+e.target.value);
  }

  useEffect(() => {
    handleGetPorts(setPortsListed);
  }, []);

  return (
    <div className="connection">
      <label>
        Select your device:
        <select onChange={handlePortChange}>
          <option disabled> devices </option>
          {portsListed.length > 0 ? (
            portsListed.map((port) => {
              return (
                <option key={port} value={port} selected={port==devicePort}>
                  {port}
                </option>
              );
            })
          ) : (
            <></>
          )}
        </select>
      </label>
      <label>
        baudrate:
        <select onChange={handleBaudrateChange} defaultValue={9600}>
          {baudrateList.map((rate) => {
            return (
              <option key={rate} value={rate}>
                {rate}
              </option>
            );
          })}
        </select>
      </label>
      <section>
        <ConnectionButton
          text="connect"
          iconUrl="mdi:play-arrow"
          onClick={() => {
            setDevicePort(port);
            setBaudrate(rate);
          }}
        />
        <ConnectionButton
          text="search"
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
