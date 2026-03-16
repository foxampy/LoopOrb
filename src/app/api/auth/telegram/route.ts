import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, first_name, last_name, username, photo_url, auth_date, hash } = body;

    // Verify Telegram data
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      return NextResponse.json(
        { error: 'Telegram bot not configured' },
        { status: 500 }
      );
    }

    // Check if auth_date is not too old (1 hour)
    const now = Math.floor(Date.now() / 1000);
    if (now - parseInt(auth_date) > 3600) {
      return NextResponse.json(
        { error: 'Auth data expired' },
        { status: 400 }
      );
    }

    // Verify hash
    const dataCheckString = Object.keys(body)
      .filter((key) => key !== 'hash')
      .sort()
      .map((key) => `${key}=${body[key]}`)
      .join('\n');

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(botToken).digest();
    const checkHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (checkHash !== hash) {
      return NextResponse.json(
        { error: 'Invalid auth data' },
        { status: 400 }
      );
    }

    // Return verified data
    return NextResponse.json({
      success: true,
      user: {
        id,
        first_name,
        last_name,
        username,
        photo_url,
      },
    });
  } catch (error) {
    console.error('Telegram auth error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
