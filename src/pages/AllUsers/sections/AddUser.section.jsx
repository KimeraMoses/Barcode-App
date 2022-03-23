import { Button } from 'components';

export function AddUser({ setModal }) {
  return (
    <div className="all-users__modal">
      <div>
        <div className="all-users__modal-content">
          Please enter the required information below in order to add a new user record to the table
          being displayed.
        </div>
        <div className="all-users__modal-list">
          <div className="all-users__modal-list-el">
            <div className="all-users__modal-list-el-cn">
              <input type="checkbox" defaultChecked />
              <div>Sam</div>
            </div>
            <div>User 123456</div>
          </div>
        </div>
      </div>
      <div>
        <div className="all-users__modal-buttons">
          <Button
            variant="secondary"
            onClick={() => {
              setModal(false);
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setModal(false);
            }}>
            Add New User
          </Button>
        </div>
      </div>
    </div>
  );
}
