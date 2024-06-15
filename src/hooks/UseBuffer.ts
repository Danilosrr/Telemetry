import { useContext } from "react";
import { BufferContext } from "../contexts/BufferContext";

export default function useBuffer() {
  const bufferContext = useContext(BufferContext);
  if (!bufferContext) {
    throw new Error("buffer context was not provided");
  }

  return bufferContext;
}
