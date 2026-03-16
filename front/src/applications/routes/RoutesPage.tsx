import { useState, useEffect } from 'react';

import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import ImageWithFallback from 'common/ImageWithFallback';
import NavBar from 'common/NavBar';

import './RoutesPage.scss';

const trainImages = [
  '/assets/train/image.png',
  '/assets/train/image copy.png',
  '/assets/train/image copy 2.png',
  '/assets/train/image copy 3.png',
  '/assets/train/image copy 4.png',
  '/assets/train/image copy 5.png',
];

interface RouteCard {
  title: string;
  distance: string;
  time: string;
  trains: string;
  stops: string[];
  accentColor: string;
  badge?: string;
}

const routeCards: RouteCard[] = [
  {
    title: 'Москва — Санкт-Петербург',
    distance: '714 км',
    time: '3ч 45мин (Сапсан)',
    trains: '30 пар/день',
    stops: ['Тверь', 'Бологое'],
    accentColor: '#14b8a6',
    badge: 'Высокоскоростной',
  },
  {
    title: 'Москва — Казань',
    distance: '827 км',
    time: '11ч 30мин',
    trains: '8 пар/день',
    stops: ['Владимир', 'Нижний Новгород'],
    accentColor: '#3b82f6',
  },
  {
    title: 'Транссибирская магистраль',
    distance: '9 288 км',
    time: '6 суток',
    trains: 'Москва — Владивосток',
    stops: ['Екатеринбург', 'Новосибирск', 'Иркутск', 'Чита'],
    accentColor: '#f59e0b',
    badge: 'Легендарный маршрут',
  },
  {
    title: 'Москва — Сочи',
    distance: '1 620 км',
    time: '22ч',
    trains: '5 пар/день',
    stops: ['Воронеж', 'Ростов-на-Дону', 'Краснодар'],
    accentColor: '#ec4899',
  },
  {
    title: 'Москва — Екатеринбург',
    distance: '1 818 км',
    time: '24ч',
    trains: '4 пар/день',
    stops: ['Пермь', 'Киров'],
    accentColor: '#8b5cf6',
  },
  {
    title: 'Москва — Владивосток',
    distance: '9 259 км',
    time: '144ч',
    trains: '1 пара/день (поезд «Россия»)',
    stops: ['Красноярск', 'Хабаровск'],
    accentColor: '#ef4444',
    badge: 'Транссиб',
  },
];

const networkStats = [
  { value: '85 731 км', label: 'протяжённость сети', icon: '🛤' },
  { value: '5 000+', label: 'станций', icon: '🏛' },
  { value: '86', label: 'субъектов РФ охвачено', icon: '🗺' },
  { value: '1.3 млрд', label: 'пассажиров в год', icon: '👥' },
];

export default function RoutesPage() {
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
      <div className="routes-page">
        <div className="routes-hero">
          <div className="hero-background">
            {trainImages.map((img, index) => (
              <div key={img} className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}>
                <ImageWithFallback src={img} alt={`Поезд ${index + 1}`} showPlaceholder={false} />
              </div>
            ))}
            <div className="hero-overlay" />
          </div>
          <div className="routes-hero__content">
            <h1 className="routes-hero__title">Маршруты и направления</h1>
            <p className="routes-hero__subtitle">Карта ключевых железнодорожных направлений России</p>
          </div>
        </div>

        <div className="routes-container">
          <section className="routes-section">
            <h2 className="routes-section__title">Ключевые направления</h2>
            <div className="routes-grid">
              {routeCards.map((card) => (
                <div
                  key={card.title}
                  className="route-card"
                  style={{ '--accent': card.accentColor } as React.CSSProperties}
                >
                  {card.badge && <span className="route-card__badge">{card.badge}</span>}
                  <h3 className="route-card__title">{card.title}</h3>
                  <div className="route-card__stats">
                    <div className="route-stat">
                      <span className="route-stat__icon">📍</span>
                      <span className="route-stat__label">Расстояние</span>
                      <span className="route-stat__value">{card.distance}</span>
                    </div>
                    <div className="route-stat">
                      <span className="route-stat__icon">⏱</span>
                      <span className="route-stat__label">Время в пути</span>
                      <span className="route-stat__value">{card.time}</span>
                    </div>
                    <div className="route-stat">
                      <span className="route-stat__icon">🚂</span>
                      <span className="route-stat__label">Поездов</span>
                      <span className="route-stat__value">{card.trains}</span>
                    </div>
                  </div>
                  <div className="route-card__stops">
                    <span className="route-stops__label">Основные остановки:</span>
                    <div className="route-stops__list">
                      {card.stops.map((stop) => (
                        <span key={stop} className="route-stop-tag">{stop}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="routes-section">
            <h2 className="routes-section__title">Статистика сети</h2>
            <div className="network-stats">
              {networkStats.map((stat) => (
                <div key={stat.label} className="network-stat-box">
                  <div className="network-stat-box__icon">{stat.icon}</div>
                  <div className="network-stat-box__value">{stat.value}</div>
                  <div className="network-stat-box__label">{stat.label}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </ModalProvider>
  );
}
