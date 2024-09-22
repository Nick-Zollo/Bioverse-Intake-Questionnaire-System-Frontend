import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

interface LoginRequest {
    username: string;
    password: string;
}

export async function POST(req: Request) {
    const { username, password }: LoginRequest = await req.json();

    const response = await fetch('https://bioverse-intake-questionnaire-system-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        const userId = data.userId;
        const cookie = serialize('userId', userId.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        const res = NextResponse.json({ message: 'Login successful', isAdmin: data.isAdmin });
        res.headers.append('Set-Cookie', cookie);
        return res;
    } else {
        return NextResponse.json({ message: data.message }, { status: response.status });
    }
}
