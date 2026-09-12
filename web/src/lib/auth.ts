/**
 * JWT auth helpers — sign, verify, set/clear HttpOnly cookie.
 * Uses `jose` (edge-runtime compatible, works in Next.js middleware).
 */
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'aetherbound_session';
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'aetherbound-dev-secret-fallback',
);

export interface JWTPayload {
  userId: string;
  email: string;
  username: string;
}

/** Sign a JWT and set it as an HttpOnly cookie (7-day expiry). */
export async function signAndSetCookie(payload: JWTPayload): Promise<void> {
  const token = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/** Read and verify the JWT from the cookie. Returns null if invalid/missing. */
export async function verifySession(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}

/** Clear the session cookie (logout). */
export async function clearCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, '', { maxAge: 0, path: '/' });
}

/** Read token string directly (used in middleware where cookies() isn't available). */
export async function verifyTokenString(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as unknown as JWTPayload;
  } catch {
    return null;
  }
}
