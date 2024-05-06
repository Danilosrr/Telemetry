import { useContext } from "react";
import { DeviceContext } from "../contexts/DeviceContext";

export default function useDevice() {
  const deviceContext = useContext(DeviceContext);
  if (!deviceContext) {
    throw new Error("device context was not provided");
  }

  return deviceContext;
}
