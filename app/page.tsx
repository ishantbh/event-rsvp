import { HeroSection } from '@/components/landing-page/hero-section'
import { HowItWorks } from '@/components/landing-page/how-it-works'
import { ValueSection } from '@/components/landing-page/value-section'

export default async function Home() {
  return (
    <div className='flex flex-1 flex-col gap-6'>
      <HeroSection />
      <HowItWorks />
      <ValueSection />
    </div>
  )
}
