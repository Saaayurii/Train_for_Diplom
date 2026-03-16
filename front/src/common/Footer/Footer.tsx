import './Footer.scss';

const Footer = () => (
  <footer className="modern-footer">
    <div className="footer-wave">
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C300,110 500,10 800,60 C1000,100 1100,40 1200,60 L1200,120 L0,120 Z"
          fill="url(#gradient)"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
    </div>

    <div className="footer-content">
      <div className="footer-container">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-column">
            <h3 className="footer-title">О дипломной работе</h3>
            <p className="footer-description">
              «Разработка информационной системы железной дороги» — дипломная работа,
              реализующая комплекс модулей для управления ж/д инфраструктурой.
            </p>
            <div className="footer-diploma">
              <div className="footer-diploma__item">👨‍🎓 Денис Мельников</div>
              <div className="footer-diploma__item">🏛️ ДонГУ, 2025</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Разделы</h3>
            <ul className="footer-links">
              <li><a href="/about">О системе</a></li>
              <li><a href="/trains">Поезда России</a></li>
              <li><a href="/dashboard">Аналитика</a></li>
              <li><a href="/schedule">Расписание</a></li>
              <li><a href="/routes">Маршруты</a></li>
              <li><a href="/glossary">Глоссарий</a></li>
            </ul>
          </div>

          {/* Modules */}
          <div className="footer-column">
            <h3 className="footer-title">Модули системы</h3>
            <ul className="footer-links">
              <li><a href="/operational-studies/projects">Операционные исследования</a></li>
              <li><a href="/editor">Редактор инфраструктуры</a></li>
              <li><a href="/map">Карта маршрутов</a></li>
              <li><a href="/rolling-stock-editor">Подвижной состав</a></li>
              <li><a href="/stdcm">STDCM</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3 className="footer-title">Контакты</h3>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">🏛️</span>
                <span>Донецкий государственный университет</span>
              </li>
              <li>
                <span className="contact-icon">👤</span>
                <span>Мельников Денис</span>
              </li>
              <li>
                <span className="contact-icon">🔗</span>
                <a href="https://vk.com/pivosrakom" target="_blank" rel="noopener noreferrer" style={{color: 'inherit'}}>vk.com/pivosrakom</a>
              </li>
            </ul>

            <div className="footer-social">
              <a href="https://vk.com/pivosrakom" className="social-link" aria-label="VK" target="_blank" rel="noopener noreferrer">
                <span>📘</span>
              </a>
              <a href="https://donnu.ru" className="social-link" aria-label="ДонГУ" target="_blank" rel="noopener noreferrer">
                <span>🎓</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} РИСЖ — Дипломная работа. Денис Мельников, ДонГУ.
            </p>
            <div className="footer-bottom-links">
              <a href="/about">О системе</a>
              <span className="separator">•</span>
              <a href="/glossary">Глоссарий</a>
              <span className="separator">•</span>
              <a href="/trains">Поезда</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
