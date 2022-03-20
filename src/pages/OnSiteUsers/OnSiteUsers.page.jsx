import { useTranslation } from 'react-i18next';
import styles from './OnSiteUsers.styles.scss';

function OnSiteUsers() {
  const { t } = useTranslation();
  const { onsite } = styles;
  return (
    <div className={onsite}>
      <div>
        <div className="App">{t('title', { framework: 'React' })}</div>
      </div>
    </div>
  );
}

export default OnSiteUsers;
