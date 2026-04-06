"use client";

import { EmptyState } from "@/components/ui/EmptyState";
import { useRouter } from "@/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <EmptyState
        type="info"
        title="Password Recovery"
        description="Password recovery functionality is under development. If you need help accessing your account, please contact support."
        action={
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition"
            >
              Back to Login
            </button>
          </div>
        }
      />
    </div>
  );
}
