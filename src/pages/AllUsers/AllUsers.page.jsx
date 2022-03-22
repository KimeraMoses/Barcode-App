// import { useTranslation } from 'react-i18next';
import { Input, Select, Space } from 'antd';
import * as XLSX from 'xlsx';
import { Button, Heading, Table, Modal } from 'components';
import { Document, Search, Trash } from 'icons';
import { exportToExcel, processData } from 'utils';
import { useEffect, useRef, useState } from 'react';
import './AllUsers.styles.scss';

const { Option } = Select;

// Columns for table
const tableCol = [
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
  const [modal, setModal] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const csvData = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      const { columns, list } = processData(csvData);

      // Uplaod to backend here
      console.log(columns, list);
    };
    reader.readAsBinaryString(file);
  };

  const inputFile = useRef(null);

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
                <div className="all-users__modal-list-el">
                  <div className="all-users__modal-list-el-cn">
                    <input type="checkbox" defaultChecked />
                    <div>Sam</div>
                  </div>
                  <div>User 123456</div>
                </div>
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
            <input
              type="file"
              id="file"
              ref={inputFile}
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <Button
              variant="secondary"
              onClick={() => {
                inputFile.current.click();
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
        <Table columns={tableCol} data={data} />
      </div>
    </div>
  );
}

export default AllUsers;
