

import { motion } from "framer-motion"
import { CuboidIcon as Cube, Zap, Palette, Code, Film, Sparkles } from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { Torus, Sphere, Box } from "@react-three/drei"
import type * as THREE from "three"

function ServiceIcon3D({ shape, position }: { shape: string; position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2
    }
  })

  const material = (
    <meshStandardMaterial color="#A95C9C" metalness={0.8} roughness={0.2} emissive="#944D8A" emissiveIntensity={0.2} />
  )

  return (
    <mesh ref={meshRef} position={position}>
      {shape === "cube" && <Box args={[0.8, 0.8, 0.8]}>{material}</Box>}
      {shape === "sphere" && <Sphere args={[0.6]}>{material}</Sphere>}
      {shape === "torus" && <Torus args={[0.5, 0.2, 16, 32]}>{material}</Torus>}
      {shape === "tetrahedron" && <tetrahedronGeometry args={[0.7]} />}
      {shape === "octahedron" && <octahedronGeometry args={[0.6]} />}
      {shape === "dodecahedron" && <dodecahedronGeometry args={[0.5]} />}
      {(shape === "tetrahedron" || shape === "octahedron" || shape === "dodecahedron") && material}
    </mesh>
  )
}

function ServicesBackground() {
  const shapes = ["cube", "sphere", "torus", "tetrahedron", "octahedron", "dodecahedron"]

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#A95C9C" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#844282" />

      {shapes.map((shape, i) => (
        <ServiceIcon3D
          key={i}
          shape={shape}
          position={[(Math.random() - 0.5) * 15, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8 - 5]}
        />
      ))}
    </>
  )
}

const services = [
  {
    icon: Cube,
    title: "3D Visualization",
    description: "Stunning 3D models and environments that bring your vision to life with photorealistic detail.",
    features: ["Product Visualization", "Architectural Rendering", "Character Modeling"],
  },
  {
    icon: Film,
    title: "VFX & Animation",
    description: "Cinematic visual effects and animations that captivate audiences and tell compelling stories.",
    features: ["Motion Graphics", "Particle Systems", "Compositing"],
  },
  {
    icon: Code,
    title: "Interactive Experiences",
    description: "Immersive web applications and interactive installations that engage users in new ways.",
    features: ["WebGL Development", "AR/VR Solutions", "Real-time Rendering"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast loading times and smooth performance across all devices and platforms.",
    features: ["Asset Optimization", "LOD Systems", "Streaming Solutions"],
  },
  {
    icon: Palette,
    title: "Creative Direction",
    description: "Strategic creative guidance to ensure your project achieves maximum visual impact.",
    features: ["Art Direction", "Style Development", "Brand Integration"],
  },
  {
    icon: Sparkles,
    title: "Innovation Lab",
    description: "Cutting-edge research and development in emerging technologies and techniques.",
    features: ["AI Integration", "Procedural Generation", "Next-gen Pipelines"],
  },
]

export default function ServicesSection() {
  return (
    <section id="services" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#A95C9C] to-[#844282] bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive solutions for all your 3D and VFX needs, delivered with precision and creativity.
          </p>
        </motion.div>

        {/* 3D Background */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
            <Suspense fallback={null}>
              <ServicesBackground />
            </Suspense>
          </Canvas>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="bg-[#451650]/30 backdrop-blur-md border border-[#A95C9C]/20 rounded-2xl p-8 h-full relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  borderColor: "#A95C9C",
                  boxShadow: "0 20px 40px rgba(169, 92, 156, 0.2)",
                }}
                transition={{ duration: 0.3 }}
                data-cursor-hover
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#844282]/10 to-[#A95C9C]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />

                <div className="relative z-10">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#844282] to-[#A95C9C] rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <service.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <motion.li
                        key={feature}
                        className="text-[#A95C9C] flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-[#A95C9C] rounded-full mr-3" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
