// import { useTranslation } from 'react-i18next';
import { Input, Select } from 'antd';
import { Button, Heading, Table } from 'components';
import { Search } from 'icons';
import './OnSiteUsers.styles.scss';

const { Option } = Select;

function OnSiteUsers() {
  // const { t } = useTranslation();
  return (
    <div className="on-site">
      <div>
        <Heading>On-Site Users</Heading>
      </div>
      <div>
        <div className="on-site__filters">
          <div className="on-site__filters-search-wrapper">
            <Input
              className="on-site__filters-search"
              placeholder="Search On-Site Users..."
              suffix={<Search />}
            />
            <Select
              defaultValue="Filter By : Company"
              className="on-site__filters-select"
              dropdownClassName="custom-select__dropdown">
              <Option value="company">Company</Option>
              <Option value="date">Date</Option>
              <Option value="user">User</Option>
            </Select>
          </div>
          <div className="on-site__filters-buttons">
            <Button variant="secondary">Export CSV</Button>
            <Button variant="secondary">Check In Users</Button>
            <Button>Check Out Users</Button>
          </div>
        </div>
      </div>
      <div>
        <Table />
      </div>
    </div>
  );
}

export default OnSiteUsers;
