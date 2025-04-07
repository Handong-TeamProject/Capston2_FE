// LandingPage.tsx

import Footer from "@/components/layout/Footer"
import React from "react"
import Hero from "./Hero"
import Challenges from "./Challenges"
import Solutions from "./Solutions"
import Timeline from "./Timeline"
import Goal from "./Goal"
import CallToAction from "./CallToAction"

const LandingPage = () => {
    return (
        <div>
            <Hero/>
            <Challenges/>
            <Solutions/>
            <Timeline/>
            <Goal/>
            <CallToAction/>
            <Footer/>
        </div>
    )
}

export default LandingPage
