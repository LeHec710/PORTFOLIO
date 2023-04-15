import { useAnimations as useDreiAnimations, useScroll } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { createContext, createRef, useContext, useEffect, useRef, useState } from "react";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three'

export const AnimationsContext = createContext();

export const Animation = ({ children }) => {
    // states
    const skater = createRef()
    const work = createRef()
    const [animations, setAnimations] = useState(null)
    const [animation, setAnimation] = useState(null)
    const [models, setModels] = useState({skater, work})

    // models
    const { animations: falling } = useLoader(FBXLoader, '/models/animations/falling.fbx')
    const { animations: falling_impact } = useLoader(FBXLoader, '/models/animations/landing.fbx')
    const { animations: landing } = useLoader(FBXLoader, '/models/animations/landing.fbx')
    const { animations: idle } = useLoader(FBXLoader, '/models/animations/idle.fbx')

    // skate animations
    const { actions: skate_falling_actions, names: skate_falling_names } = useDreiAnimations(falling, models.skater)
    const { actions: skate_landing_actions, names: skate_landing_names } = useDreiAnimations(landing, models.skater)
    const { actions: skate_falling_impact_actions, names: skate_falling_impact_names } = useDreiAnimations(falling_impact, models.skater)
    const { actions: skate_idle_actions, names: skate_idle_names } = useDreiAnimations(idle, models.skater)
    
    // work animations
    const { actions: work_falling_actions, names: work_falling_names } = useDreiAnimations(falling, models.work)
    const { actions: work_landing_actions, names: work_landing_names } = useDreiAnimations(landing, models.work)
    const { actions: work_falling_impact_actions, names: work_falling_impact_names } = useDreiAnimations(falling_impact, models.work)
    const { actions: work_idle_actions, names: work_idle_names } = useDreiAnimations(idle, models.work)

    // init animations
    useEffect(() => {
        setAnimations({
            "skater": {
                "model": models.skater,
                "falling": skate_falling_actions[skate_falling_names[0]],
                "falling_impact": skate_falling_impact_actions[skate_falling_impact_names[0]],
                "landing": skate_landing_actions[skate_landing_names[0]],
                "idle": skate_idle_actions[skate_idle_names[0]],
                "float": true
            },
            "work": {
                "model": models.work,
                "falling": work_falling_actions[work_falling_names[0]],
                "falling_impact": work_falling_impact_actions[work_falling_impact_names[0]],
                "landing": work_landing_actions[work_landing_names[0]],
                "idle": work_idle_actions[work_idle_names[0]],
                "float": true
            }
        })
    }, [
        skate_falling_actions, skate_falling_names, work_falling_actions, work_falling_names, 
        skate_falling_impact_actions, skate_falling_impact_names, work_falling_impact_actions, work_falling_impact_names, 
        skate_landing_actions, skate_landing_names, work_landing_actions, work_landing_names,
        skate_idle_actions, skate_idle_names, work_idle_actions, work_idle_names,
        models
    ])


    return (
        <AnimationsContext.Provider value={{ animations, setAnimations, animation, setAnimation, models }}>
            {children}
        </AnimationsContext.Provider>
    )
}

export const useAnimations = () => useContext(AnimationsContext);