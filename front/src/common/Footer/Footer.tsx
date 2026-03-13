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
            <h3 className="footer-title">О системе</h3>
            <p className="footer-description">
              Современная информационная система управления железнодорожной инфраструктурой.
              Обеспечивает эффективное планирование, мониторинг и контроль всех процессов.
            </p>
            <div className="footer-logo">
              🚄 Железная дорога
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3 className="footer-title">Быстрые ссылки</h3>
            <ul className="footer-links">
              <li><a href="/about">О системе</a></li>
              <li><a href="/operational-studies/projects">Операционные исследования</a></li>
              <li><a href="/editor">Редактор инфраструктуры</a></li>
              <li><a href="/map">Карта маршрутов</a></li>
              <li><a href="/rolling-stock-editor">Редактор подвижного состава</a></li>
              <li><a href="/stdcm">STDCM</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column">
            <h3 className="footer-title">Ресурсы</h3>
            <ul className="footer-links">
              <li><a href="#documentation">Документация</a></li>
              <li><a href="#api">API</a></li>
              <li><a href="#support">Техподдержка</a></li>
              <li><a href="#training">Обучение</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h3 className="footer-title">Контакты</h3>
            <ul className="footer-contact">
              <li>
                <span className="contact-icon">📍</span>
                <span>Москва, Россия</span>
              </li>
              <li>
                <span className="contact-icon">📧</span>
                <span>info@railway.ru</span>
              </li>
              <li>
                <span className="contact-icon">📞</span>
                <span>+7 (495) 123-45-67</span>
              </li>
            </ul>

            <div className="footer-social">
              <a href="#telegram" className="social-link" aria-label="Telegram">
                <span>📱</span>
              </a>
              <a href="#vk" className="social-link" aria-label="VK">
                <span>📘</span>
              </a>
              <a href="#youtube" className="social-link" aria-label="YouTube">
                <span>📺</span>
              </a>
              <a href="#github" className="social-link" aria-label="GitHub">
                <span>💻</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {new Date().getFullYear()} Информационная система железной дороги. Все права защищены.
            </p>
            <div className="footer-bottom-links">
              <a href="#privacy">Политика конфиденциальности</a>
              <span className="separator">•</span>
              <a href="#terms">Условия использования</a>
              <span className="separator">•</span>
              <a href="#cookies">Cookie</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
