import { useEffect, useState } from "react";
import "./../AllUsers.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAdminColumns } from "../utils";
import { exportToExcel } from "utils";
import { AddUser, DeleteUser, EditUser } from "../sections";
import { Heading, Modal, Table } from "components";
import { fetchAllAdmins } from "./../../../store/Actions/userActions";

function AllAdmins() {
  const authToken = useSelector((state) => state.auth.token);
  const adminList = useSelector((state) => state.users.adminList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAdmins(authToken));
  }, [authToken, dispatch]);

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [user, setUser] = useState({});
  const [columns, setColumns] = useState(null);
  let data = [];

  adminList &&
    adminList
      .slice()
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .forEach((user) => {
        data.push({
          key: user.id,
          uid: user.id,
          name: user.full_name,
          username: user.username,
          email: user.email,
          role: user.role,
          status: user.status === 1 ? "Currently Enabled" : "Disabled",
          timezone: user.timezone,
        });
      });

  const buttons = [
    {
      onClick: () => exportToExcel(data, "all-users Users"),
      title: "Export CSV",
      variant: "secondary",
    },
    { title: "Add New Admin", onClick: () => setModal(true) },
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
    setColumns(getAdminColumns(onEditClick, onDeleteClick));
  }, []);

  return (
    <div className="all-users">
      <Modal
        showModal={modal}
        heading="Add New Admin"
        content={<AddUser setModal={setModal} isAdmin={true} />}
      />
      <Modal
        showModal={editModal}
        heading="Edit Admin"
        content={
          <EditUser
            setModal={setEditModal}
            user={user}
            setUser={setUser}
            isAdmin={true}
          />
        }
      />
      <Modal
        showModal={deleteModal}
        heading="Delete Admin"
        content={
          <DeleteUser
            setModal={setDeleteModal}
            user={user}
            setUser={setUser}
            isAdmin={true}
          />
        }
      />
      <div>
        <Heading>All Admins</Heading>
      </div>
      <div>
        {columns ? (
          <Table columns={columns} data={data} buttons={buttons} />
        ) : null}
      </div>
    </div>
  );
}

export default AllAdmins;
