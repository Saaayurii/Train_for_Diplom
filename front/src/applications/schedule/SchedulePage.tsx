import { useState, useEffect } from 'react';

import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import ImageWithFallback from 'common/ImageWithFallback';
import NavBar from 'common/NavBar';

import './SchedulePage.scss';

const trainImages = [
  '/assets/train/image.png',
  '/assets/train/image copy.png',
  '/assets/train/image copy 2.png',
  '/assets/train/image copy 3.png',
  '/assets/train/image copy 4.png',
  '/assets/train/image copy 5.png',
];

interface TrainRow {
  number: string;
  route: string;
  departure: string;
  arrival: string;
  type: string;
  status: string;
}

const allTrains: TrainRow[] = [
  { number: '001А', route: 'Москва → Санкт-Петербург', departure: '23:55', arrival: '07:55', type: 'Скорый', status: 'В расписании' },
  { number: '002Э', route: 'Москва → Санкт-Петербург', departure: '06:00', arrival: '10:20', type: 'Сапсан', status: 'В расписании' },
  { number: '003', route: 'Москва → Казань', departure: '08:40', arrival: '16:20', type: 'Скорый', status: 'Задержан на 15 мин' },
  { number: '004А', route: 'Санкт-Петербург → Москва', departure: '05:15', arrival: '09:35', type: 'Сапсан', status: 'В пути' },
  { number: '009Э', route: 'Москва → Воронеж', departure: '07:30', arrival: '12:45', type: 'Экспресс', status: 'В расписании' },
  { number: '016А', route: 'Екатеринбург → Москва', departure: '16:30', arrival: '16:45+1', type: 'Скорый', status: 'В расписании' },
  { number: '019Э', route: 'Москва → Нижний Новгород', departure: '07:00', arrival: '10:50', type: 'Сапсан', status: 'В пути' },
  { number: '026А', route: 'Москва → Новосибирск', departure: '21:00', arrival: '06:30+2', type: 'Скорый', status: 'В расписании' },
  { number: '035Э', route: 'Москва → Самара', departure: '15:15', arrival: '23:40', type: 'Экспресс', status: 'Задержан на 30 мин' },
  { number: '053', route: 'Москва → Уфа', departure: '18:45', arrival: '10:12+1', type: 'Скорый', status: 'В расписании' },
  { number: '072А', route: 'Москва → Ростов-на-Дону', departure: '20:10', arrival: '10:05+1', type: 'Скорый', status: 'В расписании' },
  { number: '091А', route: 'Москва → Воронеж', departure: '14:35', arrival: '20:00', type: 'Пассажирский', status: 'В пути' },
  { number: '096А', route: 'Москва → Рязань', departure: '09:25', arrival: '11:55', type: 'Экспресс', status: 'В расписании' },
  { number: '102А', route: 'Москва → Сочи', departure: '22:00', arrival: '20:05+1', type: 'Скорый', status: 'В пути' },
  { number: '116Ч', route: 'Казань → Москва', departure: '19:00', arrival: '06:30+1', type: 'Скорый', status: 'Задержан на 10 мин' },
];

function statusClass(status: string) {
  if (status === 'В расписании') return 'sched-badge sched-badge--green';
  if (status.startsWith('В пути')) return 'sched-badge sched-badge--blue';
  return 'sched-badge sched-badge--orange';
}

export default function SchedulePage() {
  const [from, setFrom] = useState('Москва');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % trainImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');

  const filtered = allTrains.filter((t) => {
    const routeLower = t.route.toLowerCase();
    const matchFrom = from.trim() === '' || routeLower.includes(from.trim().toLowerCase());
    const matchTo = to.trim() === '' || routeLower.includes(to.trim().toLowerCase());
    return matchFrom && matchTo;
  });

  return (
    <ModalProvider>
      <NavBar />
      <div className="schedule-page">
        <div className="schedule-hero">
          <div className="hero-background">
            {trainImages.map((img, index) => (
              <div key={img} className={`hero-image ${index === currentImageIndex ? 'active' : ''}`}>
                <ImageWithFallback src={img} alt={`Поезд ${index + 1}`} showPlaceholder={false} />
              </div>
            ))}
            <div className="hero-overlay" />
          </div>
          <div className="schedule-hero__content">
            <h1 className="schedule-hero__title">Расписание поездов</h1>
            <p className="schedule-hero__subtitle">Актуальное расписание движения поездов по всей сети</p>
          </div>
        </div>

        <div className="schedule-container">
          <div className="sched-filter">
            <div className="sched-filter__group">
              <label className="sched-filter__label" htmlFor="sched-from">Откуда</label>
              <input
                id="sched-from"
                type="text"
                className="sched-filter__input"
                placeholder="Город отправления"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>
            <div className="sched-filter__group">
              <label className="sched-filter__label" htmlFor="sched-to">Куда</label>
              <input
                id="sched-to"
                type="text"
                className="sched-filter__input"
                placeholder="Город назначения"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>
            <div className="sched-filter__group">
              <label className="sched-filter__label" htmlFor="sched-date">Дата</label>
              <input
                id="sched-date"
                type="date"
                className="sched-filter__input"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="sched-filter__btn"
              onClick={() => {}}
            >
              Найти
            </button>
          </div>

          <div className="sched-table-wrap">
            <table className="sched-table">
              <thead>
                <tr>
                  <th>№ поезда</th>
                  <th>Маршрут</th>
                  <th>Отправление</th>
                  <th>Прибытие</th>
                  <th>Тип</th>
                  <th>Статус</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.number}>
                    <td className="sched-train-num">{row.number}</td>
                    <td className="sched-route">{row.route}</td>
                    <td className="sched-time">{row.departure}</td>
                    <td className="sched-time">{row.arrival}</td>
                    <td>
                      <span className="sched-type">{row.type}</span>
                    </td>
                    <td>
                      <span className={statusClass(row.status)}>{row.status}</span>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="sched-empty">Поезда по заданному маршруту не найдены</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <p className="sched-note">Данные обновляются каждые 5 минут</p>
        </div>
      </div>
    </ModalProvider>
  );
}
