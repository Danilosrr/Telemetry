import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Payload, Reading } from "../../contexts/BufferContext";
import { listen } from "@tauri-apps/api/event";
import { parseJson } from "../../utils/Utils";
import Loader from "../loader/Loader";
import { GizmoHelper, GizmoViewcube, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import "./Quaternion.css";

export default function Quaternion() {
  const [payload, setPayload] = useState<Reading>({});
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const theme = darkMode ? "dark" : "light";

  function changeTheme() {
    setDarkMode(!darkMode);
  }

  useEffect(() => {
    const unlisten = listen<Payload>("updateSerial", (event) => {
      const json = parseJson(event.payload.message);
      if (json) {
        setPayload({ ...json, size: event.payload.message.length });
      }
    });
    return () => {
      unlisten.then((f) => f());
    };
  }, []);

  if (Object.keys(payload).length == 0)
    return <Loader text="waiting device connection" />;
  return (
    <main className={"liveModel " + theme}>
      <Canvas>
        <GizmoHelper alignment="bottom-right" margin={[60, 60]}>
          <GizmoViewcube />
        </GizmoHelper>
        <OrbitControls />
        <gridHelper
          args={[20, 30, "lightgray", "lightgray"]}
          position={[0, -0.3, 0]}
        />
        <axesHelper args={[10]} />
        <ambientLight intensity={1.5} />
        <Model pitch={payload.angX} roll={payload.angY} />
      </Canvas>
      <Icon
        className={"themeButton"}
        icon={darkMode ? "mdi:white-balance-sunny" : "mdi:moon-and-stars"}
        onClick={changeTheme}
      />
    </main>
  );
}

function Model({ pitch, roll }: Readonly<{ pitch: number; roll: number }>) {
  const meshRef = useRef<THREE.Mesh>(null!);

  const model = useLoader(GLTFLoader, "models/motorcycle.gltf");
  model.scene.scale.setScalar(1 / 1000);

  useFrame(() => {
    meshRef.current.rotation.z = pitch * (Math.PI / 180);
    meshRef.current.rotation.x = roll * (Math.PI / 180);
  });

  return (
    <mesh ref={meshRef} scale={1}>
      <axesHelper args={[2]} />
      <directionalLight position={[2, 5, 1]} />
      <primitive object={model.scene} />
    </mesh>
  );
}
