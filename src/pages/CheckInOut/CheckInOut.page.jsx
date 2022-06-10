// import { useTranslation } from 'react-i18next';
import { Heading, Table } from "components";
import { useEffect } from "react";
import { exportToExcel } from "utils";
import "./CheckInOut.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUserEvents } from "store/Actions/userActions";
import { dateFormat, isValidDate } from "pages/OnSiteUsers/OnSiteUsers.page";

// Columns for table
const columns = [
  {
    title: "USER ID",
    dataIndex: "uid",
    sorter: (a, b) => a.uid - b.uid,
  },
  {
    title: "NAME",
    dataIndex: "name",
    width: 300,
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "EVENT",
    dataIndex: "event",
    width: 500,
    render: (text) => (
      <div
        className={`check-in-out__status ${
          text === "Checked Out" ? "check-in-out__status-disabled" : ""
        }`}
      >
        {text}
      </div>
    ),
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "Date",
    dataIndex: "last_check_out",
    width: 300,
    sorter: (a, b) => a.last_check_out - b.last_check_out,
  },
];

function CheckIn() {
  const authToken = useSelector((state) => state.auth.token);
  const userEvents = useSelector((state) => state.users.userEvents);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUserEvents(authToken));
  }, [authToken, dispatch]);

  let data = [];

  userEvents &&
    userEvents.forEach((event) => {
      if (event.user_id) {
        const last_check_out_date = new Date(event.created);
        data.push({
          key: event.id,
          uid: event.user_id?.barcode_id,
          name: event.user_id?.full_name,
          event: event.type === "checkIn" ? "Checked In" : "Checked Out",
          last_check_out: isValidDate(last_check_out_date)
            ? last_check_out_date.toLocaleTimeString("en-Us", {
                ...dateFormat,
              })
            : "No Date Found",
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
