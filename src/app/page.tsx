import { Hero, ProofStrip } from "@/components/home/hero";
import { FlagshipWork } from "@/components/home/flagship";
import { SystemsLab } from "@/components/home/systems-lab";
import { Capabilities, Timeline, Principles, About } from "@/components/home/sections";
import { ContactCta } from "@/components/home/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <FlagshipWork />
      <SystemsLab />
      <Capabilities />
      <Timeline />
      <Principles />
      <About />
      <ContactCta />
    </>
  );
}
