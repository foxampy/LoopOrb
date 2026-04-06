import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ObjectsPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EmptyState
        type="info"
        title="Water Objects"
        description="Browse and manage water resource objects in the ecosystem. This feature will be available when VOD-Lab sensors are deployed and connected."
        action={
          <a
            href="/vod-lab"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition"
          >
            Learn About VOD-Lab
          </a>
        }
      />
    </div>
  );
}
