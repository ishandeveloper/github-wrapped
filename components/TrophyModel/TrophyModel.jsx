import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import wrappedFont from "three/examples/fonts/droid/droid_sans_bold.typeface.json";
import { graphThreeEntry } from "./graph_three_entry";

const BASE_COLOR = 0x113692;
const BAR_COLORS = [0xf0edff, 0x0097ba, 0x007abc, 0x005aaf, 0x001668];
const ROUGHNESS = 0.4;
const MAX_BAR_Z = 0.5;
const MIN_BAR_Z = 0.025;

const TrophyModel = ({ data, entity, setScene }) => {
  const width = Math.ceil(data.length / 7) / 7;
  const objectRef = useRef();
  const baseGeometryRef = useRef();

  const { scene } = useThree();

  useEffect(() => {
    if (scene !== null) setScene(scene);
  }, [scene, setScene]);

  const getBase = () => {
    return (
      <mesh
        position={new THREE.Vector3(width / 2 - 3 / 14, -0.25, -3 / 7)}
        ref={baseGeometryRef}
      >
        <boxGeometry args={[width, 0.5, 1]} />
        <meshStandardMaterial
          color={BASE_COLOR}
          roughness={0.4}
          flatShading={false}
          metalness={0.5}
        />
      </mesh>
    );
  };

  const getBars = () => {
    const x0 = -1 / 7;
    const z0 = -6 / 7;

    const maxCount = data.reduce((prev, curr) => {
      return curr.count > prev ? curr.count : prev;
    }, 0);

    return data.map((day, idx) => {
      if (!day.count) {
        return null;
      }

      const week = Math.floor(idx / 7);
      const dayOfWeek = idx % 7;
      const height =
        MIN_BAR_Z + (MAX_BAR_Z - MIN_BAR_Z) * (day.count / maxCount);
      const pos = new THREE.Vector3(
        x0 + (week * 1) / 7,
        0.5 * height,
        z0 + (dayOfWeek * 1) / 7
      );

      return (
        <mesh key={idx} position={pos}>
          <boxGeometry args={[1 / 7, height, 1 / 7]} />
          <meshStandardMaterial
            color={new THREE.Color(BAR_COLORS[day.level])}
            roughness={ROUGHNESS}
            flatShading={true}
            metalness={0.4}
            clipShadows={true}
          />
        </mesh>
      );
    });
  };

  const getLabelText = () => {
    const truncatedName =
      entity.length < 23 ? entity : entity.slice(0, 20) + "...";
    return `@${truncatedName}`;
  };

  const getLabel = () => {
    const font = new THREE.FontLoader().parse(wrappedFont);

    const textOptions = {
      font,
      size: 0.175,
      height: 0.15,
    };

    const wrappedTextOptions = {
      font,
      size: 0.125,
      height: 0.1,
    };

    return (
      <>
        <mesh position={new THREE.Vector3(0, -0.35, 0)}>
          <textGeometry
            attach="geometry"
            args={[getLabelText(), textOptions]}
          />
          <meshStandardMaterial
            color="#ffffff"
            roughness={ROUGHNESS}
            flatShading={true}
            metalness={0.5}
          />
        </mesh>

        <mesh position={new THREE.Vector3(width - 1.9, -0.325, 0)}>
          <textGeometry
            attach="geometry"
            args={["#GitHubWrapped", wrappedTextOptions]}
          />
          <meshStandardMaterial
            color="#ffffff"
            roughness={ROUGHNESS}
            flatShading={true}
            metalness={0.5}
          />
        </mesh>
      </>
    );
  };

  const onGroupRender = (group) => {
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivot.add(group);
    group.position.set(-width / 2, 0, 0);

    graphThreeEntry(pivot, baseGeometryRef.current);
  };

  return data ? (
    <group
      position={new THREE.Vector3(-(width / 2) + 3 / 14, 0, 3)}
      scale={new THREE.Vector3(1, 1, 1)}
      ref={objectRef}
      onUpdate={onGroupRender}
    >
      {getBase()}
      {getBars()}
      {getLabel()}
    </group>
  ) : null;
};

export default TrophyModel;
