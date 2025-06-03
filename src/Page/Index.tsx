import React, { useRef } from 'react'
const Navbar = React.lazy(() => import('../Components/Utility/Navbar'));
const LandingSection = React.lazy(() => import('../Components/Sections/LandingSection'));
const AboutUsSection = React.lazy(() => import('../Components/Sections/AboutUsSection'));
const ServiceSection = React.lazy(() => import('../Components/Sections/ServiceSection'));
const PortfolioSection = React.lazy(() => import('../Components/Sections/PortfolioSection'));
const ContactUS = React.lazy(() => import('../Components/Sections/ContactUseSection'));
const FaceAnimatedModel = React.lazy(() => import('../Model/FaceAnimatedModel'));
const Home = () => {

    const ref = useRef<HTMLDivElement>(null);


    return (

        <div ref={ref} className="relative">



            <div className="fixed inset-0 bg-gradient-to-br from-[#451650] via-[#5B1E61] to-[#844282] -z-10" />




            <main className="relative z-10">
                <Navbar />
                <LandingSection />
                <AboutUsSection />
                <FaceAnimatedModel />
                <ServiceSection />
                <PortfolioSection />
                <ContactUS />
            </main>
        </div>
    )
}

export default Home
