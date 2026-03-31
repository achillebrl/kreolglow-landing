import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { PacksSection } from '@/components/PacksSection'
import { ProofSection } from '@/components/ProofSection'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  const launchDate = process.env.NEXT_PUBLIC_LAUNCH_DATE ?? '2025-06-01T00:00:00'

  return (
    <>
      <Nav />
      <main>
        <Hero launchDate={launchDate} />
        <PacksSection />
        <ProofSection />
      </main>
      <Footer />
    </>
  )
}
