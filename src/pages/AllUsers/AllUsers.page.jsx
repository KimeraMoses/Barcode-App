// import { useTranslation } from 'react-i18next';
import { useEffect, useRef, useState } from 'react';
import { Heading, Table, Modal } from 'components';
import { exportToExcel } from 'utils';
import { handleFileUpload, data, getColumns } from './utils';
import { AddUser, EditUser, DeleteUser } from './sections';
import './AllUsers.styles.scss';

function AllUsers() {
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const [user, setUser] = useState({});
  const [columns, setColumns] = useState(null);

  const inputFile = useRef(null);
  const buttons = [
    { onClick: () => inputFile.current.click(), title: 'Import CSV', variant: 'secondary' },
    {
      onClick: () => exportToExcel(data, 'all-users Users'),
      title: 'Export CSV',
      variant: 'secondary'
    },
    { title: 'Add New User', onClick: () => setModal(true) }
  ];

  const onEditClick = (userData) => {
    setUser(userData);
    setEditModal(true);
  };

  const onDeleteClick = (userData) => {
    setUser(userData);
    setDeleteModal(true);
  };

  useEffect(() => {
    setColumns(getColumns(onEditClick, onDeleteClick));
  }, []);

  return (
    <div className="all-users">
      <Modal showModal={modal} heading="Add New User" content={<AddUser setModal={setModal} />} />
      <Modal
        showModal={editModal}
        heading="Edit User"
        content={<EditUser setModal={setEditModal} user={user} setUser={setUser} />}
      />
      <Modal
        showModal={deleteModal}
        heading="Delete User"
        content={<DeleteUser setModal={setDeleteModal} user={user} setUser={setUser} />}
      />
      <div>
        <Heading>All Users</Heading>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </div>
      <div>{columns ? <Table columns={columns} data={data} buttons={buttons} /> : null}</div>
    </div>
  );
}

export default AllUsers;
