import { appWindow } from "@tauri-apps/api/window";
import { Icon } from '@iconify/react';
import "./TitleBar.css";

interface TitleBarButtonProps {
  onClick: () => void;
  iconUrl: string;
}

function TitleBarButton({onClick,iconUrl}: Readonly<TitleBarButtonProps>) {
  return (
    <button className="titlebar-button" onClick={onClick}>
      <Icon icon={iconUrl}/>
    </button>
  );
}

function TitleBar() {
  return (
    <div className="titlebar">
      <h1 data-tauri-drag-region  className="title">Telemetry v1.0</h1>
      <TitleBarButton
        onClick={() => appWindow.minimize()}
        iconUrl="mdi:window-minimize"
      />
      <TitleBarButton
        onClick={() => appWindow.maximize()}
        iconUrl="mdi:window-maximize"
      />
      <TitleBarButton
        onClick={() => appWindow.close()}
        iconUrl="mdi:close"
      />
    </div>
  );
}

export default TitleBar;
