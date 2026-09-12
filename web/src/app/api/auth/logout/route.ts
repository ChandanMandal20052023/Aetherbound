import { NextResponse } from 'next/server';
import { clearCookie } from '@/lib/auth';

export async function POST() {
  await clearCookie();
  return NextResponse.json({ success: true });
}
