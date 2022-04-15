// import { useTranslation } from 'react-i18next';
import { Heading, Table } from "components";
import { useReactToPrint } from "react-to-print";
import { useState, useRef, useEffect } from "react";
import ReactBarcode from "react-jsbarcode";
// import { exportToExcel } from 'utils';
import "./Barcodes.styles.scss";
import { PrintArea } from "./sections";
import { useDispatch, useSelector } from "react-redux";
import { fetchBardCodes } from "store/Actions/barCodeActions";

// Columns for table
const columns = [
  {
    title: "Scan ID",
    dataIndex: "sid",
    sorter: (a, b) => a.sid - b.sid,
  },
  {
    title: "IMAGE",
    dataIndex: "image",
    render: (value) => {
      return (
        <div className="barcodes__image">
          <ReactBarcode
            value={value}
            className="barcode"
            options={{
              displayValue: false,
              background: "transparent",
              height: 50,
            }}
            displayValue={false}
            renderer="image"
          />
        </div>
      );
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    width: 900,
    sorter: (a, b) => a.full_name.length - b.full_name.length,
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text) => (
      <div
        className={`barcodes__status ${
          text === "Rejected" ? "barcodes__status-disabled" : ""
        }`}
      >
        {text}
      </div>
    ),
  },
];

function Barcodes() {
  const authToken = useSelector((state) => state.auth.token);
  const barCodeList = useSelector((state) => state.barCode.barCodeList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBardCodes(authToken));
  }, [authToken, dispatch]);

  // Handling Printing
  const [rows, setRows] = useState([]);
  const printAreaRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => printAreaRef.current,
  });

  const data = [];
  barCodeList &&
    barCodeList.forEach((code) => {
      data.push({
        key: code.id,
        sid: code.id,
        image: code.id,
        name: code.user_id && code.user_id.full_name,
        status:
          code.user_id && code.user_id.status === 1 ? "Confirm" : "Rejected",
      });
    });

  // Buttons for Table
  const buttons = [
    {
      title: "Print Selected",
      disabled: !rows.length,
      onClick: () => handlePrint(),
    },
  ];

  const rowSelection = {
    type: "checkbox",
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setRows(selectedRows);
    },
    getCheckboxProps: (record) => ({
      // disabled: record.name === 'Disabled User'
      // Column configuration not to be checked
      // name: record.name
    }),
  };

  return (
    <div className="barcodes">
      <div>
        <Heading>Barcodes</Heading>
      </div>
      <div>
        <Table
          columns={columns}
          data={data}
          buttons={buttons}
          rowSelection={rowSelection}
          pageSize={16}
        />
        <PrintArea ref={printAreaRef} rows={rows} />
      </div>
    </div>
  );
}

export default Barcodes;
