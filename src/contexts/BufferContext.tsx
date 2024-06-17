import { createContext } from "react";

export interface Payload {
    message: string;
}

export interface Reading {
    [key:string]: number;
}

interface Buffer {
    [key:string]: number[];
}

interface IBufferContext {
  accessBuffer: () => Buffer;
  accessKey: (key: string) => number[];
  append: (data: Reading) => void;
  clearKey: (key: string) => void;
}

export const BufferContext = createContext<IBufferContext | null>(null);

export function BufferProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const buffer: Buffer = {};

  function accessBuffer() {
    return buffer;
  }

  function accessKey(key:string) {
    return buffer[key];
  }

  function clearKey(key:string) {
    buffer[key] = [];
  }

  function append(reading:Reading) {
    Object.keys(reading).forEach((key) => {
        if(buffer[key]){
            buffer[key].push(reading[key]);
        } else {
            buffer[key] = [reading[key]];
        }
    });
  }

  return (
    <BufferContext.Provider value={{ accessBuffer, accessKey, append, clearKey}}>
      {children}
    </BufferContext.Provider>
  );
}
