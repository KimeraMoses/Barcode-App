// import { useTranslation } from 'react-i18next';
import { Input, Select } from 'antd';
import { Button, Heading, Table, Modal } from 'components';
import { Search } from 'icons';
import { exportToExcel } from 'utils';
import { useEffect, useState } from 'react';
import './OnSiteUsers.styles.scss';

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
    title: 'STATUS',
    dataIndex: 'status',
    width: 500,
    render: (text) => <div className="on-site__status">{text}</div>,
    sorter: (a, b) => a.status.length - b.status.length
  },
  {
    title: 'LAST CHECK IN',
    dataIndex: 'last_check_in',
    sorter: (a, b) => a.last_check_in - b.last_check_in
  },
  {
    title: 'LAST CHECK OUT',
    dataIndex: 'last_check_out',
    sorter: (a, b) => a.last_check_out - b.last_check_out
  }
];

const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    uid: Number(`0${i}54${i}`),
    name: `Paul Elliott ${i}`,
    status: 'Currently Checked In',
    last_check_in: `Mar 5th, 2022 at 01:00:${i} PM`,
    last_check_out: 'Mar 5th, 2022 at 01:00:00 PM'
  });
}

function OnSiteUsers() {
  // const { t } = useTranslation();

  const [rows, setRows] = useState([]);
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);

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

  // Buttons for Table
  const buttons = [
    {
      variant: 'secondary',
      title: 'Export CSV',
      onClick: () => exportToExcel(data, 'custom-table Users')
    },
    {
      variant: 'secondary',
      title: 'Check In Users',
      onClick: () => setCheckInModal(true),
      disabled: !rows.length
    },
    { title: 'Check Out Users', onClick: () => setCheckOutModal(true), disabled: !rows.length }
  ];

  return (
    <div className="on-site">
      <Modal
        showModal={checkInModal || checkOutModal}
        heading={checkInModal ? 'Check In Users' : 'Check Out Users'}
        content={
          <div className="on-site__modal">
            <div>
              <div className="on-site__modal-content">
                Please select the users from the list given below in order to manually check them{' '}
                {checkInModal ? 'in to' : 'out of'}
                the system.
              </div>
              <div className="on-site__modal-list">
                {rows.map((row) => {
                  console.log(row);
                  return (
                    <div className="on-site__modal-list-el">
                      <div className="on-site__modal-list-el-cn">
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
              <div className="on-site__modal-buttons">
                <Button
                  variant="secondary"
                  onClick={() => {
                    if (checkInModal) {
                      setCheckInModal(false);
                    } else {
                      setCheckOutModal(false);
                    }
                  }}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (checkInModal) {
                      setCheckInModal(false);
                    } else {
                      setCheckOutModal(false);
                    }
                  }}>
                  {checkInModal ? 'Check In Users' : 'Check Out Users'}
                </Button>
              </div>
            </div>
          </div>
        }
      />
      <div>
        <Heading>On-Site Users</Heading>
      </div>
      <div>
        <Table columns={columns} data={data} rowSelection={rowSelection} buttons={buttons} />
      </div>
    </div>
  );
}

export default OnSiteUsers;
