import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    ContactShadows,
    Environment,
} from '@react-three/drei';
import * as THREE from 'three';
import Person from '../../public/Model/Person/Person';
import Loader from '../Components/Utility/Loader';

function AnimatedFace() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {

            const elapsedTime = state.clock.getElapsedTime();
            groupRef.current.rotation.y = Math.sin(elapsedTime) * 0.4;

            // groupRef.current.rotation.z = Math.sin(elapsedTime) * 0.4;
        }
    });

    return (
        <group

            ref={groupRef}
            scale={[8, 8, 3]}
            position={[0, -12.2, 2]}
        >
            <Person />
        </group>
    );
}


export default function FaceAnimatedModel() {
    return (
        <Canvas
            shadows
            camera={{ position: [0, 1.6, 5], fov: 60, far: 200 }}
            style={{ width: '100%', height: '100vh' }}
        >


            <ambientLight intensity={0.25} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-bias={-0.0001}
            />

           
            <Suspense fallback={<Loader />}>
                <AnimatedFace />

                <Environment preset='sunset'  />
            </Suspense>

            {/* EFFECTS */}
            <ContactShadows
                position={[0, -1, 0]}
                opacity={0.5}
                scale={12}
                blur={1.5}
                far={8}
            />
            <OrbitControls
                enableZoom={true}

            />


        </Canvas>
    );
}
