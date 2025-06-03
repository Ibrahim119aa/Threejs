import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    ContactShadows,
    Environment,
    Cloud,
    Float,
    Sparkles,
    CameraShake,
    Center,
} from '@react-three/drei';
import Loader from '../Components/Utility/Loader';
import * as THREE from 'three';
import Computer from '../../public/Model/Computer/Computer'; // Make sure this is a GLTF/GLB React component



function AnimatedComputer() {
    const ref = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (ref.current) {
            const t = state.clock.getElapsedTime();
            ref.current.rotation.y = Math.sin(t * 0.5) * 0.3;
            ref.current.position.y = Math.sin(t * 0.8) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1.4}>
            <group ref={ref} scale={[0.3, 0.3, 0.3]}>
                <Center>
                    <Computer />
                </Center>
            </group>
        </Float>
    );
}
export default function LandingSectionModel() {
    return (
        <Canvas

            shadows
            camera={{ position: [0, 1, 5], fov: 50 }}

        >
           
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#00bfff" />
            <pointLight position={[3, -3, 2]} intensity={0.6} color="#ff00ff" />
            <Environment preset="city" />

            <Cloud
                position={[0, 0, 0]}
                opacity={0.4}
                speed={0.4}

                segments={40}
                color="#ffccff"
            />


            <Suspense fallback={<Loader />}>
                <AnimatedComputer />
                <Environment preset="sunset" />
            </Suspense>

            <OrbitControls enableZoom autoRotate autoRotateSpeed={0.6} />
            <CameraShake yawFrequency={0.3} pitchFrequency={0.2} rollFrequency={0.1} intensity={0.4} />


            <Sparkles count={400} scale={6} speed={1} size={2} color="#ffffff" />
            <ContactShadows
                opacity={0.4}
                scale={15}
                blur={2}
                far={10}
                resolution={1024}
                position={[0, -1.5, 0]}
            />
        </Canvas>
    );
}
