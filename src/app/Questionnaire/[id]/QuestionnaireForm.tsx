'use client';

import React, { FormEvent } from 'react';

interface Question {
  id: number;
  question: {
    type: string;
    options?: string[];
    question: string;
  };
}

interface QuestionnaireFormProps {
  userId: string;
  questions: Question[];
  questionnaireId: string;
  previousAnswers: Record<number, string[]>;
}

const QuestionnaireForm: React.FC<QuestionnaireFormProps> = ({ userId, questions, questionnaireId, previousAnswers }) => {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const answers = questions.map((question) => {
      if (question.question.type === 'mcq') {
        const selectedOptions = formData.getAll(`question_${question.id}`);
        return {
          userId,
          questionId: question.id,
          answer: selectedOptions.length > 0 ? JSON.stringify(selectedOptions) : JSON.stringify([]),
        };
      } else {
        const answer = formData.get(`question_${question.id}`)?.toString().trim();
        if (answer === '') {
          return null;
        } else {
          return {
            userId,
            questionId: question.id,
            answer,
          };
        }
      }
    }).filter(Boolean);

    if (answers.length === 0) {
      console.error('No valid answers to submit');
      return;
    }

    const res = await fetch('/api/questionnaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answers),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error('Failed to submit answers:', errorData.message);
    } else {
      const result = await res.json();
      console.log('Submission result:', result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="userId" value={userId} />
      {questions.length > 0 ? (
        questions.map((question) => {
          const parsedQuestion = question.question;
          const previousAnswer = previousAnswers[question.id];

          return (
            <div key={question.id} className="max-w-sm rounded-lg shadow-md bg-white p-6 hover:shadow-lg transition-shadow duration-300">
              <p className="text-xl font-semibold">{parsedQuestion.question}</p>
              {parsedQuestion.type === 'mcq' ? (
                <ul>
                  {parsedQuestion.options?.map((option: string) => (
                    <li key={option}>
                      <label>
                        <input
                          type="checkbox"
                          name={`question_${question.id}`}
                          value={option}
                          defaultChecked={
                            previousAnswer && previousAnswer.length > 0
                              ? JSON.parse(previousAnswer[0]).includes(option)
                              : false
                          }
                        />
                        {option}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <input
                  type="text"
                  name={`question_${question.id}`}
                  placeholder="Your answer"
                  className="mt-2 p-2 border rounded"
                  defaultValue={previousAnswer?.[0] || ''}
                />
              )}
            </div>
          );
        })
      ) : (
        <p>No questions available.</p>
      )}
      <button type="submit" className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300">
        Submit Answers
      </button>
    </form>
  );
};

export default QuestionnaireForm;
