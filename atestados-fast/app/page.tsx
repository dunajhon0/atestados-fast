import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import DemoSimulator from '@/components/DemoSimulator';
import BenefitsLimits from '@/components/BenefitsLimits';
import BestPractices from '@/components/BestPractices';
import Resources from '@/components/Resources';
import FutureTools from '@/components/FutureTools';
import FAQ from '@/components/FAQ';
import AdSlot from '@/components/AdSlot';
import GptPublicCta from '@/components/GptPublicCta';

export default function Home() {
    const adClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
    const adHeader = process.env.NEXT_PUBLIC_ADSENSE_SLOT_HEADER;
    const adInArticle = process.env.NEXT_PUBLIC_ADSENSE_SLOT_INARTICLE;

    return (
        <div className="flex flex-col gap-16 md:gap-24 pb-20">
            <Hero />

            {adClientId && adHeader && (
                <div className="container mx-auto px-4 flex justify-center mt-8">
                    <div className="w-full max-w-[728px] border border-gray-200 bg-gray-50 rounded p-2 text-center text-xs text-gray-400">
                        <span>Publicidad</span>
                        <AdSlot clientId={adClientId} slotId={adHeader} format="auto" />
                    </div>
                </div>
            )}

            <HowItWorks />

            <div className="bg-slate-50 border-y border-slate-200 py-16">
                <DemoSimulator />
            </div>

            <BenefitsLimits />

            {adClientId && adInArticle && (
                <div className="container mx-auto px-4 flex justify-center my-8">
                    <div className="w-full max-w-[728px] border border-gray-200 bg-gray-50 rounded p-2 text-center text-xs text-gray-400">
                        <span>Publicidad</span>
                        <AdSlot clientId={adClientId} slotId={adInArticle} format="fluid" layoutKey="-gw-1+2a-9x+5c" />
                    </div>
                </div>
            )}

            <BestPractices />
            <FAQ />
            <Resources />
            <FutureTools />
            <GptPublicCta />
        </div>
    );
}
