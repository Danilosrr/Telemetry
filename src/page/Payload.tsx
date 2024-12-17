import LiveReading from "../components/liveReading/LiveReading";
import TitleBar from "../components/titleBar/TitleBar";
import * as THREE from 'three';

function Payload() {
  const quaternion = new THREE.Quaternion();
  quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);

  const vector = new THREE.Vector3(1, 0, 0);
  vector.applyQuaternion(quaternion);

  return (
    <>
      <TitleBar />
      <LiveReading />
    </>
  );
}

export default Payload;
