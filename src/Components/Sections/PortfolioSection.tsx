"use client"

import { useRef, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Box, Sphere, Torus } from "@react-three/drei"
import { motion } from "framer-motion"
import type * as THREE from "three"
export type ShapeProps = {
  position: [number, number, number];
  geometry: string;
  scale: number;
};
function ComplexGeometry() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Complex Shape */}
      <mesh position={[0, 0, -8]}>
        <icosahedronGeometry args={[2, 2]} />
        <meshStandardMaterial
          color="#581D5D"
          metalness={0.9}
          roughness={0.1}
          emissive="#A95C9C"
          emissiveIntensity={0.1}
          wireframe
        />
      </mesh>

      {/* Orbiting Smaller Shapes */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 4
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, 0, z - 8]}>
            <dodecahedronGeometry args={[0.3]} />
            <meshStandardMaterial
              color="#A95C9C"
              metalness={0.8}
              roughness={0.2}
              emissive="#944D8A"
              emissiveIntensity={0.3}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function AnimatedShapes() {
  const shapes: ShapeProps[] = [
    { position: [-8, 2, -5], geometry: "box", scale: 1 },
    { position: [8, -2, -5], geometry: "sphere", scale: 0.8 },
    { position: [0, 4, -8], geometry: "torus", scale: 1.2 },
    { position: [-6, -3, -6], geometry: "octahedron", scale: 0.9 },
    { position: [6, 3, -7], geometry: "tetrahedron", scale: 1.1 },
  ]

  return (
    <>
      {shapes.map((shape, i) => (
        <AnimatedShape key={i} {...shape} />
      ))}
    </>
  )
}

function AnimatedShape({
  position,
  geometry,
  scale,
}: {
  position: [number, number, number]
  geometry: string
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * (0.5 + Math.sin(position[0]) * 0.2)
      meshRef.current.rotation.y = state.clock.elapsedTime * (0.3 + Math.cos(position[1]) * 0.2)
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3
      meshRef.current.scale.setScalar(scale + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  const material = (
    <meshStandardMaterial color="#A95C9C" metalness={0.8} roughness={0.2} emissive="#944D8A" emissiveIntensity={0.1} />
  )

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === "box" && <Box args={[1, 1, 1]}>{material}</Box>}
      {geometry === "sphere" && <Sphere args={[0.7]}>{material}</Sphere>}
      {geometry === "torus" && <Torus args={[0.7, 0.3, 16, 32]}>{material}</Torus>}
      {geometry === "octahedron" && (
        <>
          <octahedronGeometry args={[0.8]} />
          {material}
        </>
      )}
      {geometry === "tetrahedron" && (
        <>
          <tetrahedronGeometry args={[0.9]} />
          {material}
        </>
      )}
    </mesh>
  )
}

function ParticleSystem() {
  const points = useRef<THREE.Points>(null)

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02
      points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute args={[particlesPosition, 3]} attach="attributes-position" count={2000} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#A95C9C" transparent opacity={0.4} />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#A95C9C" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#844282" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={0.5} color="#944D8A" />

      <ComplexGeometry />
      <AnimatedShapes />
      <ParticleSystem />
    </>
  )
}

const portfolioItems = [
  {
    title: "Quantum Visualization",
    category: "3D Modeling",
    description: "Interactive quantum physics visualization for educational platforms.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Cinematic VFX",
    category: "Visual Effects",
    description: "Award-winning visual effects for independent film production.",
    image: "/placeholder.svg?height=400&width=600",
  }
  ,
  {
    title: "Cinematic VFX",
    category: "Visual Effects",
    description: "Award-winning visual effects for independent film production.",
    image: "/placeholder.svg?height=400&width=600",
  }
]

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#A95C9C] to-[#844282] bg-clip-text text-transparent">
            Portfolio
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our latest projects and see how we bring imagination to life through cutting-edge technology.
          </p>
        </motion.div>

        {/* 3D Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-[#451650]/40 backdrop-blur-md border border-[#A95C9C]/20 rounded-2xl overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#A95C9C",
                  boxShadow: "0 25px 50px rgba(169, 92, 156, 0.3)",
                }}
                transition={{ duration: 0.3 }}
                data-cursor-hover
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#451650]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#A95C9C] text-sm font-semibold uppercase tracking-wider">
                      {item.category}
                    </span>
                    <motion.div
                      className="w-2 h-2 bg-[#A95C9C] rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>

                  <motion.button
                    className="mt-4 text-[#A95C9C] font-semibold hover:text-white transition-colors duration-300"
                    whileHover={{ x: 5 }}
                    data-cursor-hover
                  >
                    View Project →
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
