'use client';

import React, { useState } from 'react';
import Modal from './Modal';

interface User {
  id: number;
  username: string;
  completedQuestionnaires: number;
}

interface Answer {
  question_id: number;
  answer: string;
}

interface ApiResponse {
  status: string;
  results: number;
  data: Answer[];
}

const UserRow: React.FC<{ user: User }> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [questionnaires, setQuestionnaires] = useState<Answer[]>([]);

  const handleRowClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/answers/${user.id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json();

      const formattedData = data.data.map((item: Answer) => ({
        question_id: item.question_id,
        answer: item.answer.startsWith('[') ? JSON.parse(item.answer) : item.answer,
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
        <td className="border px-4 py-2">{user.completedQuestionnaires}</td>
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
