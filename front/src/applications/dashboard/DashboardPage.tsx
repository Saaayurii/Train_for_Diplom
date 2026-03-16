import { useState, useEffect } from 'react';

import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import ImageWithFallback from 'common/ImageWithFallback';
import NavBar from 'common/NavBar';

import './DashboardPage.scss';

const trainImages = [
  '/assets/train/image.png',
  '/assets/train/image copy.png',
  '/assets/train/image copy 2.png',
  '/assets/train/image copy 3.png',
  '/assets/train/image copy 4.png',
  '/assets/train/image copy 5.png',
];

const statCards = [
  {
    value: '1 247',
    unit: 'поездов',
    label: 'активных',
    trend: '+12 за час',
    trendUp: true,
    color: 'teal',
    icon: '🚂',
  },
  {
    value: '98.7%',
    unit: '',
    label: 'пунктуальность',
    trend: '+0.3% к вчера',
    trendUp: true,
    color: 'blue',
    icon: '⏱',
  },
  {
    value: '342',
    unit: 'маршрута',
    label: 'активных',
    trend: '−2 на обслуживании',
    trendUp: false,
    color: 'indigo',
    icon: '🗺',
  },
  {
    value: '2.3 млн',
    unit: '',
    label: 'пассажиров/день',
    trend: '+4.1% к прошлой неделе',
    trendUp: true,
    color: 'emerald',
    icon: '👥',
  },
];

const systemComponents = [
  { name: 'База данных', status: 'Онлайн', ok: true },
  { name: 'API сервер', status: 'Онлайн', ok: true },
  { name: 'Картографический модуль', status: 'Онлайн', ok: true },
  { name: 'Планировщик маршрутов', status: 'Онлайн', ok: true },
  { name: 'Модуль расписания', status: 'Онлайн', ok: true },
  { name: 'Система авторизации', status: 'Онлайн', ok: true },
];

const events = [
  { time: '14:32', event: 'Отправление', route: 'Москва → Санкт-Петербург', train: '001А', status: 'В пути' },
  { time: '14:28', event: 'Прибытие', route: 'Казань → Москва', train: '116Ч', status: 'Выполнено' },
  { time: '14:15', event: 'Отправление', route: 'Москва → Казань', train: '003Э', status: 'Задержан' },
  { time: '14:07', event: 'Прибытие', route: 'Екатеринбург → Москва', train: '016А', status: 'Выполнено' },
  { time: '13:55', event: 'Отправление', route: 'Москва → Сочи', train: '102А', status: 'В пути' },
  { time: '13:40', event: 'Прибытие', route: 'Санкт-Петербург → Москва', train: '004А', status: 'Выполнено' },
  { time: '13:22', event: 'Отправление', route: 'Москва → Новосибирск', train: '026А', status: 'В пути' },
  { time: '13:10', event: 'Техническое обслуживание', route: 'Москва → Воронеж', train: '091А', status: 'Задержан' },
];

const directions = [
  { name: 'Москва — Санкт-Петербург', percent: 87 },
  { name: 'Москва — Казань', percent: 64 },
  { name: 'Москва — Екатеринбург', percent: 71 },
  { name: 'Москва — Сочи', percent: 55 },
  { name: 'Москва — Новосибирск', percent: 43 },
];

function statusClass(status: string) {
  if (status === 'Выполнено') return 'badge badge--green';
  if (status === 'В пути') return 'badge badge--blue';
  return 'badge badge--orange';
}

export default function DashboardPage() {
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
      <div className="dashboard-page">
        <div className="dashboard-hero">
          <div className="hero-background">
            {trainImages.map((img, index) => (
              <div key={img} className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}>
                <ImageWithFallback src={img} alt={`Поезд ${index + 1}`} showPlaceholder={false} />
              </div>
            ))}
            <div className="hero-overlay" />
          </div>
          <div className="dashboard-hero__content">
            <h1 className="dashboard-hero__title">Аналитическая панель</h1>
            <p className="dashboard-hero__subtitle">Мониторинг работы системы в режиме реального времени</p>
          </div>
        </div>

        <div className="dashboard-container">
          <div className="dashboard-stats">
            {statCards.map((card) => (
              <div key={card.label} className={`stat-card stat-card--${card.color}`}>
                <div className="stat-card__icon">{card.icon}</div>
                <div className="stat-card__body">
                  <div className="stat-card__value">
                    {card.value}
                    {card.unit && <span className="stat-card__unit"> {card.unit}</span>}
                  </div>
                  <div className="stat-card__label">{card.label}</div>
                  <div className={`stat-card__trend ${card.trendUp ? 'up' : 'down'}`}>
                    {card.trendUp ? '↑' : '↓'} {card.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <section className="dashboard-section">
            <h2 className="dashboard-section__title">Статус системы</h2>
            <div className="system-grid">
              {systemComponents.map((component) => (
                <div key={component.name} className="system-card">
                  <div className="system-card__dot" />
                  <span className="system-card__name">{component.name}</span>
                  <span className={`badge ${component.ok ? 'badge--green' : 'badge--orange'}`}>
                    {component.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <h2 className="dashboard-section__title">Последние события</h2>
            <div className="dashboard-table-wrap">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Время</th>
                    <th>Поезд</th>
                    <th>Событие</th>
                    <th>Маршрут</th>
                    <th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((row) => (
                    <tr key={`${row.time}-${row.train}`}>
                      <td className="table-time">{row.time}</td>
                      <td className="table-train">{row.train}</td>
                      <td>{row.event}</td>
                      <td>{row.route}</td>
                      <td>
                        <span className={statusClass(row.status)}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="dashboard-section">
            <h2 className="dashboard-section__title">Загруженность направлений</h2>
            <div className="directions-list">
              {directions.map((dir) => (
                <div key={dir.name} className="direction-item">
                  <div className="direction-item__header">
                    <span className="direction-item__name">{dir.name}</span>
                    <span className="direction-item__percent">{dir.percent}%</span>
                  </div>
                  <div className="direction-bar">
                    <div
                      className="direction-bar__fill"
                      style={{ width: `${dir.percent}%`, '--pct': dir.percent } as React.CSSProperties}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ModalProvider>
  );
}
