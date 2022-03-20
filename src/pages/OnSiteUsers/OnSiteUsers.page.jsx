// import { useTranslation } from 'react-i18next';
import { Heading } from 'components';
import './OnSiteUsers.styles.scss';

function OnSiteUsers() {
  // const { t } = useTranslation();
  return (
    <div className="on-site">
      <div>
        <Heading>On-Site Users</Heading>
      </div>
      <div>Table</div>
    </div>
  );
}

export default OnSiteUsers;
