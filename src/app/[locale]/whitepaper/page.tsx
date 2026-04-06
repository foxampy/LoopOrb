import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/ui/EmptyState";

export default function WhitepaperPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EmptyState
        type="info"
        title="Whitepaper Coming Soon"
        description="Our comprehensive whitepaper is currently being prepared. It will cover VODeco architecture, tokenomics, technology stack, and roadmap. Check back soon or read our Litepaper in the meantime."
        action={
          <a
            href="/litepaper"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition"
          >
            Read Litepaper
          </a>
        }
      />
    </div>
  );
}
