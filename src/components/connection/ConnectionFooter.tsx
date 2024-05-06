import useDevice from "../../hooks/UseDevice";
import { Icon } from "@iconify/react";
import "./ConnectionFooter.css";

function ConnectionFooter() {
  const { devicePort, baudrate, handleDisconnect } = useDevice();
  const available = !!(devicePort && baudrate);

  return (
    <footer className={`disconnection ${available ? "slide-in" : "slide-out"}`}>
      <h5>{available ? "Device is connected on:" : "device disconnected"}</h5>
      <p>{available ? `${devicePort} (${baudrate})` : ""}</p>
      <button onClick={handleDisconnect} title="disconnect device">
        <Icon icon="mdi:lan-disconnect" />
      </button>
    </footer>
  );
}

export default ConnectionFooter;
