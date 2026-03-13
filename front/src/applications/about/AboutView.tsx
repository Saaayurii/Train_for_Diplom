import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import NavBar from 'common/NavBar';

import './AboutView.scss';

export default function AboutView() {
  return (
    <ModalProvider>
      <NavBar />
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <h1 className="about-hero-title">О системе</h1>
            <p className="about-hero-subtitle">
              Современная информационная система управления железнодорожной инфраструктурой
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="about-container">
          {/* Overview Section */}
          <section className="about-section">
            <h2 className="section-title">Обзор системы</h2>
            <div className="content-grid">
              <div className="content-card">
                <div className="card-icon">🚄</div>
                <h3>Высокотехнологичное решение</h3>
                <p>
                  Наша система представляет собой комплексное решение для управления всеми аспектами
                  железнодорожной инфраструктуры, от планирования маршрутов до мониторинга
                  подвижного состава.
                </p>
              </div>
              <div className="content-card">
                <div className="card-icon">📊</div>
                <h3>Аналитика и отчетность</h3>
                <p>
                  Мощные инструменты анализа данных позволяют оптимизировать работу
                  железнодорожного транспорта, сокращать затраты и повышать эффективность
                  перевозок.
                </p>
              </div>
              <div className="content-card">
                <div className="card-icon">🔒</div>
                <h3>Безопасность и надежность</h3>
                <p>
                  Система обеспечивает высокий уровень безопасности данных и непрерывность работы
                  благодаря современным технологиям защиты информации.
                </p>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="about-section features-section">
            <h2 className="section-title">Ключевые возможности</h2>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-number">01</div>
                <div className="feature-content">
                  <h3>Управление инфраструктурой</h3>
                  <p>
                    Полный контроль над железнодорожной инфраструктурой: пути, станции, депо,
                    сигнализация. Визуализация в режиме реального времени на интерактивной карте.
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">02</div>
                <div className="feature-content">
                  <h3>Планирование маршрутов</h3>
                  <p>
                    Интеллектуальная система построения оптимальных маршрутов с учетом
                    загруженности путей, расписания и технических характеристик подвижного состава.
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">03</div>
                <div className="feature-content">
                  <h3>Мониторинг подвижного состава</h3>
                  <p>
                    Отслеживание состояния и местоположения поездов в реальном времени. Управление
                    парком подвижного состава и планирование технического обслуживания.
                  </p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-number">04</div>
                <div className="feature-content">
                  <h3>Операционные исследования</h3>
                  <p>
                    Проведение комплексных исследований для оптимизации работы железной дороги.
                    Моделирование различных сценариев и анализ эффективности решений.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section className="about-section technology-section">
            <h2 className="section-title">Технологии</h2>
            <div className="tech-grid">
              <div className="tech-card">
                <h4>Frontend</h4>
                <ul>
                  <li>React + TypeScript</li>
                  <li>Redux для управления состоянием</li>
                  <li>MapLibre для картографии</li>
                  <li>D3.js для визуализации</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>Backend</h4>
                <ul>
                  <li>Python + FastAPI</li>
                  <li>PostgreSQL + PostGIS</li>
                  <li>Redis для кэширования</li>
                  <li>Celery для фоновых задач</li>
                </ul>
              </div>
              <div className="tech-card">
                <h4>Инфраструктура</h4>
                <ul>
                  <li>Docker контейнеризация</li>
                  <li>Kubernetes оркестрация</li>
                  <li>CI/CD автоматизация</li>
                  <li>Мониторинг и логирование</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="about-section stats-section">
            <h2 className="section-title">Статистика</h2>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">10,000+</div>
                <div className="stat-label">Километров путей</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">500+</div>
                <div className="stat-label">Составов в день</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Круглосуточный мониторинг</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">99.9%</div>
                <div className="stat-label">Время безотказной работы</div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="about-section contact-section">
            <h2 className="section-title">Свяжитесь с нами</h2>
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">📧</div>
                <h4>Email</h4>
                <p>info@railway.ru</p>
                <p>support@railway.ru</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📞</div>
                <h4>Телефон</h4>
                <p>+7 (495) 123-45-67</p>
                <p>+7 (800) 555-35-35</p>
              </div>
              <div className="contact-card">
                <div className="contact-icon">📍</div>
                <h4>Адрес</h4>
                <p>г. Москва</p>
                <p>ул. Железнодорожная, д. 1</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </ModalProvider>
  );
}
