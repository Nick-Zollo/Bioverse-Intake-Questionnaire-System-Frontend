"use client";

interface Answer {
  question_id: number;
  answer: string | string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  questionnaires: Answer[];
}

const Modal = ({ isOpen, onClose, questionnaires }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button onClick={onClose} className="text-red-500">Close</button>
        {questionnaires.map((q) => (
          <div key={q.question_id} className="mt-4">
            <p>
              <strong>Q: </strong>Question ID {q.question_id} <strong>A: </strong>{Array.isArray(q.answer) ? q.answer.join(', ') : q.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Modal;
