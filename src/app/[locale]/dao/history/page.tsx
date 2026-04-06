import { useTranslations } from "next-intl";
import { EmptyState } from "@/components/ui/EmptyState";

export default function HistoryPage() {
  const t = useTranslations();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EmptyState
        type="info"
        title="Voting History"
        description="View past and current DAO proposals, voting results, and governance decisions. This feature will be available when DAO governance launches."
        action={
          <a
            href="/dao"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition"
          >
            Back to DAO
          </a>
        }
      />
    </div>
  );
}
