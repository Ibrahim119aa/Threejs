"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return

    const handleScroll = () => {
      try {
        setScrollY(window.scrollY || 0)
      } catch (error) {
        console.warn("Failed to get scroll position:", error)
      }
    }

    try {
      window.addEventListener("scroll", handleScroll, { passive: true })

      return () => {
        try {
          window.removeEventListener("scroll", handleScroll)
        } catch (error) {
          console.warn("Failed to remove scroll listener:", error)
        }
      }
    } catch (error) {
      console.warn("Failed to add scroll listener:", error)
      return () => {} // Return empty cleanup function
    }
  }, [isClient])

  const scrollToSection = (href: string) => {
    if (typeof window === "undefined") return

    try {
      const element = document.querySelector(href)
      if (element && typeof element.scrollIntoView === "function") {
        element.scrollIntoView({ behavior: "smooth" })
        setIsOpen(false)
      }
    } catch (error) {
      console.warn("Failed to scroll to section:", error)
    }
  }

  if (!isClient) return null

  return (
    <motion.nav
      className="fixed top-8 right-8 z-50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      {/* Menu Toggle */}
      <motion.button
        className="w-14 h-14 bg-[#844282]/20 backdrop-blur-md border border-[#A95C9C]/30 rounded-full flex items-center justify-center text-white"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor-hover
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 bg-[#451650]/90 backdrop-blur-md border border-[#A95C9C]/30 rounded-2xl p-6 min-w-[200px]"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-white hover:text-[#A95C9C] transition-colors duration-300 text-lg font-medium w-full text-left"
                    data-cursor-hover
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="absolute -left-2 top-0 w-1 bg-[#A95C9C] rounded-full origin-top"
        style={{
          height: "56px",
          scaleY: (() => {
            try {
              if (typeof window !== "undefined" && document.documentElement) {
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight
                return maxScroll > 0 ? scrollY / maxScroll : 0
              }
            } catch (error) {
              console.warn("Failed to calculate scroll progress:", error)
            }
            return 0
          })(),
        }}
      />
    </motion.nav>
  )
}
