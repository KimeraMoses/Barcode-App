// import { useTranslation } from 'react-i18next';
import { Heading, Table } from 'components';
import { exportToExcel } from 'utils';
import './CheckInOut.styles.scss';

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
    title: 'EVENT',
    dataIndex: 'event',
    width: 900,
    render: (text) => (
      <div
        className={`check-in-out__status ${
          text === 'Checked Out' ? 'check-in-out__status-disabled' : ''
        }`}>
        {text}
      </div>
    ),
    sorter: (a, b) => a.status.length - b.status.length
  },
  {
    title: 'Date',
    dataIndex: 'last_check_out',
    width: 250,
    sorter: (a, b) => a.last_check_out - b.last_check_out
  }
];

const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    uid: Number(`0${i}54${i}`),
    name: `Paul Elliott ${i}`,
    event: i % 2 === 0 ? 'Checked In' : 'Checked Out',
    last_check_in: `Mar 5th, 2022 at 01:00:${i} PM`,
    last_check_out: 'Mar 5th, 2022 at 01:00:00 PM'
  });
}

function CheckIn() {
  // const { t } = useTranslation();

  // Buttons for Table
  const buttons = [
    {
      variant: 'secondary',
      title: 'Export CSV',
      onClick: () => exportToExcel(data, 'custom-table Users')
    }
  ];

  return (
    <div className="check-in-out">
      <div>
        <Heading>Check Ins & Check Outs</Heading>
      </div>
      <div>
        <Table columns={columns} data={data} buttons={buttons} />
      </div>
    </div>
  );
}

export default CheckIn;
