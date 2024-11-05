import React from 'react';
import { Link } from 'react-router-dom';
import { useCardRequests } from '../context/CardRequestContext';
import { users } from '../data/users';
import { ArrowLeft, UserCircle, FileText } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { requests } = useCardRequests();

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/card/1"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Назад к визиткам</span>
          </Link>
          <h1 className="text-2xl font-bold text-white">Панель администратора</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Список сотрудников */}
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <UserCircle className="text-gray-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Сотрудники</h2>
            </div>
            <div className="space-y-4">
              {users.map(user => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg"
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium">{user.name}</h3>
                    <p className="text-gray-400 text-sm">{user.position}</p>
                  </div>
                  <Link
                    to={`/card/${user.id}`}
                    className="ml-auto text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Просмотр
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Список заявок */}
          <div className="bg-gray-900 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-gray-400" size={24} />
              <h2 className="text-xl font-semibold text-white">Заявки на визитки</h2>
            </div>
            {requests.length === 0 ? (
              <p className="text-gray-400 text-center py-8">Нет активных заявок</p>
            ) : (
              <div className="space-y-4">
                {requests.map((request, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-white font-medium">{request.name}</h3>
                        <p className="text-gray-400 text-sm">{request.phone}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(request.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-400">
                      Запрос для: {users.find(u => u.id === request.employeeId)?.name}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};