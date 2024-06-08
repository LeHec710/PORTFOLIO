import { useEffect, useRef, useState } from "react"
import Skater from "./models/Skater"
import { Work } from "./models/Work"
import { Test } from "./models/Test"
import { useAnimations } from "hooks/useAnimations"
import { Float, OrbitControls, PresentationControls, ScrollControls, Select, TransformControls, isWebGL2Available, useGLTF, useScroll } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useModels } from "hooks/useModels"
import * as THREE from "three"
import { gsap } from "gsap"
import { CustomEase } from "gsap/CustomEase";

const Models = () => {
    const { animations, setAnimations } = useAnimations()
    const { models, setModels } = useAnimations()
    const { models: _models, setModels: _setModels } = useModels()
    const [selected, setSelected] = useState(false)
    const [canscroll, setCanScroll] = useState(true)
    const [current, setCurrent] = useState("skater")

    const scroll = useScroll()

    // INIT CURRENT MODEL
    useEffect(() => {
        if (!_models) return
        setCurrent(_models.current)

    }, [animations, models])

    // CHECK IF SELECTED TRIGGERED
    useEffect(() => {
        if(!_models || _models.selected === selected) return
        setSelected(_models.selected !== 0)
    }, [_models])

    // SCROLL TO SELECT (TODO)
    useFrame(() => {
    })

    // SELECT ANIMATION
    useEffect(() => {
        gsap.registerPlugin(CustomEase)

        if (!animations || !models) return
        
        // IF SELECTED
        if (selected === true) {
            const __models = { ..._models }
            __models.selected = __models.current
            _setModels(__models)

            const _animations = { ...animations }
            _animations[current].float = false
            _animations[current].falling.paused = true
            _animations[current].falling_impact.repetitions = 1
            _animations[current].falling_impact.clampWhenFinished = true
            _animations[current].falling_impact.paused = false
            _animations[current].falling_impact.getMixer().addEventListener("finished", function () {
                setCanScroll(true)
            })
            _animations[current].falling_impact.reset().fadeIn(0.5).play()
            setTimeout(() => {
                _animations[current].idle.paused = false
                _animations[current].idle.fadeIn(0.5).play()
            }, 1000)
            setAnimations(_animations)

            // translation
            const parent = animations[current].model.current.parent.parent
            gsap.to(parent.position, {
                y: -1.2,
                duration: .8,
                ease: CustomEase.create("custom", "M0,0,C0.612,-0.94,0.492,1,1,1")
            });


            parent.enabled = false
        } 
        
        // IF NOT SELECTED
        else {
            const __models = { ..._models }
            __models.selected = 0
            _setModels(__models)

            setTimeout(() => {
                const _animations = { ...animations }
                _animations[current].idle.paused = true
                _animations[current].falling.paused = false
                _animations[current].falling.time = 0
                _animations[current].falling.reset().fadeIn(0.5).play()
                setAnimations(_animations)
            }, 1)

            // translation
            const parent = animations[current].model.current.parent.parent
            gsap.to(parent.position, {
                y: 0,
                duration: .8,
            });
        }
    }, [selected])

    const [init, setInit] = useState(false)
    useEffect(() => {
        if (!animations || !_models) return
        _models.list.forEach(name => {
            if (_models[name].loaded && init === false) {
                setInit(true)
                setTimeout(() => {
                    animations[name].falling.fadeIn(0.5).play()
                }, 1)
            }
        })

    }, [animations, _models])
    


    useEffect(() => {
        if (!animations || !_models || !models) return
        _models.list.forEach(name => {
            if (_models[name].index === _models.current) {
                setCurrent(name)
                gsap.to(models[name].current.position, {
                    y: 0,
                    duration: 1.3
                })
            } else {
                gsap.to(models[name].current.position, {
                    y: 10,
                    duration: 1.3
                })
            }
        })
    }, [animations, _models, models, selected])

    const select = () => {
        const _models = { ...models }
        _models.current === 1 ? _models.current = _models.total : _models.current -= 1

        setModels(_models)
    }

    return (
        <>
            <group position={[window.innerWidth > 900 ? 1 : 0, 0, 0]}>
                <PresentationControls
                    global={true}
                    enabled={true}
                    cursor={true}
                    snap={true}
                    speed={1}
                    zoom={1}
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 6, Math.PI / 6]}
                    azimuth={[-Infinity, Infinity]}
                    config={{ mass: 1, tension: 170, friction: 26 }}
                >
                    <Float
                        speed={animations?.skater.float ? 5 : 0}
                        rotationIntensity={animations?.skater.float ? 1 : 0}
                        floatIntensity={1}
                        floatingRange={[0, 0.4]}>
                        <Skater ref={models.skater} scale={1.3} />
                    </Float>

                    <Float
                        speed={animations?.work.float ? 5 : 0}
                        rotationIntensity={animations?.work.float ? 1 : 0}
                        floatIntensity={1}
                        floatingRange={[0, 0.4]}>
                        <Work ref={models.work} scale={1.3} />
                    </Float>

                    <Float
                        speed={animations?.test.float ? 5 : 0}
                        rotationIntensity={animations?.test.float ? 1 : 0}
                        floatIntensity={1}
                        floatingRange={[0, 0.4]}>
                        <Test ref={models.test} scale={1.3} />
                    </Float>

                </PresentationControls>
            </group>
        </>
    )
}

export default Models