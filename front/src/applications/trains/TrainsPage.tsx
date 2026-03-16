import { useState, useEffect } from 'react';

import { ModalProvider } from 'common/BootstrapSNCF/ModalSNCF/ModalProvider';
import ImageWithFallback from 'common/ImageWithFallback';
import NavBar from 'common/NavBar';

import './TrainsPage.scss';

type Train = {
  id: number;
  name: string;
  year: string;
  type: string;
  speed: string;
  description: string;
  icon: string;
  badge: string;
  badgeColor: string;
};

type Invention = {
  year: string;
  title: string;
  author: string;
  description: string;
  icon: string;
};

const TRAINS: Train[] = [
  {
    id: 1,
    name: 'Сапсан',
    year: '2009',
    type: 'Высокоскоростной',
    speed: '250 км/ч',
    description:
      'Высокоскоростной электропоезд на маршрутах Москва — Санкт-Петербург и Москва — Нижний Новгород. Разработан Siemens по заказу РЖД. Один из самых быстрых поездов России.',
    icon: '🚄',
    badge: 'Высокоскоростной',
    badgeColor: 'teal',
  },
  {
    id: 2,
    name: 'Ласточка',
    year: '2013',
    type: 'Скоростной',
    speed: '160 км/ч',
    description:
      'Скоростной электропоезд для межрегиональных и пригородных маршрутов. Производится на заводе «Уральские локомотивы» по лицензии Siemens. Используется в десятках городов России.',
    icon: '🚃',
    badge: 'Межрегиональный',
    badgeColor: 'blue',
  },
  {
    id: 3,
    name: 'Allegro',
    year: '2010',
    type: 'Высокоскоростной',
    speed: '220 км/ч',
    description:
      'Скоростной поезд на маршруте Санкт-Петербург — Хельсинки. Модификация Pendolino компании Alstom. Преодолевал 440 км за 3,5 часа.',
    icon: '🚅',
    badge: 'Международный',
    badgeColor: 'purple',
  },
  {
    id: 4,
    name: 'Стриж',
    year: '2016',
    type: 'Скоростной',
    speed: '200 км/ч',
    description:
      'Испанский поезд Talgo 200 на маршрутах Москва — Берлин и Москва — Адлер. Особенность — переменная колёсная колея, позволяющая работать на путях разной ширины.',
    icon: '🚆',
    badge: 'Двухсистемный',
    badgeColor: 'amber',
  },
  {
    id: 5,
    name: 'ЭП20',
    year: '2012',
    type: 'Электровоз',
    speed: '200 км/ч',
    description:
      'Двухсистемный пассажирский электровоз производства Новочеркасского электровозостроительного завода. Работает как на постоянном, так и на переменном токе.',
    icon: '🚂',
    badge: 'Электровоз',
    badgeColor: 'red',
  },
  {
    id: 6,
    name: 'Иволга',
    year: '2018',
    type: 'Городской',
    speed: '120 км/ч',
    description:
      'Электропоезд для Московских центральных диаметров. Производство — Тверской вагоностроительный завод. Полностью отечественная разработка, современный дизайн и высокий комфорт.',
    icon: '🚇',
    badge: 'МЦД',
    badgeColor: 'green',
  },
  {
    id: 7,
    name: 'Таврия',
    year: '2022',
    type: 'Скоростной',
    speed: '160 км/ч',
    description:
      'Новый электропоезд для маршрутов в Крым и на юг России. Работает в условиях морского климата, усиленная защита от коррозии. Полностью отечественное производство.',
    icon: '🚈',
    badge: 'Новинка',
    badgeColor: 'teal',
  },
  {
    id: 8,
    name: 'ВЛ80',
    year: '1961',
    type: 'Электровоз',
    speed: '110 км/ч',
    description:
      'Легендарный грузовой электровоз переменного тока. Самый массовый электровоз в истории СССР и России. Производился на Новочеркасском заводе более 30 лет, выпущено свыше 6 000 единиц.',
    icon: '🚂',
    badge: 'Легенда',
    badgeColor: 'gray',
  },
];

