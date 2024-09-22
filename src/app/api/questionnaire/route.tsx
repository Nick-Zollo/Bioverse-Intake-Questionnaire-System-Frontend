import { NextResponse } from 'next/server';

interface Answer {
  userId: string;
  questionId: number;
  answer: FormDataEntryValue | null;
}

export async function POST(req: Request) {
  const answers: Answer[] = await req.json();

  try {
    const response = await fetch('http://localhost:3001/answers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ message: errorData.message }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
