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

interface PreviousAnswer {
  question_id: number;
  answer: string;
}

interface PreviousAnswersData {
  data: PreviousAnswer[];
}

export const revalidate = 60;

export default async function QuestionnairePage({ params }: { params: { id: string } }) {
  const { id: questionnaireId } = params;

  const userId = cookies().get('userId')?.value;

  if (!userId) {
    redirect('/login');
  }

  const response = await fetch(`https://bioverse-intake-questionnaire-system-backend.vercel.app/api/questionnaire/${questionnaireId}`);
  const data: QuestionnaireData = await response.json();

  if (!response.ok) {
    console.error('Failed to fetch questions:', data);
    return notFound();
  }

  const questions: Question[] = data.data.Questions;

  const previousAnswersResponse = await fetch(`https://bioverse-intake-questionnaire-system-backend.vercel.app/api/answers/${userId}`);

  if (!previousAnswersResponse.ok) {
    console.error('Failed to fetch previous answers:', previousAnswersResponse.status);
  }

  const previousAnswersData: PreviousAnswersData = await previousAnswersResponse.json();
  let previousAnswers: Record<number, string[]> = {};

  if (previousAnswersResponse.ok) {
    previousAnswers = previousAnswersData.data.reduce((acc: Record<number, string[]>, answer: PreviousAnswer) => {
      if (!acc[answer.question_id]) {
        acc[answer.question_id] = [];
      }
      acc[answer.question_id].push(answer.answer);
      return acc;
    }, {});
  }

  return (
    <div className="grid justify-items-center min-h-screen pt-10">
      <main className="flex flex-col row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Questionnaire</h1>
        <QuestionnaireForm
          userId={userId}
          questions={questions}
          questionnaireId={questionnaireId}
          previousAnswers={previousAnswers}
        />
      </main>
    </div>
  );
}
