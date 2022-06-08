import { Button, Heading, Table, Modal } from "components";
import { exportToExcel } from "utils";
import { useEffect, useState } from "react";
import "./OnSiteUsers.styles.scss";
import { checkInUsers, fetchOnSiteUsers } from "store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { messageNotifications } from "store";

// Columns for table
const columns = [
  {
    title: "USER ID",
    dataIndex: "uid",
    sorter: (a, b) => a.uuid - b.uuid,
  },
  {
    title: "NAME",
    dataIndex: "name",
    sorter: (a, b) => a.full_name.length - b.full_name.length,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    width: 500,
    render: (text) => <div className="on-site__status">{text}</div>,
    sorter: (a, b) => a.status.length - b.status.length,
  },
  {
    title: "LAST CHECK IN",
    dataIndex: "last_check_in",
    sorter: (a, b) => a.lastCheckIn - b.lastCheckIn,
  },
  {
    title: "LAST CHECK OUT",
    dataIndex: "last_check_out",
    sorter: (a, b) => a.lastCheckout - b.lastCheckout,
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
  const userList = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchOnSiteUsers(authToken));
  }, [authToken, dispatch]);

  const [rows, setRows] = useState([]);
  const [checkInModal, setCheckInModal] = useState(false);
  const [checkOutModal, setCheckOutModal] = useState(false);

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

  // const handleUserModal = (e, userId) => {
  //   setUserValue(e.target.checked);
  //   setSelectedId(userId);
  //   console.log(userId);
  //   console.log(rows);
  //   Rows.filter((user) => user.key !== selectedId);
  // };

  let data = [];

  userList &&
    userList.forEach((user) => {
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
          uid: user.id,
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
      disabled: !rows.length,
    },
    {
      title: "Check Out Users",
      onClick: () => setCheckOutModal(true),
      disabled: !rows.length,
    },
  ];

  const checkUsersHandler = async (userIds) => {
    setIsLoading(true);
    const user_ids = [];
    userIds.forEach((user) => {
      user_ids.push(user.key);
    });
    try {
      await dispatch(
        checkInUsers(user_ids, authToken, checkInModal ? true : false)
      );
      setIsLoading(false);
      if (checkInModal) {
        setCheckInModal(false);
      } else {
        setCheckOutModal(false);
      }
      toast.success(
        `You have successfuly checked ${checkInModal ? "In" : "out"}  ${
          user_ids.length
        } users`,
        {
          ...messageNotifications,
        }
      );
    } catch (error) {
      setIsLoading(false);

      toast.error(
        `Failed to check ${checkInModal ? "in" : "out"} ${
          user_ids.length
        } users`,
        {
          ...messageNotifications,
        }
      );
    }
  };

  return (
    <div className="on-site">
      <Modal
        showModal={checkInModal || checkOutModal}
        heading={checkInModal ? "Check In Users" : "Check Out Users"}
        content={
          <div className="on-site__modal">
            <div>
              <div className="on-site__modal-content">
                Please select the users from the list given below in order to
                manually check them {checkInModal ? "in to" : "out of"}
                the system.
              </div>
              <div className="on-site__modal-list">
                {rows.map((row) => {
                  return (
                    <div className="on-site__modal-list-el" key={row.uid}>
                      <div className="on-site__modal-list-el-cn">
                        <input type="checkbox" checked />
                        <div>{row?.name}</div>
                      </div>
                      <div>{row?.uid}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="on-site__modal-buttons">
                <Button
                  variant="secondary"
                  disabled={isLoading}
                  onClick={() => {
                    if (checkInModal) {
                      setCheckInModal(false);
                    } else {
                      setCheckOutModal(false);
                    }
                  }}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => checkUsersHandler(rows)}
                >
                  {checkInModal && isLoading
                    ? "Checking In..."
                    : checkInModal
                    ? "Check In Users"
                    : !checkInModal && isLoading
                    ? "Checking Out..."
                    : "Check Out Users"}
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
        <Table
          columns={columns}
          data={data}
          rowSelection={rowSelection}
          buttons={buttons}
        />
      </div>
    </div>
  );
}

export default OnSiteUsers;
