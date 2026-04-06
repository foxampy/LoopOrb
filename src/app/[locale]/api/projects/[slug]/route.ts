import { NextRequest } from "next/server";
import { successResponse, errorResponse } from "@/lib/api";

// TODO: Connect to database when backend is ready
// const demoProjects has been removed - no mock data

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // TODO: Fetch from database
    // const project = await prisma.project.findUnique({ where: { slug } });

    return errorResponse("Projects are not yet available. The platform is in development.", 503);
  } catch (error) {
    console.error("Get project error:", error);
    return errorResponse("Internal server error", 500);
  }
}
