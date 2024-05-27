import { invoke } from "@tauri-apps/api/tauri";

interface IDevice {
  port: string;
  baudrate: string;
}

async function handleGetPorts(
  setPortsListed: React.Dispatch<React.SetStateAction<string[]>>
) {
  const ports: string[] = await invoke("get_ports", {});
  setPortsListed(ports);
}

async function handleError(input: string) {
  await invoke("emit_error", { input });
}

async function handleConnect(
  device: IDevice,
  setBaudrate: (rate: string) => void,
  setDevicePort: (port: string) => void,
  setConnected: (connection: boolean) => void,
) {
  try {
    invoke("set_port_items", { ...device });
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

function getBaudList() {
  return [
    "300",
    "600",
    "1200",
    "2400",
    "4800",
    "9600",
    "14400",
    "19200",
    "28800",
    "31250",
    "38400",
    "57600",
    "115200",
  ];
}

async function handleSetFolder() {
  await invoke("set_folder_path", {});
}

function generateRandomColor() {
  let randomColor = "#000000".replace(/0/g, function () {
    return (~~(Math.random() * 16)).toString(16);
  });
  return randomColor;
}

export {
  handleGetPorts,
  handleError,
  handleConnect,
  handleSetFolder,
  getBaudList,
  generateRandomColor,
};
