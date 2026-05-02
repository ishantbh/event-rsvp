import { HeroSection } from '@/components/landing-page/hero-section'

export default async function Home() {
  return (
    <div className='flex flex-1 flex-col gap-6'>
      <HeroSection />
    </div>
  )
}
