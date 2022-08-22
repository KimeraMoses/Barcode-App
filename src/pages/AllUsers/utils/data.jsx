import { Space } from "antd";
import { Trash, Document } from "icons";

export const getColumns = (onEditClick, onDeleteClick) => {
  return [
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
      title: "COMPANY",
      dataIndex: "company",
      sorter: (a, b) => (a?.company < b?.company ? -1 : 1),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      width: 300,
      render: (text) => (
        <div
          className={`all-users__status ${
            text === "Disabled" ? "all-users__status-disabled" : ""
          }`}
        >
          {text}
        </div>
      ),
    },
    {
      title: "CHECK INS",
      dataIndex: "check_ins",
      sorter: (a, b) => a.check_ins - b.check_ins,
    },
    {
      title: "CHECK OUTS",
      dataIndex: "check_outs",
      sorter: (a, b) => a.check_outs - b.check_outs,
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                onEditClick(record);
              }}
              onClick={() => {
                onEditClick(record);
              }}
              style={{ cursor: "pointer" }}
            >
              <Document />
            </div>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                onDeleteClick(record);
              }}
              onClick={() => {
                onDeleteClick(record);
              }}
              style={{ cursor: "pointer" }}
            >
              <Trash />
            </div>
          </Space>
        );
      },
    },
  ];
};

export const getAdminColumns = (onEditClick, onDeleteClick) => {
  return [
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
      title: "EMAIL",
      dataIndex: "email",
      sorter: (a, b) => (a?.email < b?.email ? -1 : 1),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      width: 500,
      render: (text) => (
        <div
          className={`all-users__status ${
            text === "Disabled" ? "all-users__status-disabled" : ""
          }`}
        >
          {text}
        </div>
      ),
      sorter: (a, b) => (a?.status < b?.status ? -1 : 1),
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <Space size="middle">
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                onEditClick(record);
              }}
              onClick={() => {
                onEditClick(record);
              }}
              style={{ cursor: "pointer" }}
            >
              <Document />
            </div>
            <div
              role="button"
              tabIndex={0}
              onKeyDown={() => {
                onDeleteClick(record);
              }}
              onClick={() => {
                onDeleteClick(record);
              }}
              style={{ cursor: "pointer" }}
            >
              <Trash />
            </div>
          </Space>
        );
      },
    },
  ];
};
