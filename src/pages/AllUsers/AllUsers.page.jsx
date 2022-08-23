import { useEffect, useRef, useState } from "react";
import { Heading, Table, Modal } from "components";
import { exportToExcel } from "utils";
import { getColumns } from "./utils";
import { AddUser, EditUser, DeleteUser } from "./sections";
import "./AllUsers.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "store/Actions/userActions";
import { uploadFile } from "./../../store/Actions/userActions";
import { toast } from "react-toastify";
import { messageNotifications } from "store";

function AllUsers() {
  const authToken = useSelector((state) => state.auth.token);
  const { userList, isFetching } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllUsers(authToken));
  }, [authToken, dispatch]);

  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [user, setUser] = useState({});
  const [columns, setColumns] = useState(null);
  const inputFile = useRef(null);
  let data = [];

  userList &&
    userList
      .slice()
      .sort((a, b) => new Date(b.created) - new Date(a.created))
      .forEach((user) => {
        data.push({
          key: user.id,
          uid: user?.barcode_uuid,
          name: user.full_name,
          email: user.email,
          company: user.company,
          status: user.status === 1 ? "Currently Enabled" : "Disabled",
          check_ins: user.numCheckIns,
          check_outs: user.numCheckouts,
        });
      });

  const buttons = [
    {
      onClick: () => inputFile.current.click(),
      title: `${isLoading ? "Uploading..." : "Import CSV"}`,
      variant: "secondary",
    },
    {
      onClick: () => exportToExcel(data, "all-users Users"),
      title: "Export CSV",
      variant: "secondary",
    },
    { title: "Add New User", onClick: () => setModal(true) },
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

  const handleFileUpload = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    try {
      await dispatch(uploadFile(file, authToken));
      setIsLoading(false);
      toast.success(`Document uploaded successfuly`, {
        ...messageNotifications,
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(`Failed to document!`, {
        ...messageNotifications,
      });
    }
  };

  return (
    <div className="all-users">
      <Modal
        showModal={modal}
        heading="Add New User"
        content={<AddUser setModal={setModal} />}
      />
      <Modal
        showModal={editModal}
        heading="Edit User"
        content={
          <EditUser setModal={setEditModal} user={user} setUser={setUser} />
        }
      />
      <Modal
        showModal={deleteModal}
        heading="Delete User"
        content={
          <DeleteUser
            setModal={setDeleteModal}
            user={user}
            setUser={setUser}
            isAdmin={false}
          />
        }
      />
      <div>
        <Heading>All Users</Heading>
        <input
          type="file"
          id="file"
          ref={inputFile}
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>
      <div>
        {columns ? (
          <Table
            columns={columns}
            data={data}
            buttons={buttons}
            isLoading={isFetching}
          />
        ) : null}
      </div>
    </div>
  );
}

export default AllUsers;
