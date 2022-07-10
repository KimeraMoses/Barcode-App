import { Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUser } from "store/Actions/userActions";
import "./DeleteUser.styles.scss";
import { useState } from "react";
import { messageNotifications } from "store";

export function DeleteUser({ setModal, user, setUser, isAdmin }) {
  const authToken = useSelector((state) => state.auth.token);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const deleteUserHandler = async () => {
    setIsLoading(true);
    try {
      await dispatch(deleteUser(user.key, authToken, isAdmin ? true : false));
      setIsLoading(false);
      setUser({});
      setModal(false);
      toast.success(`${user.name} delete successfuly`, {
        ...messageNotifications,
      });
    } catch (error) {
      setIsLoading(false);
      toast.success(`Failed to delete ${user.name}!`, {
        ...messageNotifications,
      });
    }
  };
  return (
    <div className="edit-user__modal">
      <div className="edit-user__modal-content">
        Are you sure you wish to delete this {user.full_name}? This action will
        be permanent and can not be undone.
      </div>
      <div className="edit-user__modal-buttons">
        <Button
          variant="secondary"
          onClick={() => {
            setModal(false);
            setUser({});
          }}
        >
          Cancel
        </Button>
        <Button onClick={deleteUserHandler} disabled={isLoading}>
          {isLoading ? "Deleting..." : "Delete User"}
        </Button>
      </div>
    </div>
  );
}
