// import { useTranslation } from 'react-i18next';
import { Input, Select, Space } from 'antd';
import { Button, Heading, Table, Modal } from 'components';
import { Document, Search, Trash } from 'icons';
import { exportToExcel } from 'utils';
import { useState } from 'react';
import './AllUsers.styles.scss';

const { Option } = Select;

// Columns for table
const columns = [
  {
    title: 'USER ID',
    dataIndex: 'uid',
    sorter: (a, b) => a.uid - b.uid
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'COMPANY',
    dataIndex: 'company',
    sorter: (a, b) => a.company.length - b.company.length
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    width: 500,
    render: (text) => (
      <div
        className={`all-users__status ${text === 'Disabled' ? 'all-users__status-disabled' : ''}`}>
        {text}
      </div>
    ),
    sorter: (a, b) => a.status.length - b.status.length
  },
  {
    title: 'CHECK INS',
    dataIndex: 'check_ins',
    sorter: (a, b) => a.check_ins - b.check_ins
  },
  {
    title: 'CHECK OUTS',
    dataIndex: 'check_outs',
    sorter: (a, b) => a.check_outs - b.check_outs
  },
  {
    title: 'ACTIONS',
    dataIndex: 'actions',
    render: (text, record) => {
      console.log(record);
      return (
        <Space size="middle">
          <div>
            <Document />
          </div>
          <div>
            <Trash />
          </div>
        </Space>
      );
    }
  }
];

// Data for table
const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    uid: Number(`0${i}54${i}`),
    name: `Paul Elliott ${i}`,
    company: `Mind 2 Matter`,
    status: i % 2 === 0 ? 'Currently Enabled' : 'Disabled',
    check_ins: `${i} Check Ins Total`,
    check_outs: `${i} Check Ins Total`
  });
}

function AllUsers() {
  // const { t } = useTranslation();

  const [rows, setRows] = useState([]);
  const [modal, setModal] = useState(false);

  const rowSelection = {
    type: 'checkbox',
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === 'Disabled User'
      // Column configuration not to be checked
      // name: record.name
    })
  };

  return (
    <div className="all-users">
      <Modal
        showModal={modal}
        heading="Add New User"
        content={
          <div className="all-users__modal">
            <div>
              <div className="all-users__modal-content">
                Please enter the required information below in order to add a new user record to the
                table being displayed.
              </div>
              <div className="all-users__modal-list">
                {rows.map((row) => {
                  console.log(row);

                  return (
                    <div className="all-users__modal-list-el">
                      <div className="all-users__modal-list-el-cn">
                        <input type="checkbox" checked />
                        <div>{row?.name}</div>
                      </div>
                      <div>User {row?.uid}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="all-users__modal-buttons">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setModal(false);
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    setModal(false);
                  }}>
                  Add New User
                </Button>
              </div>
            </div>
          </div>
        }
      />
      <div>
        <Heading>All Users</Heading>
      </div>
      <div>
        <div className="all-users__filters">
          <div className="all-users__filters-search-wrapper">
            <Input
              className="all-users__filters-search"
              placeholder="Search All Users..."
              suffix={<Search />}
            />
            <Select
              defaultValue="Filter By : Company"
              className="all-users__filters-select"
              dropdownClassName="custom-select__dropdown">
              <Option value="company">Company</Option>
              <Option value="date">Date</Option>
              <Option value="user">User</Option>
            </Select>
          </div>
          <div className="all-users__filters-buttons">
            <Button
              variant="secondary"
              onClick={() => {
                exportToExcel(data, 'all-users Users');
              }}>
              Import CSV
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                exportToExcel(data, 'all-users Users');
              }}>
              Export CSV
            </Button>
            <Button
              // disabled={!rows.length}
              onClick={() => {
                setModal(true);
              }}>
              Add New User
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default AllUsers;
