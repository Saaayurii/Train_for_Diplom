import { Tools } from '@osrd-project/ui-icons';

const StdcmEmptyConfigError = () => (
  <div className="stdcm-config-error">
    <span className="icon">
      <Tools size="lg" />
    </span>
    <h2 className="mx-0">Конфигурация не найдена</h2>
    <p>Для использования модуля STDCM необходима настройка конфигурации на сервере. Обратитесь к администратору системы.</p>
  </div>
);

export default StdcmEmptyConfigError;
