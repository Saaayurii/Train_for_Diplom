import { useMemo, useState, type ReactElement } from 'react';

import { Hubot, Person } from '@osrd-project/ui-icons';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import { useModal } from 'common/BootstrapSNCF/ModalSNCF';
import HelpModalSNCF from 'common/BootstrapSNCF/HelpModalSNCF';
import useAuth from 'utils/hooks/useAuth';
import useDeploymentSettings from 'utils/hooks/useDeploymentSettings';

import ReleaseInformation from './ReleaseInformation';
import UserSettings from './UserSettings';
import './NewNavBar.scss';

type NavBarProps = {
  appName?: string | ReactElement;
};

const NavBar = ({ appName }: NavBarProps = {}) => {
  const { openModal } = useModal();
  const deploymentSettings = useDeploymentSettings();
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { username, impersonatedUser, logout } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  const { logoUrl, name } = useMemo(() => {
    if (!deploymentSettings)
      return { logoUrl: undefined, name: 'Железная дорога' };
    return {
      logoUrl: deploymentSettings.operationalStudiesLogoWithName,
      name: deploymentSettings.operationalStudiesName,
    };
  }, [deploymentSettings]);

  const navItems = (
    <>
      <a href="/about" onClick={() => setMobileMenuOpen(false)}>О системе</a>
      <button type="button" onClick={() => { openModal(<ReleaseInformation />, 'lg'); setMobileMenuOpen(false); }}>
        {t('nav-bar.about')}
      </button>
      <button type="button" onClick={() => { openModal(<HelpModalSNCF />, 'lg'); setMobileMenuOpen(false); }}>
        {t('nav-bar.help')}
      </button>
      <button type="button" onClick={toggleLanguage}>
        {t('nav-bar.languages')} ({i18n.language === 'ru' ? 'EN' : 'RU'})
      </button>
      <button type="button" onClick={() => { openModal(<UserSettings />); setMobileMenuOpen(false); }}>
        {t('nav-bar.userSettings')}
      </button>
    </>
  );

  return (
    <div className={cx('nav-bar', { impersonated: impersonatedUser })}>
      <div
        className={cx('app-logo', {
          'custom-logo': deploymentSettings?.hasCustomizedLogo,
          'without-image': logoUrl,
        })}
      >
        <a href="/">
          {logoUrl ? (
            <img
              src={logoUrl}
              data-testid={`${name.toLowerCase()}-logo`}
              alt={`${name.toUpperCase()} Logo`}
            />
          ) : (
            <div style={{ width: '24px' }} />
          )}
          <span className="app-name-text">{appName || name}</span>
        </a>
      </div>

      <nav className="main-nav desktop-nav">
        {navItems}
      </nav>

      <div className="user-actions">
        <a href="/profile" className="user-dropdown-link">
          <div className={cx('user-dropdown', { 'impersonated-user': impersonatedUser })}>
            {impersonatedUser ? <Hubot size="lg" className="mr-2" /> : <Person size="sm" className="mr-2" />}
            <span className="user-name">{username}</span>
          </div>
        </a>
        <button type="button" className="btn btn-dark" onClick={() => logout()}>
          {t('nav-bar.disconnect')}
        </button>
        <button
          type="button"
          className="hamburger-btn"
          aria-label="Меню"
          onClick={() => setMobileMenuOpen((v) => !v)}
        >
          <span className={cx('hamburger-icon', { open: mobileMenuOpen })}>
            <span /><span /><span />
          </span>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav className="main-nav mobile-nav">
          {navItems}
          <a href="/profile" onClick={() => setMobileMenuOpen(false)}>Профиль</a>
          <button type="button" className="mobile-logout" onClick={() => logout()}>
            {t('nav-bar.disconnect')}
          </button>
        </nav>
      )}
    </div>
  );
};

export default NavBar;
