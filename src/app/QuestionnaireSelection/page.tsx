import Link from 'next/link';

interface Questionnaire {
  id: number;
  name: string;
}

export const revalidate = 60;

export default async function QuestionnaireSelection() {
  const response = await fetch('http://localhost:3001/questionnaires');
  const data = await response.json();

  if (!response.ok) {
    console.error('Failed to fetch questionnaires:', data.message);
    return <p>No questionnaires available.</p>;
  }

  const questionnaires: Questionnaire[] = data.data.Questionnaires;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-8">
      <main className="flex flex-col gap-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold">Select a Questionnaire</h1>
        {questionnaires.length > 0 ? (
          questionnaires.map((questionnaire: Questionnaire) => (
            <div key={questionnaire.id} className="w-full rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300 space-y-4">
              <h2 className="text-xl font-semibold">{questionnaire.name}</h2>
              <p className="text-gray-700">Description not provided.</p>
              <Link href={`/Questionnaire/${questionnaire.id}`}>
                <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
                  Start
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No questionnaires available.</p>
        )}
      </main>
    </div>
  );
}
