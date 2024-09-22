'use client';

import React, { useState } from 'react';
import Modal from './Modal';

interface User {
  id: number;
  username: string;
  completed_questionnaires: number;
}

interface Question {
  type: string;
  options?: string[];
  question: string;
}

interface Answer {
  question_id: number;
  answer: string | string[];
  question: Question;
}

interface RawApiResponse {
  question_id: number;
  answer: string;
  question: Question;
}

interface ApiResponse {
  status: string;
  results: number;
  data: RawApiResponse[];
}

const UserRow: React.FC<{ user: User }> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionnaires, setQuestionnaires] = useState<Answer[]>([]);

  const handleRowClick = async () => {
    try {
      const response = await fetch(`https://bioverse-intake-questionnaire-system-backend.vercel.app/api/answers/${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();

      const formattedData: Answer[] = data.data.map(item => ({
        question_id: item.question_id,
        answer: item.answer.startsWith('[') ? JSON.parse(item.answer) : item.answer,
        question: item.question,
      }));

      setQuestionnaires(formattedData);
      setIsOpen(true);
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  };

  return (
    <>
      <tr className="hover:bg-gray-100 cursor-pointer" onClick={handleRowClick}>
        <td className="border px-4 py-2">{user.username}</td>
        <td className="border px-4 py-2">{user.completed_questionnaires}</td>
      </tr>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          questionnaires={questionnaires}
        />
      )}
    </>
  );
};

export default UserRow;
