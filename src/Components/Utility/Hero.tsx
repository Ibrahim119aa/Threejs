

import { useRef, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Text3D, Environment, MeshDistortMaterial, Sphere } from "@react-three/drei"
import type * as THREE from "three"

function InteractiveSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      try {
        meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
        meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
        meshRef.current.scale.setScalar(hovered ? 1.2 : 1)
      } catch (error) {
        console.warn("Error in InteractiveSphere animation:", error)
      }
    }
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Sphere args={[1, 32, 32]}>
        <MeshDistortMaterial
          color={hovered ? "#A95C9C" : "#844282"}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
          emissive={hovered ? "#944D8A" : "#581D5D"}
          emissiveIntensity={0.2}
        />
      </Sphere>
    </mesh>
  )
}

function DNA() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  const helixPoints = []
  for (let i = 0; i < 50; i++) {
    const y = (i - 25) * 0.2
    const angle1 = i * 0.3
    const angle2 = i * 0.3 + Math.PI

    helixPoints.push({
      position1: [Math.cos(angle1) * 2, y, Math.sin(angle1) * 2] as [number, number, number],
      position2: [Math.cos(angle2) * 2, y, Math.sin(angle2) * 2] as [number, number, number],
    })
  }

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {helixPoints.map((point, i) => (
        <group key={i}>
          <mesh position={point.position1}>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color="#A95C9C" emissive="#944D8A" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={point.position2}>
            <sphereGeometry args={[0.1]} />
            <meshStandardMaterial color="#844282" emissive="#581D5D" emissiveIntensity={0.3} />
          </mesh>
          {/* Connection line */}
          <mesh
            position={[
              (point.position1[0] + point.position2[0]) / 2,
              point.position1[1],
              (point.position1[2] + point.position2[2]) / 2,
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 4]} />
            <meshStandardMaterial color="#5B1E61" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function FloatingCubes() {
  const cubes = Array.from({ length: 20 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20 - 10] as [
      number,
      number,
      number,
    ],
    scale: 0.2 + Math.random() * 0.3,
    speed: 0.5 + Math.random() * 1,
  }))

  return (
    <>
      {cubes.map((cube, i) => (
        <FloatingCube key={i} {...cube} />
      ))}
    </>
  )
}

function FloatingCube({
  position,
  scale,
  speed,
}: {
  position: [number, number, number]
  scale: number
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#793276"
        metalness={0.8}
        roughness={0.2}
        emissive="#A95C9C"
        emissiveIntensity={0.1}
        wireframe
      />
    </mesh>
  )
}

// Rest of the component remains the same but wrapped in error handling
function SafeScene() {
  try {
    return (
      <>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#A95C9C" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#844282" />
        <spotLight position={[0, 20, 0]} angle={0.3} penumbra={1} intensity={0.8} color="#944D8A" />

        <Environment preset="night" />

        <InteractiveSphere position={[-4, 2, 0]} />
        <InteractiveSphere position={[4, -2, 2]} />
        <InteractiveSphere position={[0, 3, -2]} />

        <DNA />
        <FloatingCubes />

        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.1}>
          <Text3D
            font="/helvetiker_regular.typeface.json"
            size={1.5}
            height={0.3}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.03}
            bevelSize={0.03}
            bevelOffset={0}
            bevelSegments={5}
            position={[-3, 0, 0]}
          >
            INFINITY X
            <meshStandardMaterial
              color="#A95C9C"
              metalness={0.9}
              roughness={0.1}
              emissive="#944D8A"
              emissiveIntensity={0.2}
            />
          </Text3D>
        </Float>
      </>
    )
  } catch (error) {
    console.warn("Error in SafeScene:", error)
    return null
  }
}

export default function Hero() {
  return (
    <div className="absolute inset-0 top-20">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }} onError={(error) => console.warn("Canvas error:", error)}>
        <Suspense fallback={null}>
          <SafeScene />
        </Suspense>
      </Canvas>
    </div>
  )
}
