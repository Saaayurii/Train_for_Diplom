import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'utils/hooks/useAuth';
import { osrdGatewayApi } from 'common/api/osrdGatewayApi';
import './AuthPage.scss';

const AuthPage = () => {
  const navigate = useNavigate();
  const { isUserLogged, isLoading, authError } = useAuth();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const { data: providers, isLoading: providersLoading } =
    osrdGatewayApi.endpoints.getProviders.useQuery();

  const [providerLogin] = osrdGatewayApi.endpoints.providerLogin.useMutation();

  useEffect(() => {
    if (isUserLogged) {
      navigate('/');
    }
  }, [isUserLogged, navigate]);

  const handleProviderLogin = async (providerId: string) => {
    try {
      setSelectedProvider(providerId);
      const response = await providerLogin({ provider: providerId }).unwrap();
      if (response.type === 'redirect') {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error('Provider login error:', error);
      setSelectedProvider(null);
    }
  };

  if (isUserLogged) {
    return null;
  }

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-wave auth-wave-1"></div>
        <div className="auth-wave auth-wave-2"></div>
        <div className="auth-wave auth-wave-3"></div>
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">🚄</div>
            <h1 className="auth-title">Железная дорога</h1>
            <p className="auth-subtitle">Информационная система управления</p>
          </div>

          <div className="auth-content">
            {authError === 'auth_unavailable' && (
              <div className="auth-message auth-message-warning">
                <div className="message-icon">⚠️</div>
                <div className="message-content">
                  <h3>Авторизация недоступна</h3>
                  <p>
                    Сервер авторизации не отвечает. Вы вошли в систему как гостевой пользователь.
                  </p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => navigate('/')}
                  >
                    Продолжить как гость
                  </button>
                </div>
              </div>
            )}

            {authError === 'auth_failed' && (
              <div className="auth-message auth-message-error">
                <div className="message-icon">❌</div>
                <div className="message-content">
                  <h3>Ошибка авторизации</h3>
                  <p>Не удалось выполнить вход в систему. Попробуйте еще раз.</p>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => window.location.reload()}
                  >
                    Повторить попытку
                  </button>
                </div>
              </div>
            )}

            {!authError && isLoading && (
              <div className="auth-loading">
                <div className="loading-spinner"></div>
                <p>Проверка авторизации...</p>
              </div>
            )}

            {!authError && !isLoading && providers && providers.length > 0 && (
              <div className="auth-providers">
                <h2>Выберите способ входа</h2>
                <div className="providers-list">
                  {providers.map((provider) => (
                    <button
                      key={provider.provider_id}
                      type="button"
                      className="provider-button"
                      onClick={() => handleProviderLogin(provider.provider_id)}
                      disabled={selectedProvider !== null}
                    >
                      {selectedProvider === provider.provider_id ? (
                        <>
                          <div className="loading-spinner-small"></div>
                          <span>Перенаправление...</span>
                        </>
                      ) : (
                        <>
                          <div className="provider-icon">🔑</div>
                          <span>{provider.backend}</span>
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!authError && !isLoading && providersLoading && (
              <div className="auth-loading">
                <div className="loading-spinner"></div>
                <p>Загрузка методов авторизации...</p>
              </div>
            )}
          </div>

          <div className="auth-footer">
            <p>© {new Date().getFullYear()} Информационная система железной дороги</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
