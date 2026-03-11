import { useMemo, type ReactElement } from 'react';

import { Hubot, Person, Info, Report, Gear, SignOut } from '@osrd-project/ui-icons';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { useModal } from 'common/BootstrapSNCF/ModalSNCF';
import HelpModalSNCF from 'common/BootstrapSNCF/HelpModalSNCF';
import { getUserSafeWord } from 'reducers/user/userSelectors';
import useAuth from 'utils/hooks/useAuth';
import useDeploymentSettings from 'utils/hooks/useDeploymentSettings';

import ReleaseInformation from './ReleaseInformation';
import UserSettings from './UserSettings';
import './NewNavBar.scss';

type NavBarProps = {
  appName?: string | ReactElement;
};

const NavBar = ({ appName }: NavBarProps) => {
  const { openModal } = useModal();
  const deploymentSettings = useDeploymentSettings();
  const { t, i18n } = useTranslation();

  const { username, impersonatedUser, impersonate, logout } = useAuth();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ru' ? 'en' : 'ru';
    i18n.changeLanguage(newLang);
  };

  const { logoUrl, name } = useMemo(() => {
    if (!deploymentSettings)
      return {
        logoUrl: undefined,
        name: 'Железная дорога',
      };
    return {
      logoUrl: deploymentSettings.operationalStudiesLogoWithName,
      name: deploymentSettings.operationalStudiesName,
    };
  }, [deploymentSettings]);

  const userDropdownTitle = (
    <div className={cx('user-dropdown', { 'impersonated-user': impersonatedUser })}>
      {impersonatedUser ? (
        <Hubot size="lg" className="mr-2" />
      ) : (
        <Person size="sm" className="mr-2" />
      )}
      <span>{username}</span>
    </div>
  );

  return (
    <div className={cx('nav-bar', { impersonated: impersonatedUser })}>
      <div
        className={cx('app-logo', {
          'custom-logo': deploymentSettings?.hasCustomizedLogo,
          'without-image': logoUrl,
        })}
      >
        <Link to="/">
          {logoUrl ? (
            <img
              src={logoUrl}
              data-testid={`${name.toLowerCase()}-logo`}
              alt={`${name.toUpperCase()} Logo`}
            />
          ) : (
            <div style={{ width: '24px' }} />
          )}
          <span className="app-name-text">{name}</span>
        </Link>
      </div>

      <nav className="main-nav">
        <button type="button" onClick={() => openModal(<ReleaseInformation />, 'lg')}>
          {t('nav-bar.about')}
        </button>
        <button type="button" onClick={() => openModal(<HelpModalSNCF />, 'lg')}>
          {t('nav-bar.help')}
        </button>
        <button type="button" onClick={toggleLanguage}>
          {t('nav-bar.languages')} ({i18n.language === 'ru' ? 'EN' : 'RU'})
        </button>
        <button type="button" onClick={() => openModal(<UserSettings />)}>
          {t('nav-bar.userSettings')}
        </button>
      </nav>

      <div className="user-actions">
        {userDropdownTitle}
        <button type="button" className="btn btn-dark" onClick={() => logout()}>
          {t('nav-bar.disconnect')}
        </button>
      </div>
    </div>
  );
};

export default NavBar;
