// import { useTranslation } from 'react-i18next';
import { Heading, Table } from 'components';
import { useReactToPrint } from 'react-to-print';
import { useState, useRef } from 'react';
import { exportToExcel } from 'utils';
import './Barcodes.styles.scss';
import { PrintArea } from './sections';

// Columns for table
const columns = [
  {
    title: 'Scan ID',
    dataIndex: 'sid',
    sorter: (a, b) => a.sid - b.sid
  },
  {
    title: 'IMAGE',
    dataIndex: 'image',
    render: (text) => (
      <div className="barcodes__image">
        <img src={text} alt="barcode" />
      </div>
    )
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: 900,
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'Status',
    dataIndex: 'status',
    render: (text) => (
      <div className={`barcodes__status ${text === 'Rejected' ? 'barcodes__status-disabled' : ''}`}>
        {text}
      </div>
    )
  }
];

const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    sid: Number(`0${i}54${i}`),
    image: '/img/barcode.png',
    name: `Paul Elliott ${i}`,
    status: i % 2 === 0 ? 'Confirm' : 'Rejected'
  });
}

function Barcodes() {
  // const { t } = useTranslation();

  // Handling Printing
  const [rows, setRows] = useState([]);
  const printAreaRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printAreaRef.current
  });

  // Buttons for Table
  const buttons = [
    {
      title: 'Print Selected',
      disabled: !rows.length,
      onClick: () => handlePrint()
    }
  ];

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
    <div className="barcodes">
      <div>
        <Heading>Barcodes</Heading>
      </div>
      <div>
        <Table columns={columns} data={data} buttons={buttons} rowSelection={rowSelection} />
        <PrintArea ref={printAreaRef} rows={rows} />
      </div>
    </div>
  );
}

export default Barcodes;
