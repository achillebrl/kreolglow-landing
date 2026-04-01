import { Marquee } from '@/components/Marquee'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { FeaturesRow } from '@/components/FeaturesRow'
import { PacksSection } from '@/components/PacksSection'
import { BrandStory } from '@/components/BrandStory'
import { LifestyleSection } from '@/components/LifestyleSection'
import { ProofSection } from '@/components/ProofSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE ?? '2025-06-01T00:00:00'

  return (
    <>
      <Marquee />
      <Nav />
      <main>
        <Hero launchDate={launchDate} />
        <FeaturesRow />
        <PacksSection />
        <LifestyleSection />
        <BrandStory />
        <ProofSection />
      </main>
      <Footer />
    </>
  )
}
