import { ContactShadows, Environment, Float, PerspectiveCamera, PresentationControls } from '@react-three/drei';
import { useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useModels } from 'hooks/useModels';

const Scene = () => {
    const {camera, gl} = useThree()
    const {Model, models, currentModel, selected, currentModelRef, cameraRef} = useModels()
    
    useEffect(() => {
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
        
            camera.updateProjectionMatrix();
        
            gl.setSize(window.innerWidth, window.innerHeight);
        }
        window.addEventListener('resize', () => onWindowResize())
    }, [gl, camera])
    return (
        <>
            <directionalLight
                distance={20}
                angle={3}
                attenuation={5}
                anglePower={5}
                position={[3, 5, 0]}
                color={'green'}
            />
            <directionalLight
                distance={20}
                angle={3}
                attenuation={5}
                anglePower={5}
                position={[-3, 5, 0]}
                color={'purple'}
            />
            
            <PerspectiveCamera ref={cameraRef} makeDefault position={[0,2.5,6]} rotation={[-.3,0,0]} />

            {/* <Models /> */}
            
            <group position={[window.innerWidth > 900 ? 1 : 0, 0, -2]}>
                <PresentationControls
                    global={true}
                    enabled={true}
                    cursor={true}
                    snap={!selected}
                    speed={1}
                    zoom={1}
                    rotation={[0, 0, 0]}
                    polar={selected ? [0,0,0] : [-Math.PI / 6, Math.PI / 6]}
                    azimuth={[-Infinity, Infinity]}
                    config={{ mass: 1, tension: 170, friction: 26 }}
                >
                    <Float
                        speed={!selected ? 5 : 0}
                        rotationIntensity={!selected ? 1 : 0}
                        floatIntensity={!selected ? 1 : 0}
                        floatingRange={[0, 0.4]}>
                        <Model url={currentModel.url}  />
                    </Float>
                </PresentationControls>
            </group>    
            <ambientLight />

            <ContactShadows position={[0, -1.5, 0]} />
        </>
    )
}

export default Scene;