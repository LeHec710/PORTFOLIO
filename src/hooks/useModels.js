import { useAnimations as useDreiAnimations, useGLTF, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

export const ModelsContext = createContext();

export const Models = ({ children }) => {
  const [models, setModels] = useState(null)

  // skater
  const { nodes: skater_nodes, materials: skater_materials, scene: skater_scene } = useGLTF("/models/skater.gltf");
  const { nodes: work_nodes, materials: work_materials, scene: work_scene } = useGLTF("/models/work3.gltf");

  useEffect(() => {
    setModels(
      {
        list: ["skater", "work"],
        current: 1,
        selected: 0,
        total: 2,
        skater: {
          nodes: skater_nodes,
          materials: skater_materials,
          scene: skater_scene,
          loaded: (skater_nodes && skater_materials) ? true : false,
          index: 1,
          current: true,
          selected: false,
          title: "skate",
          description: "Je fais du skate"
        },
        work: {
          nodes: work_nodes,
          materials: work_materials,
          scene: work_scene,
          loaded: (work_nodes && work_materials) ? true : false,
          index: 2,
          current: false,
          selected: false,
          title: "dev",
          description: "et du dev aussi"
        }
      }
    )
  }, [
    skater_nodes, skater_materials, skater_scene,
    work_nodes, work_materials, work_scene
  ])

  return (
    <ModelsContext.Provider value={{ models, setModels }}>
      {children}
    </ModelsContext.Provider>
  )
}

export const useModels = () => useContext(ModelsContext);