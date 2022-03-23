import { Space } from 'antd';
import { Trash, Document } from 'icons';

export const getColumns = (onEditClick, onDeleteClick) => {
  return [
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
          className={`all-users__status ${
            text === 'Disabled' ? 'all-users__status-disabled' : ''
          }`}>
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
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                onEditClick(record);
              }}
              onClick={() => {
                onEditClick(record);
              }}
              style={{ cursor: 'pointer' }}>
              <Document />
            </div>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                onDeleteClick(record);
              }}
              onClick={() => {
                onDeleteClick(record);
              }}
              style={{ cursor: 'pointer' }}>
              <Trash />
            </div>
          </Space>
        );
      }
    }
  ];
};

export const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    uid: Number(`0${i}54${i}`),
    name: `Paul Elliott ${i}`,
    email: `PaulElliott${i}@fakemail.com`,
    company: `Mind 2 Matter ${i}`,
    status: i % 2 === 0 ? 'Currently Enabled' : 'Disabled',
    check_ins: `${i} Check Ins Total`,
    check_outs: `${i} Check Ins Total`
  });
}
