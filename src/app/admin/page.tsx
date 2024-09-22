import React from 'react';
import UserRow from './UserRow';

interface User {
  id: number;
  username: string;
  completedQuestionnaires: number;
}

const AdminPage = async () => {
  const response = await fetch('http://localhost:3001/users');
  const data = await response.json();

  if (!response.ok) {
    console.error('Failed to fetch users:', data.message);
    return <p>No users available.</p>;
  }

  const users: User[] = data.data.Users;

  if (!Array.isArray(users)) {
    console.error('Expected an array but got:', users);
    return <p>Invalid users data format.</p>;
  }

  return (
    <div className="pt-20 max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <table className="min-w-full mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Completed Questionnaires</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <UserRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
