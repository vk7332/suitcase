import HeroSection from './HeroSection';
import LiveCourtroomDemo from './LiveCourtroomDemo';
import PainPoints from './PainPoints';
import Features from './Features';
import Pricing from './Pricing';
import TrustSecurity from './TrustSecurity';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';

import './marketing.css';

export default function LandingPage() {
    return (
        <div className="marketing-page">

            <HeroSection />

            <LiveCourtroomDemo />

            <PainPoints />

            <Features />

            <Pricing />

            <TrustSecurity />

            <Testimonials />

            <FAQ />

            <FinalCTA />

        </div>
    );
}