"use client"

import { useRef, Suspense } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

function MorphingGeometry() {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
            meshRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1)
        }
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial
                color="#581D5D"
                metalness={0.8}
                roughness={0.2}
                emissive="#A95C9C"
                emissiveIntensity={0.1}
                wireframe
            />
        </mesh>
    )
}

function FloatingCrystals() {
    const crystals = Array.from({ length: 5 }, (_, i) => ({
        position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10] as [
            number,
            number,
            number,
        ],
        scale: 0.3 + Math.random() * 0.4,
        speed: 0.5 + Math.random() * 0.5,
    }))

    return (
        <>
            {crystals.map((crystal, i) => (
                <Crystal key={i} {...crystal} />
            ))}
        </>
    )
}

function Crystal({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null)

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.3
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5
        }
    })

    return (
        <mesh ref={meshRef} position={position} scale={scale}>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial
                color="#A95C9C"
                metalness={0.9}
                roughness={0.1}
                emissive="#944D8A"
                emissiveIntensity={0.3}
            />
        </mesh>
    )
}

const timelineData = [
    {
        year: "2020",
        title: "Foundation",
        description: "Infinity X Dynamics was born from a vision to revolutionize digital experiences.",
    },
    {
        year: "2021",
        title: "Innovation",
        description: "Pioneered cutting-edge 3D visualization techniques for enterprise clients.",
    },
    {
        year: "2022",
        title: "Expansion",
        description: "Expanded our VFX capabilities and entered the immersive media space.",
    },
    {
        year: "2023",
        title: "Recognition",
        description: "Awarded for excellence in digital innovation and creative technology.",
    },
    {
        year: "2024",
        title: "Future",
        description: "Leading the next generation of interactive 3D experiences.",
    },
]

export default function AboutUsSection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    return (
        <section id="about" ref={containerRef} className="min-h-screen py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div style={{ y, opacity }} className="text-center mb-16">
                    <motion.h2
                        className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#A95C9C] to-[#844282] bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        Our Journey
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-300 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        From concept to reality, we transform ideas into immersive digital experiences that push the boundaries of
                        what's possible.
                    </motion.p>
                </motion.div>

                {/* 3D Background */}
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
                        <Suspense fallback={null}>
                            <ambientLight intensity={0.2} />
                            <pointLight position={[5, 5, 5]} intensity={0.5} color="#A95C9C" />
                            <MorphingGeometry />
                            <FloatingCrystals />
                        </Suspense>
                    </Canvas>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#844282] to-[#A95C9C]" />

                    {timelineData.map((item, index) => (
                        <motion.div
                            key={item.year}
                            className={`flex items-center mb-16 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                                <motion.div
                                    className="bg-[#451650]/50 backdrop-blur-md border border-[#A95C9C]/30 rounded-2xl p-6"
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-3xl font-bold text-[#A95C9C] mb-2">{item.year}</h3>
                                    <h4 className="text-xl font-semibold text-white mb-3">{item.title}</h4>
                                    <p className="text-gray-300">{item.description}</p>
                                </motion.div>
                            </div>

                            {/* Timeline dot */}
                            <div className="relative z-10">
                                <motion.div
                                    className="w-6 h-6 bg-[#A95C9C] rounded-full border-4 border-[#451650]"
                                    whileInView={{ scale: [0, 1.2, 1] }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                />
                            </div>

                            <div className="w-1/2" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
