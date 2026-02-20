import { useRef } from 'react'
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { ServicesSection } from './components/ServicesSection'
import { TechnologySection } from './components/TechnologySection'
import { ResourcesSection } from './components/ResourcesSection'
import { CaseProjectSection } from './components/CaseProjectSection'
import { Supports } from './components/Supports'
import { Footer } from './components/Footer'

export function LandingPage() {
    // const servicesRef = useRef<null | HTMLDivElement>(null)
    // const moveToServices = () => {
    //   servicesRef?.current?.scrollIntoView({ behavior: 'smooth' })
    // }

    const sectionRefs = {
        home: useRef<HTMLDivElement>(null),
        services: useRef<HTMLDivElement>(null),
        technology: useRef<HTMLDivElement>(null),
        resources: useRef<HTMLDivElement>(null),
        caseProjects: useRef<HTMLDivElement>(null),
        supports: useRef<HTMLDivElement>(null),
    }

    const handleScroll = (key: keyof typeof sectionRefs) => {
        sectionRefs[key].current?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div>
            <Header onScrolled={handleScroll} />
            <div ref={sectionRefs.home}>
                <HeroSection />
            </div>
            <div ref={sectionRefs.services}>
                <ServicesSection />
            </div>
            <div ref={sectionRefs.technology}>
                <TechnologySection />
            </div>
            <div ref={sectionRefs.resources}>
                <ResourcesSection />
            </div>
            <div ref={sectionRefs.caseProjects}>
                <CaseProjectSection />
            </div>
            <div ref={sectionRefs.supports}>
                <Supports />
            </div>
            <Footer />
        </div>
    )
}
