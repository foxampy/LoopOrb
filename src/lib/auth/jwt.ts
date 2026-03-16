// JWT signing utility for backward compatibility
import { generateToken } from "../auth";
export const signJWT = generateToken;

// Re-export all auth functions
export * from "../auth";
