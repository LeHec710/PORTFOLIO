import { CameraControls, Center, ContactShadows, Float, OrbitControls, PerspectiveCamera, PresentationControls, Scroll, ScrollControls, SpotLight, SpotLightShadow } from '@react-three/drei';
import Skater, { Falling } from './models/Skater'
import { Suspense, useEffect, useRef } from 'react';
import Models from './Models';
import { useFrame, useThree } from '@react-three/fiber';

const Scene = () => {
    const {camera, gl} = useThree()
    
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
            
            <PerspectiveCamera makeDefault position={[0,2.5,6]} rotation={[-.3,0,0]} />

            <Models />

            <ambientLight />

            <ContactShadows position={[0, -1, 0]} />
        </>
    )
}

export default Scene;