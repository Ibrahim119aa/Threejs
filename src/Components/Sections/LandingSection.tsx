
import { motion } from "framer-motion"

import Hero from "../Utility/Hero";
import LandingSectionModel from "../../Model/LandingSectionModel";


export default function LandingSection() {
  return (
    <div className="relative  w-screen overflow-hidden">

      <div className="h-[100vh] inset-0 -z-10">
        <LandingSectionModel />
      </div>


      <main className="absolute top-2 mx-auto w-full z-10">
        <section
          id="home"
          className="h-screen relative flex items-center justify-center overflow-hidden"
        >
          <Hero />

          <div className="relative z-10 text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.h1
                className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#A95C9C] to-[#844282] bg-clip-text text-transparent"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
              >
                DYNAMICS
              </motion.h1>

              <motion.p
                className="text-xl text-yellow-50 md:text-2xl mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
              >
                Crafting Immersive Digital Experiences Through Cutting-Edge 3D/VFX Solutions
              </motion.p>

              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-[#844282] to-[#A95C9C] rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-[#A95C9C]/25 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                data-cursor-hover
              >
                Explore Our Universe
              </motion.button>
            </motion.div>
          </div>


          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-[#A95C9C] rounded-full flex justify-center"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-[#A95C9C] rounded-full mt-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>

  )
}
