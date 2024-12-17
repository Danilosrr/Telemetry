import { createContext, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { handleError } from "../utils/Utils";

interface IDeviceContext {
  devicePort: string | undefined;
  setDevicePort: (port: string | undefined) => void;
  baudrate: string | undefined;
  setBaudrate: (rate: string) => void;
  connected: boolean;
  handleDisconnect: () => void;
  handleConnect: (device: IDevice) => void;
}

interface IDevice {
  port: string;
  baudrate: string;
}

export const DeviceContext = createContext<IDeviceContext | null>(null);

export function DeviceProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [devicePort, setDevicePort] = useState<string | undefined>(undefined);
  const [baudrate, setBaudrate] = useState<string | undefined>('9600');
  const [connected, setConnected] = useState<boolean>(false);

  async function handleDisconnect() {
    if (!connected) return 
    invoke("set_port_items", {});
    await invoke("handle_serial_connect", {});
    setBaudrate(undefined);
    setDevicePort(undefined);
    setConnected(false);
  }

  async function handleConnect(
    device: IDevice,
  ) {
    try {
      await invoke("set_port_items", { ...device });
      const serial = await invoke("handle_serial_connect", {});
      if (serial) {
        setBaudrate(device.baudrate);
        setDevicePort(device.port);
        setConnected(true);
      }
    } catch (error) {
      handleError("Could not connect to device");
      console.log(`serial catch`);
    }
  }

  return (
    <DeviceContext.Provider value={{ devicePort, baudrate, setDevicePort, setBaudrate, handleDisconnect, handleConnect, connected }}>
      {children}
    </DeviceContext.Provider>
  );
}
