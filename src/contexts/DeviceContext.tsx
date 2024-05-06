import { createContext, useState } from "react";

interface IDeviceContext {
  devicePort: string | undefined;
  setDevicePort: (port: string | undefined) => void;
  baudrate: number | undefined;
  setBaudrate: (rate: number) => void;
  handleDisconnect: () => void;
}

export const DeviceContext = createContext<IDeviceContext | null>(null);

export function DeviceProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [devicePort, setDevicePort] = useState<string | undefined>(undefined);
  const [baudrate, setBaudrate] = useState<number | undefined>(9600);

  function handleDisconnect() {
    setBaudrate(undefined);
    setDevicePort(undefined);
  }

  return (
    <DeviceContext.Provider value={{ devicePort, baudrate, setDevicePort, setBaudrate, handleDisconnect }}>
      {children}
    </DeviceContext.Provider>
  );
}
