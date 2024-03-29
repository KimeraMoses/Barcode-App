import { Heading, Table, Modal } from "components";
import { exportToExcel } from "utils";
import { useEffect, useState } from "react";
import "./OnSiteUsers.styles.scss";
import { fetchOnSiteUsers } from "store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import EnabledUsers from "./EnabledUsers";
import moment from "moment";

// Columns for table
const columns = [
  {
    title: "USER ID",
    dataIndex: "uid",
    sorter: (a, b) => (a?.uid < b?.uid ? -1 : 1),
  },
  {
    title: "NAME",
    dataIndex: "name",
    sorter: (a, b) => (a?.name < b?.name ? -1 : 1),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    width: 300,
    render: (text) => <div className="on-site__status">{text}</div>,
  },
  {
    title: "LAST CHECK IN",
    dataIndex: "last_check_in",
    sorter: (a, b) =>
      moment(a?.last_check_in) < moment(b?.last_check_in) ? -1 : 1,
  },
  {
    title: "LAST CHECK OUT",
    dataIndex: "last_check_out",
    sorter: (a, b) =>
      moment(a?.last_check_out) < moment(b?.last_check_out) ? -1 : 1,
  },
];

export const dateFormat = {
  weekday: "short",
  day: "numeric",
  year: "numeric",
  month: "long",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
};
export function isValidDate(dateObject) {
  return new Date(dateObject).toString() !== "Invalid Date";
}

function OnSiteUsers() {
  const authToken = useSelector((state) => state.auth.token);
  const { isFetching, onSiteUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOnSiteUsers(authToken));
  }, [authToken, dispatch]);

  // const [rows, setRows] = useState([]);
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);

  const rowSelection = {
    type: "checkbox",
    // onChange: (selectedRowKeys, selectedRows) => {
    //   // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   // setRows(selectedRows);
    // },
    getCheckboxProps: (record) => ({
      // disabled: record.name === 'Disabled User'
      // Column configuration not to be checked
      // name: record.name
    }),
  };

  let data = [];

  onSiteUsers &&
    onSiteUsers
      .slice()
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .forEach((user) => {
        const last_check_in_date = new Date(user.lastCheckIn);
        const last_check_out_date = new Date(user.lastCheckout);
        const isValidCheckInDate = isValidDate(last_check_in_date);
        const isValidCheckOutDate = isValidDate(last_check_out_date);
        if (
          last_check_in_date > last_check_out_date ||
          (isValidCheckInDate && !isValidCheckOutDate)
        ) {
          data.push({
            key: user.id,
            uid: user?.barcode_uuid,
            name: user.full_name,
            email: user.email,
            status: "Currently Checked In",
            last_check_in:
              user.lastCheckIn !== ""
                ? last_check_in_date.toLocaleTimeString("en-Us", {
                    ...dateFormat,
                  })
                : "Never checked In",
            last_check_out:
              user.lastCheckout !== ""
                ? last_check_out_date.toLocaleTimeString("en-Us", {
                    ...dateFormat,
                  })
                : "Never checked out",
          });
        }
      });

  // Buttons for Table
  const buttons = [
    {
      variant: "secondary",
      title: "Export CSV",
      onClick: () => exportToExcel(data, "custom-table Users"),
    },
    {
      variant: "secondary",
      title: "Check In Users",
      onClick: () => setCheckInModal(true),
    },
    {
      title: "Check Out Users",
      onClick: () => setCheckOutModal(true),
    },
  ];

  return (
    <div className="on-site">
      <Modal
        showModal={checkInModal || checkOutModal}
        heading={checkInModal ? "Check In Users" : "Check Out Users"}
        content={
          <div className="on-site__modal">
            <EnabledUsers
              setCheckInModal={setCheckInModal}
              setCheckOutModal={setCheckOutModal}
              checkInModal={checkInModal}
            />
          </div>
        }
      />
      <div>
        <Heading>On-Site Users</Heading>
      </div>
      <div>
        <Table
          columns={columns}
          data={data}
          rowSelection={rowSelection}
          buttons={buttons}
          isLoading={isFetching}
        />
      </div>
    </div>
  );
}

export default OnSiteUsers;
