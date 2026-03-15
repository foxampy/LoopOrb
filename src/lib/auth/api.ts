import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

export interface AuthResult {
  user: {
    id: string;
    email: string | null;
    name: string;
    role: string;
  } | null;
  session: {
    id: string;
    expiresAt: Date;
  } | null;
}

export async function authenticateRequest(request: NextRequest): Promise<AuthResult> {
  try {
    // Try to get session token from cookies
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session_token")?.value;
    
    if (!sessionToken) {
      return { user: null, session: null };
    }
    
    // Find session
    const session = await prisma.session.findUnique({
      where: { token: sessionToken },
      include: { user: true }
    });
    
    if (!session || session.expiresAt < new Date()) {
      return { user: null, session: null };
    }
    
    return {
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role,
      },
      session: {
        id: session.id,
        expiresAt: session.expiresAt,
      }
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { user: null, session: null };
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthResult> {
  const auth = await authenticateRequest(request);
  
  if (!auth.user) {
    throw new Error("Authentication required");
  }
  
  return auth;
}

export function createSessionToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}
