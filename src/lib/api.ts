import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./auth";

export type AuthenticatedHandler = (
  req: NextRequest,
  context: { user: { id: string; email: string | null; role: string } }
) => Promise<NextResponse>;

export function withAuth(handler: AuthenticatedHandler) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return handler(req, {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  };
}

export function withRole(allowedRoles: string[], handler: AuthenticatedHandler) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return handler(req, {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  };
}

export function successResponse(data: unknown, status = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

export function errorResponse(message: string, status = 400, details?: unknown) {
  return NextResponse.json(
    { success: false, error: message, details },
    { status }
  );
}

// Pagination helper
export function getPaginationParams(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
    skip: (Math.max(1, page) - 1) * Math.min(100, Math.max(1, limit)),
  };
}

// Format pagination response
export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page * limit < total,
    },
  };
}
