import { invoke } from "@tauri-apps/api/tauri";

async function handleGetPorts(
  setPortsListed: React.Dispatch<React.SetStateAction<string[]>>
) {
  const ports: string[] = await invoke("get_ports", {});
  setPortsListed(ports);
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
  let colorHex: string = "#";

  for (let i = 0; i < 3; i++) {
    let color = Math.floor(Math.random() * 200 + 55);
    color.toString(16).padStart(2, "0");
    colorHex += color;
  }

  return colorHex;
}

export { handleGetPorts, handleSetFolder, getBaudList, generateRandomColor };
