import React, { useRef, useEffect } from "react";

import { useFrame, Canvas } from "@react-three/fiber";

import TrophyModel from "../TrophyModel/TrophyModel";
import * as THREE from "three";
import GraphLoading from "./GraphLoading";

const ContributionsGraph = ({
  width = 720,
  height = 400,
  className,
  data,
  username,
  setScene,
}) => {
  if (data === null) return <GraphLoading className={className} />;

  return (
    <Canvas className={className} camera={{ position: [0, 0, 5], fov: 50 }}>
      <Lights />
      <TrophyModel
        data={data["commits"]["data"]}
        entity={username}
        setScene={setScene}
      />
    </Canvas>
  );
};

const Lights = () => {
  const lightRef = useRef(null);
  const light2Ref = useRef(null);
  const light3Ref = useRef(null);
  const light4Ref = useRef(null);

  useFrame((state) => {
    let pos = state.camera.position;
    lightRef.current.position.copy(pos);
    light2Ref.current.position.copy(new THREE.Vector3(pos.x + 3, pos.y, pos.z));
    light3Ref.current.position.copy(new THREE.Vector3(pos.x - 3, pos.y, pos.z));
    light4Ref.current.position.copy(
      new THREE.Vector3(pos.x, pos.y - 5, pos.z - 1)
    );
  });

  return (
    <>
      <directionalLight
        color={0xffffff}
        intensity={0.25}
        castShadow
        ref={lightRef}
      />

      <directionalLight
        color={0xffffff}
        intensity={0.5}
        castShadow
        ref={light4Ref}
      />

      <directionalLight
        ref={light2Ref}
        color={0xffffff}
        intensity={0.1}
        castShadow
      />

      <directionalLight
        ref={light3Ref}
        color={0xffffff}
        intensity={0.1}
        castShadow
      />
    </>
  );
};

export default ContributionsGraph;
