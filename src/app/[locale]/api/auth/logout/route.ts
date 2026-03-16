import { successResponse } from "@/lib/api";

export async function POST() {
  // Demo mode - просто возвращаем success
  return successResponse({ message: "Logged out successfully" });
}
