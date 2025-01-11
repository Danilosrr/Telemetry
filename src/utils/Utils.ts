import { invoke } from "@tauri-apps/api/tauri";
import { WebviewWindow } from "@tauri-apps/api/window";

async function handleGetPorts(
  setPortsListed: React.Dispatch<React.SetStateAction<string[]>>
) {
  const ports: string[] = await invoke("get_ports", {});
  console.log(ports)
  setPortsListed(ports);
}

async function handleError(input: string) {
  await invoke("emit_error", { input });
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

function parseJson(jsonString:string){
  try {
    const jsonObject = JSON.parse(jsonString);
    for (const key in jsonObject) {
      if (typeof jsonObject[key] === 'string' && !isNaN(Number(jsonObject[key]))) {
        jsonObject[key] = Number(jsonObject[key]);
      }
    }
    return jsonObject;
  } catch (error) {
    return;
  }
}

function handleWindow(label:string) {
  const newWindow = new WebviewWindow(label,{
    url:`/${label.toLowerCase()}`,
    height: 400,
    width: 400,
    decorations: false,
    resizable: true,
    closable: true
  })
  return newWindow;
}

export {
  handleGetPorts,
  handleError,
  handleSetFolder,
  getBaudList,
  generateRandomColor,
  parseJson,
  handleWindow
};
