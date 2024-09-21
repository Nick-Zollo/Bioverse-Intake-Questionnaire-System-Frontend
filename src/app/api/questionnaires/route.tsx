import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const response = await fetch('http://localhost:3001/questionnaires');

    const data = await response.json();

    if (response.ok) {
        return NextResponse.json({
            status: 'success',
            results: data.results.length,
            data: {
                Questions: data.data.Questionnaires,
            },
        });
    } else {
        return NextResponse.json({ message: data.message }, { status: response.status });
    }
}
