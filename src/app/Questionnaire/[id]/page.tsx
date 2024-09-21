import { notFound } from 'next/navigation';

interface Question {
  id: number;
  question: {
    type: string;
    options?: string[];
    question: string;
  };
}

export const revalidate = 60;


export default async function QuestionnairePage({ params }: { params: { id: string } }) {
  const { id } = params;

  const response = await fetch(`http://localhost:3001/questionnaire/${id}`);
  const data = await response.json();

  if (!response.ok) {
    console.error('Failed to fetch questions:', data.message);
    return notFound();
  }

  const questions: Question[] = data.data.Questions;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Questionnaire</h1>
        {questions.length > 0 ? (
          questions.map((question) => {
            const parsedQuestion = question.question;
            return (
              <div key={question.id} className="max-w-sm rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300">
                <p className="text-xl font-semibold">{parsedQuestion.question}</p>
                {parsedQuestion.type === 'mcq' ? (
                  <ul>
                    {parsedQuestion.options?.map((option: string, index: number) => (
                      <li key={index}>
                        <label>
                          <input type="checkbox" />
                          {option}
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <input type="text" placeholder="Your answer" className="mt-2 p-2 border rounded" />
                )}
              </div>
            );
          })
        ) : (
          <p>No questions available.</p>
        )}
      </main>
    </div>
  );
}
