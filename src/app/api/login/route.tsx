import { NextResponse } from 'next/server';

interface LoginRequest {
    username: string;
    password: string;
}

export async function POST(req: Request) {
    const { username, password }: LoginRequest = await req.json();

    const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
        return NextResponse.json({ message: 'Login successful', isAdmin: data.isAdmin });
    } else {
        return NextResponse.json({ message: data.message }, { status: response.status });
    }
}
