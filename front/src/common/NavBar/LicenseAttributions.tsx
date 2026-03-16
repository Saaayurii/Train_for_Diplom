import { useTranslation } from 'react-i18next';

type AttributionLicense = {
  name: string;
  version: string;
  identifier?: string;
  text?: string;
  url?: string;
};

const COLLABORATIONS: AttributionLicense[] = [
  {
    name: 'Донецкий государственный университет',
    version: '',
    identifier: 'Кафедра информационных технологий',
    url: 'https://donnu.ru',
  },
];

const DATA_SOURCES: AttributionLicense[] = [
  {
    name: 'Денис Мельников',
    version: '',
    identifier: 'Разработка информационной системы железной дороги, 2025',
    url: 'https://vk.com/pivosrakom',
  },
];

type LicenseCardProps = { attribution: AttributionLicense };

const LicenseCard = ({
  attribution: { name, version, text, url, identifier },
}: LicenseCardProps) => (
  <div>
    <a href={url} rel="noreferrer" target="blank">
      <h3 className="d-flex mr-1 mb-0">
        {name.replace('@', '')}
        <small className="d-flex align-items-center ml-2">
          {version}
          {url && <i className="ml-2 icons-external-link" />}
        </small>
      </h3>
    </a>
    <div className="small ml-4 mb-2">
      {identifier ?? (
        <span className="license-card-text">{text?.substring(0, 300).replace('(c)', '©')}</span>
      )}
    </div>
  </div>
);

const LicenseAttributions = () => {
  const { t } = useTranslation();

  return (
    <div className="col-md-6 h-100 d-flex flex-column">
      <h2 className="text-center mb-4">{t('nav-bar.information.collaborations')}</h2>
      <div className="license-attributions">
        {COLLABORATIONS.map((dataSource) => (
          <LicenseCard attribution={dataSource} key={dataSource.name} />
        ))}
      </div>
      <h2 className="text-center my-4">{t('nav-bar.information.dataSources')}</h2>
      <div className="license-attributions">
        {DATA_SOURCES.map((dataSource) => (
          <LicenseCard attribution={dataSource} key={dataSource.name} />
        ))}
      </div>
    </div>
  );
};

export default LicenseAttributions;
