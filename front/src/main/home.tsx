import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import editorImg from 'assets/pictures/home/editor.svg';
import mapImg from 'assets/pictures/home/map.svg';
import operationalStudiesImg from 'assets/pictures/home/operationalStudies.svg';
import rollingStockEditorImg from 'assets/pictures/home/rollingstockeditor.svg';
import stdcmImg from 'assets/pictures/home/stdcm.svg';
import useAllowedUserRoles from 'common/authorization/hooks/useAllowedUserRoles';
import CardSNCF from 'common/BootstrapSNCF/CardSNCF';
import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import ImageWithFallback from 'common/ImageWithFallback';
import NavBar from 'common/NavBar';
import './home.scss';

const trainImages = [
  '/assets/train/image.png',
  '/assets/train/image copy.png',
  '/assets/train/image copy 2.png',
  '/assets/train/image copy 3.png',
  '/assets/train/image copy 4.png',
  '/assets/train/image copy 5.png',
];

export default function Home() {
  const { t } = useTranslation('translation');
  const {
    operationalStudiesAllowed,
    stdcmAllowed,
    infraEditorAllowed,
    rollingStockEditorAllowed,
    mapAllowed,
  } = useAllowedUserRoles();

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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          {trainImages.map((img, index) => (
            <div
              key={img}
              className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}
            >
              <ImageWithFallback
                src={img}
                alt={`Поезд ${index + 1}`}
                showPlaceholder={false}
              />
            </div>
          ))}
          <div className="hero-overlay" />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            Информационная система железной дороги
          </h1>
          <p className="hero-subtitle">
            Дипломная работа — комплексная система управления, планирования и мониторинга железнодорожной инфраструктуры
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">85 731</div>
              <div className="stat-label">км путей в РФ</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">1 247</div>
              <div className="stat-label">активных поездов</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">мониторинг</div>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <main className="applications-section">
        <div className="section-header">
          <h2 className="section-title">Модули системы</h2>
          <p className="section-subtitle">Выберите нужный модуль для работы</p>
        </div>

        <div className="cards-container">
          <div className="row justify-content-center mb-4">
            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              {...(!operationalStudiesAllowed && { 'aria-disabled': true })}
            >
              <CardSNCF
                img={operationalStudiesImg}
                title={t('applications.operational-studies')}
                description={t('applications.descriptions.operational-studies')}
                link="/operational-studies/projects"
                data-testid="operationalStudies"
              />
            </div>

            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              {...(!stdcmAllowed && { 'aria-disabled': true })}
            >
              <CardSNCF
                img={stdcmImg}
                title={t('applications.stdcm')}
                description={t('applications.descriptions.stdcm')}
                link="/stdcm"
                openInNewTab
              />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-md-4 mb-4" {...(!infraEditorAllowed && { 'aria-disabled': true })}>
              <CardSNCF
                img={editorImg}
                title={t('applications.infrastructures-editor')}
                description={t('applications.descriptions.infrastructures-editor')}
                link="/editor"
              />
            </div>

            <div className="col-12 col-md-4 mb-4" {...(!rollingStockEditorAllowed && { 'aria-disabled': true })}>
              <CardSNCF
                img={rollingStockEditorImg}
                title={t('applications.rolling-stocks-editor')}
                description={t('applications.descriptions.rolling-stocks-editor')}
                link="/rolling-stock-editor"
              />
            </div>

            <div className="col-12 col-md-4 mb-4" {...(!mapAllowed && { 'aria-disabled': true })}>
              <CardSNCF
                img={mapImg}
                title={t('applications.reference-map')}
                description={t('applications.descriptions.reference-map')}
                link="/map"
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card feature-card--speed">
                <div className="feature-card__accent" />
                <div className="feature-icon">🚄</div>
                <h3>Высокая скорость</h3>
                <p>Быстрая обработка данных и мгновенный отклик системы в реальном времени</p>
                <div className="feature-card__footer">
                  <span className="feature-tag">Производительность</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card feature-card--security">
                <div className="feature-card__accent" />
                <div className="feature-icon">🔒</div>
                <h3>Безопасность</h3>
                <p>Многоуровневая защита данных, ролевой доступ и аудит всех операций</p>
                <div className="feature-card__footer">
                  <span className="feature-tag">Защита данных</span>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card feature-card--analytics">
                <div className="feature-card__accent" />
                <div className="feature-icon">📊</div>
                <h3>Аналитика</h3>
                <p>Подробные отчёты, интерактивные графики и визуализация потоков</p>
                <div className="feature-card__footer">
                  <span className="feature-tag">Отчётность</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Diploma Info Section */}
        <div className="diploma-section">
          <div className="diploma-section__inner">
            <div className="diploma-section__text">
              <h2>О дипломной работе</h2>
              <p>
                Система разработана в рамках дипломной работы на тему <strong>«Разработка информационной системы железной дороги»</strong>.
                Цель — создание современного программного комплекса для управления железнодорожной инфраструктурой,
                планирования маршрутов и мониторинга подвижного состава.
              </p>
              <div className="diploma-section__meta">
                <span>👨‍🎓 Денис Мельников</span>
                <span>🏛️ Донецкий государственный университет</span>
                <span>📅 2025</span>
              </div>
            </div>
            <div className="diploma-section__goals">
              <div className="diploma-goal">✅ Управление инфраструктурой</div>
              <div className="diploma-goal">✅ Планирование маршрутов</div>
              <div className="diploma-goal">✅ Мониторинг подвижного состава</div>
              <div className="diploma-goal">✅ Аналитика и отчётность</div>
              <div className="diploma-goal">✅ Разграничение прав доступа</div>
            </div>
          </div>
        </div>

        {/* Railway History Roadmap Section */}
        <div className="railway-history-section">
          <div className="section-header">
            <h2 className="section-title">История железных дорог России</h2>
            <p className="section-subtitle">Путь длиною в два века</p>
          </div>
          <div className="history-timeline">
            <div className="timeline-item timeline-item--left">
              <div className="timeline-year">1837</div>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card__icon">🏰</div>
                <h3>Первая железная дорога</h3>
                <p>Открытие Царскосельской железной дороги — первой публичной железной дороги в России. Протяжённость 27 км, соединяла Санкт-Петербург с Царским Селом и Павловском.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item--right">
              <div className="timeline-year">1851</div>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card__icon">🛤️</div>
                <h3>Николаевская железная дорога</h3>
                <p>Введена в эксплуатацию магистраль Санкт-Петербург — Москва. Протяжённость 645 км — одна из самых длинных двухпутных железных дорог того времени в мире.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item--left">
              <div className="timeline-year">1891</div>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card__icon">🌏</div>
                <h3>Транссибирская магистраль</h3>
                <p>Начало строительства Великого Сибирского пути — самой длинной железной дороги в мире (9 288 км). Строительство завершено в 1916 году, соединив европейскую Россию с Дальним Востоком.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item--right">
              <div className="timeline-year">1935</div>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card__icon">🚇</div>
                <h3>Московское метро</h3>
                <p>Открытие первой линии Московского метрополитена. Первые 13 станций соединили «Сокольники» и «Парк культуры». Сегодня это одна из крупнейших подземных сетей в мире.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item--left">
              <div className="timeline-year">1974</div>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card__icon">🏔️</div>
                <h3>БАМ — стройка века</h3>
                <p>Начало масштабного строительства Байкало-Амурской магистрали. Дорога протяжённостью 4 324 км прошла через вечную мерзлоту, горные хребты и крупные реки Сибири.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item--right">
              <div className="timeline-year">2009</div>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card__icon">⚡</div>
                <h3>«Сапсан» — эра высоких скоростей</h3>
                <p>Запуск высокоскоростного поезда «Сапсан» между Москвой и Санкт-Петербургом. Скорость до 250 км/ч, время в пути сократилось до 3 ч 45 мин.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item--left">
              <div className="timeline-year">2019</div>
              <div className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-card__icon">🌉</div>
                <h3>Крымский мост. Железнодорожный переход</h3>
                <p>Открытие железнодорожного сообщения по Крымскому мосту через Керченский пролив. Мост длиной 19 км — самый длинный в России.</p>
              </div>
            </div>
            <div className="timeline-item timeline-item--right">
              <div className="timeline-year">2030+</div>
              <div className="timeline-card timeline-card--future">
                <div className="timeline-card__icon">🚀</div>
                <h3>Высокоскоростные магистрали</h3>
                <p>Реализация национального проекта по строительству высокоскоростных железнодорожных магистралей. Скорость до 400 км/ч, связь крупнейших городов страны.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </ModalProvider>
  );
}