const INVENTIONS: Invention[] = [
  {
    year: '1834',
    title: 'Первый паровоз в России',
    author: 'Черепановы — Ефим и Мирон',
    description:
      'Отец и сын Черепановы построили первый в России паровоз «Пароходный дилижанс» на Нижнетагильских заводах. Он перевозил руду со скоростью 16 км/ч.',
    icon: '🔧',
  },
  {
    year: '1876',
    title: 'Автосцепка',
    author: 'Виктор Раевский',
    description:
      'Российский инженер разработал автоматическую сцепку для вагонов, что революционизировало безопасность на железных дорогах и значительно ускорило формирование составов.',
    icon: '⚙️',
  },
  {
    year: '1899',
    title: 'Электрический трамвай',
    author: 'Фёдор Пироцкий',
    description:
      'Русский инженер-артиллерист первым в мире провёл успешный опыт передачи электроэнергии по рельсам и запустил первый в России электрический трамвай в Санкт-Петербурге.',
    icon: '⚡',
  },
  {
    year: '1932',
    title: 'Газотурбовоз',
    author: 'ЦНИИ МПС',
    description:
      'Советские инженеры создали первый в мире газотурбинный локомотив. Разработка опередила своё время и заложила основу для последующих поколений тягового подвижного состава.',
    icon: '💡',
  },
  {
    year: '1957',
    title: 'Скоростная магистраль',
    author: 'МПС СССР',
    description:
      'СССР первым в мире ввёл регулярное скоростное пассажирское сообщение — поезд «Красная стрела» развивал скорость до 160 км/ч на маршруте Москва — Ленинград.',
    icon: '🛤️',
  },
  {
    year: '2020',
    title: 'Беспилотный поезд',
    author: 'РЖД и Трансмашхолдинг',
    description:
      'Запуск первого в России полностью беспилотного поезда на московском МЦК. Система использует компьютерное зрение, лидары и ИИ для управления составом без машиниста.',
    icon: '🤖',
  },
];

const trainImages = [
  '/assets/train/image.png',
  '/assets/train/image copy.png',
  '/assets/train/image copy 2.png',
  '/assets/train/image copy 3.png',
  '/assets/train/image copy 4.png',
  '/assets/train/image copy 5.png',
];

const BADGE_COLORS: Record<string, string> = {
  teal: '#14b8a6',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  amber: '#f59e0b',
  red: '#ef4444',
  green: '#22c55e',
  gray: '#6b7280',
};

type FilterType = 'all' | 'Высокоскоростной' | 'Скоростной' | 'Электровоз' | 'Городской';

