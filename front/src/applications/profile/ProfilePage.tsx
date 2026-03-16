import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import ImageWithFallback from 'common/ImageWithFallback';
import NavBar from 'common/NavBar';
import useAuth from 'utils/hooks/useAuth';

import './ProfilePage.scss';

const trainImages = [
  '/assets/train/image.png',
  '/assets/train/image copy.png',
  '/assets/train/image copy 2.png',
  '/assets/train/image copy 3.png',
  '/assets/train/image copy 4.png',
  '/assets/train/image copy 5.png',
];

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % trainImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ModalProvider>
      <NavBar />
      <div className="profile-page">
        <div className="profile-hero">
          <div className="profile-hero__bg">
            {trainImages.map((img, index) => (
              <div
                key={img}
                className={`profile-hero__slide ${index === currentImageIndex ? 'active' : ''}`}
              >
                <ImageWithFallback src={img} alt={`Поезд ${index + 1}`} showPlaceholder={false} />
              </div>
            ))}
            <div className="profile-hero__overlay" />
          </div>
          <div className="profile-hero__content">
            <div className="profile-avatar">
              <span className="profile-avatar__initials">
                {username ? username.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
            <h1 className="profile-username">{username || 'Пользователь'}</h1>
            <p className="profile-role">Пользователь системы</p>
          </div>
        </div>

        <div className="profile-container">
          <section className="profile-section">
            <h2 className="profile-section__title">Информация об аккаунте</h2>
            <div className="profile-card">
              <div className="profile-field">
                <span className="profile-field__label">Имя пользователя</span>
                <span className="profile-field__value">{username || '—'}</span>
              </div>
              <div className="profile-field">
                <span className="profile-field__label">Статус</span>
                <span className="profile-field__value profile-field__value--active">Активен</span>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <h2 className="profile-section__title">Действия</h2>
            <div className="profile-actions">
              <button type="button" className="profile-btn profile-btn--secondary" onClick={() => navigate('/')}>
                На главную
              </button>
              <button type="button" className="profile-btn profile-btn--danger" onClick={() => logout()}>
                Выйти из системы
              </button>
            </div>
          </section>
        </div>
      </div>
    </ModalProvider>
  );
}
