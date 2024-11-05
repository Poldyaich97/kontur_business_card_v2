import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { BusinessCard } from '../components/BusinessCard';
import { users } from '../data/users';
import { Shield } from 'lucide-react';
import styles from '../components/BusinessCard.module.css';

export const CardViewer: React.FC = () => {
  const { id } = useParams();
  const userId = parseInt(id || '1');
  const user = users.find(u => u.id === userId);
  const [showRequestModal, setShowRequestModal] = React.useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
        <p className="text-white">Пользователь не найден</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative">
      <div className={styles.topButtons}>
        <Link
          to="/admin"
          className={styles.actionButton}
        >
          <Shield size={20} />
          <span>Админ панель</span>
        </Link>
        <button
          onClick={() => setShowRequestModal(true)}
          className={`${styles.actionButton} ${styles.requestButton}`}
        >
          Хочу визитку
        </button>
      </div>
      
      <div className="w-full max-w-3xl">
        <BusinessCard 
          user={user} 
          showRequestModal={showRequestModal}
          setShowRequestModal={setShowRequestModal}
        />
      </div>
    </div>
  );
};