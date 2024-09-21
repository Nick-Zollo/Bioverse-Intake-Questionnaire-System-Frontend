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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {questionnaires.length > 0 ? (
          questionnaires.map((questionnaire: Questionnaire) => (
            <div key={questionnaire.id} className="max-w-sm rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-semibold">{questionnaire.name}</h2>
              <p className="text-gray-700">Description not provided.</p>
              <button className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
                Start
              </button>
            </div>
          ))
        ) : (
          <p>No questionnaires available.</p>
        )}
      </main>
    </div>
  );
}
