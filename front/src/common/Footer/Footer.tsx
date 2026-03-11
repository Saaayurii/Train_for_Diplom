import './Footer.scss';

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <span className="text-muted">© {new Date().getFullYear()} Железная дорога. Все права защищены.</span>
    </div>
  </footer>
);

export default Footer;
