'use client';

import { HeroSection } from '@/components/sections/home/HeroSection';
import { TrustStrip } from '@/components/sections/home/TrustStrip';
import { ServicesOverview } from '@/components/sections/home/ServicesOverview';
import { WhyChooseUs } from '@/components/sections/home/WhyChooseUs';
import { FeaturedProjects } from '@/components/sections/home/FeaturedProjects';
import { FounderSpotlight } from '@/components/sections/home/FounderSpotlight';
import { TestimonialsPreview } from '@/components/sections/home/TestimonialsPreview';
import { LatestInsights } from '@/components/sections/home/LatestInsights';
import { FinalCTA } from '@/components/sections/home/FinalCTA';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ServicesOverview />
      <WhyChooseUs />
      <FeaturedProjects />
      <FounderSpotlight />
      <TestimonialsPreview />
      <LatestInsights />
      <FinalCTA />
    </>
  );
}