export default function TrainsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [selected, setSelected] = useState<Train | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % trainImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filters: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'Все' },
    { key: 'Высокоскоростной', label: 'Высокоскоростные' },
    { key: 'Скоростной', label: 'Скоростные' },
    { key: 'Электровоз', label: 'Электровозы' },
    { key: 'Городской', label: 'Городские' },
  ];

  const filtered = filter === 'all' ? TRAINS : TRAINS.filter((t) => t.type === filter);

  return (
    <ModalProvider>
      <NavBar />
      <div className="trains-page">
        {/* Hero */}
        <section className="trains-hero">
          <div className="trains-hero__bg">
            {trainImages.map((img, index) => (
              <div
                key={img}
                className={`trains-hero__slide ${index === currentImageIndex ? 'active' : ''}`}
              >
                <ImageWithFallback src={img} alt={`Поезд ${index + 1}`} showPlaceholder={false} />
              </div>
            ))}
            <div className="trains-hero__overlay" />
          </div>
          <div className="trains-hero__content">
            <h1>Поезда России</h1>
            <p>История, технологии и легенды отечественного железнодорожного транспорта</p>
            <div className="trains-hero__stats">
              <div className="trains-hero__stat">
                <span className="trains-hero__stat-num">85 000+</span>
                <span className="trains-hero__stat-label">км путей</span>
              </div>
              <div className="trains-hero__stat">
                <span className="trains-hero__stat-num">#2</span>
                <span className="trains-hero__stat-label">в мире по протяжённости</span>
              </div>
              <div className="trains-hero__stat">
                <span className="trains-hero__stat-num">1834</span>
                <span className="trains-hero__stat-label">год первого паровоза</span>
              </div>
            </div>
          </div>
        </section>

        <div className="trains-container">
          {/* Catalogue */}
          <section className="trains-section">
            <div className="trains-section__header">
              <h2>Каталог поездов</h2>
              <p>Современный и исторический подвижной состав РЖД</p>
            </div>

            <div className="trains-filters">
              {filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className={`trains-filter-btn ${filter === f.key ? 'active' : ''}`}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="trains-grid">
              {filtered.map((train) => (
                <button
                  key={train.id}
                  type="button"
                  className="train-card"
                  onClick={() => setSelected(train)}
                >
                  <div className="train-card__icon">{train.icon}</div>
                  <div
                    className="train-card__badge"
                    style={{ background: BADGE_COLORS[train.badgeColor] }}
                  >
                    {train.badge}
                  </div>
                  <h3 className="train-card__name">{train.name}</h3>
                  <div className="train-card__meta">
                    <span>📅 {train.year}</span>
                    <span>⚡ {train.speed}</span>
                  </div>
                  <p className="train-card__desc">{train.description.substring(0, 90)}…</p>
                </button>
              ))}
            </div>
          </section>

          {/* Inventions */}
          <section className="trains-section inventions-section">
            <div className="trains-section__header">
              <h2>Изобретения и достижения</h2>
              <p>Вклад российских инженеров в мировое железнодорожное дело</p>
            </div>
            <div className="inventions-grid">
              {INVENTIONS.map((inv) => (
                <div key={inv.year} className="invention-card">
                  <div className="invention-card__year">{inv.year}</div>
                  <div className="invention-card__icon">{inv.icon}</div>
                  <div className="invention-card__body">
                    <h3>{inv.title}</h3>
                    <span className="invention-card__author">{inv.author}</span>
                    <p>{inv.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Facts */}
          <section className="trains-section facts-section">
            <div className="trains-section__header">
              <h2>Интересные факты</h2>
            </div>
            <div className="facts-grid">
              {[
                { icon: '🌍', title: 'Транссиб', text: '9 288 км — самая длинная железная дорога в мире, пересекает 8 часовых поясов' },
                { icon: '⚡', title: 'Электрификация', text: 'Россия занимает 1-е место в мире по доле электрифицированных железных дорог — 43%' },
                { icon: '🏗️', title: 'БАМ', text: '4 324 км через вечную мерзлоту — одна из крупнейших строек XX века' },
                { icon: '🚇', title: 'Московское метро', text: 'Более 260 станций, ежедневно перевозит свыше 9 млн пассажиров' },
                { icon: '🛤️', title: 'Широкая колея', text: 'Россия использует колею 1 520 мм — шире европейской (1 435 мм), что обеспечивает большую устойчивость' },
                { icon: '🏆', title: 'Рекорд скорости', text: 'В 1993 году ЭР200 установил рекорд СССР — 210 км/ч на перегоне Москва — Санкт-Петербург' },
              ].map((fact) => (
                <div key={fact.title} className="fact-card">
                  <div className="fact-card__icon">{fact.icon}</div>
                  <h4>{fact.title}</h4>
                  <p>{fact.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Modal */}
        {selected && (
          <div className="train-modal-overlay" onClick={() => setSelected(null)}>
            <div className="train-modal" onClick={(e) => e.stopPropagation()}>
              <button type="button" className="train-modal__close" onClick={() => setSelected(null)}>
                ×
              </button>
              <div className="train-modal__icon">{selected.icon}</div>
              <div
                className="train-modal__badge"
                style={{ background: BADGE_COLORS[selected.badgeColor] }}
              >
                {selected.badge}
              </div>
              <h2>{selected.name}</h2>
              <div className="train-modal__specs">
                <div className="train-modal__spec">
                  <span className="label">Год</span>
                  <span className="value">{selected.year}</span>
                </div>
                <div className="train-modal__spec">
                  <span className="label">Тип</span>
                  <span className="value">{selected.type}</span>
                </div>
                <div className="train-modal__spec">
                  <span className="label">Скорость</span>
                  <span className="value">{selected.speed}</span>
                </div>
              </div>
              <p className="train-modal__desc">{selected.description}</p>
            </div>
          </div>
        )}
      </div>
    </ModalProvider>
  );
}
