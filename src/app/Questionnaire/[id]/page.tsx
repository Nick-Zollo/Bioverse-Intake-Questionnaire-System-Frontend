import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import QuestionnaireForm from './QuestionnaireForm';

interface Question {
  id: number;
  question: {
    type: string;
    options?: string[];
    question: string;
  };
}

interface QuestionnaireData {
  data: {
    Questions: Question[];
  };
}

export const revalidate = 60;

export default async function QuestionnairePage({ params }: { params: { id: string } }) {
  const { id: questionnaireId } = params;

  const userId = cookies().get('userId')?.value;

  if (!userId) {
    redirect('/login');
  }

  const response = await fetch(`http://localhost:3001/questionnaire/${questionnaireId}`);
  const data: QuestionnaireData = await response.json();

  if (!response.ok) {
    console.error('Failed to fetch questions:', data);
    return notFound();
  }

  const questions: Question[] = data.data.Questions;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Questionnaire</h1>
        <QuestionnaireForm userId={userId} questions={questions} questionnaireId={questionnaireId} />
      </main>
    </div>
  );
}
