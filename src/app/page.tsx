import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import HowItWorks from '@/components/how-it-works' // Add this
import TestimonialsSection from '@/components/testimonials-section'
import CTASection from '@/components/cta-section'
import HomeAboutSection from '@/components/home_about_section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <HomeAboutSection />
      <TestimonialsSection />
    </>
  )
}