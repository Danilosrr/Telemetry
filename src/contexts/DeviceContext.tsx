import { createContext, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

interface IDeviceContext {
  devicePort: string | undefined;
  setDevicePort: (port: string | undefined) => void;
  baudrate: string | undefined;
  setBaudrate: (rate: string) => void;
  connected: boolean;
  setConnected: (connection: boolean) => void;
  handleDisconnect: () => void;
}

export const DeviceContext = createContext<IDeviceContext | null>(null);

export function DeviceProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [devicePort, setDevicePort] = useState<string | undefined>(undefined);
  const [baudrate, setBaudrate] = useState<string | undefined>('9600');
  const [connected, setConnected] = useState<boolean>(false);

  async function handleDisconnect() {
    invoke("set_port_items", {});
    await invoke("handle_serial_connect", {});
    setBaudrate(undefined);
    setDevicePort(undefined);
    setConnected(false);
  }

  return (
    <DeviceContext.Provider value={{ devicePort, baudrate, setDevicePort, setBaudrate, handleDisconnect, connected, setConnected }}>
      {children}
    </DeviceContext.Provider>
  );
}
