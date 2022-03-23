import { Heading } from 'components';
import { SiteSettings } from './sections';
import './Settings.styles.scss';

function Settings() {
  return (
    <div className="settings-page">
      <div>
        <Heading>Settings</Heading>
      </div>
      <div className="settings-page__cards">
        <SiteSettings />
      </div>
    </div>
  );
}

export default Settings;
