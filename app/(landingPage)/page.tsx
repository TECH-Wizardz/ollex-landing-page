import { AssistantSection } from "./components/assistant-section";
import { CapabilitiesSection } from "./components/capabilities-section";
import { ChatSection } from "./components/chat-section";
import { ClientExperienceSection } from "./components/client-experience-section";
import { CtaSection } from "./components/cta-section";
import { FeaturesSection } from "./components/features-section";
import { GetStartedDialogProvider } from "./components/get-started-dialog-provider";
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
      <GetStartedDialogProvider>
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
        <SiteFooter />
        <MobileCtaBar />
      </GetStartedDialogProvider>
    </div>
  );
}
