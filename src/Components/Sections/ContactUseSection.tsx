

import type React from "react"

import { useState, useRef, Suspense, useEffect } from "react"
import { motion } from "framer-motion"
import { Send} from "lucide-react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, OrbitControls,Environment } from "@react-three/drei"
import type * as THREE from "three"
import Developer from "../../Model/ContactUsModel"



export default function ContactSection() {
    const [animationName, setAnimationName] = useState('victory');
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission
        console.log("Form submitted:", formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }
    useEffect(() => {
        setTimeout(() => {
            setAnimationName('victory')
        }, 1000)
    })

    return (
        <section id="contact" className="min-h-screen py-20 relative">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#A95C9C] to-[#844282] bg-clip-text text-transparent">
                        Let's Create Together
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Ready to bring your vision to life? Get in touch and let's discuss how we can transform your ideas into
                        extraordinary digital experiences.
                    </p>
                </motion.div>

                {/* 3D Background */}


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        className="space-y-8 col-span-1"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className=" bg-[#451650]/40 backdrop-blur-md border border-[#A95C9C]/20 rounded-2xl p-2">

                            <Canvas style={{ height: '70vh' }} camera={{ position: [0, 1.5, 3], fov: 50 }}>
                                <ambientLight intensity={0.5} />
                                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                                <directionalLight position={[10, 10, 10]} intensity={1} />

                                <OrbitControls
                                    enableZoom={false}
                                    maxPolarAngle={Math.PI / 2}
                                    target={[0, 1, 0]} // Focuses the camera around the chest/face area
                                />

                                <Suspense fallback={null}>
                                    <Developer position={[0, 0, 0]} animationName={animationName} />
                                    <Environment preset='sunset'/>
                                </Suspense>
                            </Canvas>



                        </div>



                    </motion.div>
                    <motion.div
                        className="col-span-2"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.form
                            onSubmit={handleSubmit}
                            className="bg-[#451650]/40 backdrop-blur-md border border-[#A95C9C]/20 rounded-2xl p-8"
                            whileHover={{ borderColor: "#A95C9C" }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="name" className="block text-white font-semibold mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#581D5D]/50 border border-[#A95C9C]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A95C9C] transition-colors duration-300"
                                        placeholder="Your Name"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="email" className="block text-white font-semibold mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#581D5D]/50 border border-[#A95C9C]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A95C9C] transition-colors duration-300"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <label htmlFor="message" className="block text-white font-semibold mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={6}
                                        className="w-full px-4 py-3 bg-[#581D5D]/50 border border-[#A95C9C]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#A95C9C] transition-colors duration-300 resize-none"
                                        placeholder="Tell us about your project..."
                                        required
                                    />
                                </motion.div>

                                <motion.button

                                    onClick={() => setAnimationName('clapping')}
                                    className="w-full px-8 py-4 bg-gradient-to-r from-[#844282] to-[#A95C9C] rounded-lg text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#A95C9C]/25 transition-all duration-300 flex items-center justify-center space-x-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    data-cursor-hover
                                >
                                    <Send className="w-5 h-5" />
                                    <span>Send Message</span>
                                </motion.button>
                            </div>
                        </motion.form>
                    </motion.div>

                    {/* Contact Information */}

                </div>
            </div>
        </section>
    )
}
