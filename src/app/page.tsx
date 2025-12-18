import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import TestimonialsSection from '@/components/testimonials-section'
import CTASection from '@/components/cta-section'
import HomeAboutSection from '@/components/home_about_section'
import HowItWorks from '@/components/how-it-works'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <HomeAboutSection />
      <TestimonialsSection />
    </div>
  )
}
