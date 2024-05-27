import { useEffect, useState } from "react";
import { getBaudList, handleConnect, handleGetPorts } from "../../utils/Utils";
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
  const {...device} = useDevice();
  const [baudrate, setBaudrate] = useState<string>('9600');
  const [port, setPort] = useState<string>('');
  const [portsListed, setPortsListed] = useState<string[]>([]);

  function handlePortChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setPort(e.target.value);
  }

  function handleBaudrateChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    setBaudrate(e.target.value);
  }

  useEffect(() => {
    handleGetPorts(setPortsListed);
  }, []);

  return (
    <div className="connection">
      <label>
        Select your device:
        <select onChange={handlePortChange} disabled={device.connected}>
          {portsListed.length > 0 ? (
            portsListed.map((port) => {
              return (
                <option key={port} value={port} selected={port==device.devicePort}>
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
        <select onChange={handleBaudrateChange} defaultValue={'9600'} disabled={device.connected}>
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
      {device.connected?
      <ConnectionButton 
        text="disconnect" 
        iconUrl="mdi:lan-disconnect" 
        onClick={device.handleDisconnect}
      />:
      <>
        <ConnectionButton
          text="connect"
          iconUrl="mdi:play-arrow"
          onClick={() => {
            handleConnect({port,baudrate},device.setBaudrate,device.setDevicePort,device.setConnected)
          }}
        />
        <ConnectionButton
          text="search"
          iconUrl="mdi:restart"
          onClick={() => {
            handleGetPorts(setPortsListed);
          }}
        />
      </>}
      </section>
    </div>
  );
}

export default Connection;
