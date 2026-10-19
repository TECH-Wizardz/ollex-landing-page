import { AssistantSection } from "./components/assistant-section";
import { CapabilitiesSection } from "./components/capabilities-section";
import { ChatSection } from "./components/chat-section";
import { ClientExperienceSection } from "./components/client-experience-section";
import { CtaSection } from "./components/cta-section";
import { DemoDialogProvider } from "./components/demo-dialog-provider";
import { FeaturesSection } from "./components/features-section";
import { HeroSection } from "./components/hero-section";
import { MobileCtaBar } from "./components/mobile-cta-bar";
import { PricingSection } from "./components/pricing-section";
import { ProofSection } from "./components/proof-section";
import { ProviderSection } from "./components/provider-section";
import { SecuritySection } from "./components/security-section";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";
import { UseCaseProvider } from "./components/use-case-provider";
import { UseCasesSection } from "./components/use-cases-section";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-lp-bg text-lp-ink">
      <DemoDialogProvider>
        <UseCaseProvider>
          <SiteHeader />
          <main>
            <HeroSection />
            <FeaturesSection />
            <ClientExperienceSection />
            <ChatSection />
            <CapabilitiesSection />
            <AssistantSection />
            <ProviderSection />
            <UseCasesSection />
            <ProofSection />
            <SecuritySection />
            <PricingSection />
            <CtaSection />
          </main>
        </UseCaseProvider>
      </DemoDialogProvider>
      <SiteFooter />
      <MobileCtaBar />
    </div>
  );
}
