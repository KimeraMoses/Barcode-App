import { Button } from 'components';
import './DeleteUser.styles.scss';

export function DeleteUser({ setModal, user, setUser }) {
  return (
    <div className="edit-user__modal">
      <div className="edit-user__modal-content">
        Are you sure you wish to delete this user? This action will be permanent and can not be
        undone.
      </div>
      <div className="edit-user__modal-buttons">
        <Button
          variant="secondary"
          onClick={() => {
            setModal(false);
            setUser({});
          }}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            setModal(false);
            alert(`User # ${user?.uid} will be deleted.`);
            setUser({});
          }}>
          Save Changes
        </Button>
      </div>
    </div>
  );
}
