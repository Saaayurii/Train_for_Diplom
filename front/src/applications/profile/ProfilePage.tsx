import { useNavigate } from 'react-router-dom';

import NavBar from 'common/NavBar';
import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import useAuth from 'utils/hooks/useAuth';
import './ProfilePage.scss';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { username, logout } = useAuth();

  return (
    <ModalProvider>
      <NavBar />
      <div className="profile-page">
        <div className="profile-hero">
          <div className="profile-avatar">
            <span className="profile-avatar__initials">
              {username ? username.charAt(0).toUpperCase() : '?'}
            </span>
          </div>
          <h1 className="profile-username">{username || 'Пользователь'}</h1>
          <p className="profile-role">Пользователь системы</p>
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
