import { appWindow } from "@tauri-apps/api/window";
import "./TitleBar.css";

interface TitleBarButtonProps {
  onClick: () => void;
  altText: string;
  iconUrl: string;
}

function TitleBarButton({onClick,altText,iconUrl}: Readonly<TitleBarButtonProps>) {
  return (
    <button className="titlebar-button" onClick={onClick}>
      <img src={iconUrl} alt={altText} />
    </button>
  );
}

function TitleBar() {
  return (
    <div className="titlebar">
      <h1 data-tauri-drag-region  className="title">Telemetry v1.0</h1>
      <TitleBarButton
        onClick={() => appWindow.minimize()}
        altText="minimize"
        iconUrl="https://api.iconify.design/mdi:window-minimize.svg"
      />
      <TitleBarButton
        onClick={() => appWindow.maximize()}
        altText="maximize"
        iconUrl="https://api.iconify.design/mdi:window-maximize.svg"
      />
      <TitleBarButton
        onClick={() => appWindow.close()}
        altText="close"
        iconUrl="https://api.iconify.design/mdi:close.svg"
      />
    </div>
  );
}

export default TitleBar;
