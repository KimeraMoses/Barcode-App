import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnabledUsers } from "./../../store/Actions/userActions";
import { Button } from "./../../components/Button/Button.component";
import { messageNotifications } from "store";
import { toast } from "react-toastify";
import { checkInUsers } from "store/Actions/userActions";

const EnabledUsers = (props) => {
  const { setCheckInModal, setCheckOutModal, checkInModal } = props;
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector((state) => state.auth.token);
  const userList = useSelector((state) => state.users.enbaledUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEnabledUsers(authToken));
  }, [authToken, dispatch]);

  let UserList = [];

  if (checkInModal) {
    UserList =
      userList &&
      userList.filter(
        (user) =>
          new Date(user.lastCheckIn) < new Date(user.lastCheckout) ||
          !user.lastCheckIn
      );
  } else {
    UserList =
      userList &&
      userList.filter(
        (user) =>
          new Date(user.lastCheckIn) > new Date(user.lastCheckout) ||
          !user.lastCheckout
      );
  }

  let selectedList = [];
  const handleSelectionChange = (e, row) => {
    if (e.target.checked) {
      selectedList.push(row);
    } else {
      selectedList = selectedList.filter((item) => item.id !== e.target.value);
    }
  };

  const checkUsersHandler = async (userIds) => {
    setIsLoading(true);
    const user_ids = [];
    userIds.forEach((user) => {
      user_ids.push(user.id);
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
    <>
      <div>
        <div className="on-site__modal-content">
          Please select the users from the list given below in order to manually
          check them {checkInModal ? "in to " : "out of "}
          the system.
        </div>
        <div className="on-site__modal-list">
          {UserList.length < 1 ? (
            <div className="on-site__modal-list-no-data">
              All users have been {checkInModal ? "CheckedIn" : "checkedOut"}
            </div>
          ) : (
            UserList.map((row) => {
              return (
                <div className="on-site__modal-list-el" key={row.id}>
                  <div className="on-site__modal-list-el-cn">
                    <input
                      type="checkbox"
                      value={row.id}
                      onChange={(e) => handleSelectionChange(e, row)}
                    />
                    <div>{row?.full_name}</div>
                  </div>
                  <div>{row?.id}</div>
                </div>
              );
            })
          )}
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
            disabled={isLoading || UserList.length < 1}
            onClick={() => checkUsersHandler(selectedList)}
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
    </>
  );
};

export default EnabledUsers;
