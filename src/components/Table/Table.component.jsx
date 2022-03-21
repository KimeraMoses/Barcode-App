import { useState } from 'react';
import { Table as AntdTable, Radio, Divider, Input, Select } from 'antd';
import { Button } from 'components';
import { ArrowLeft, ArrowRight, Search } from 'icons';
import './Table.styles.scss';

const { Option } = Select;

// Columns for table
const columns = [
  {
    title: 'USER ID',
    dataIndex: 'uid',
    sorter: (a, b) => a.uid - b.uid
  },
  {
    title: 'NAME',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    width: 500,
    render: (text) => <div className="custom-table__status">{text}</div>,
    sorter: (a, b) => a.status.length - b.status.length
  },
  {
    title: 'LAST CHECK IN',
    dataIndex: 'last_check_in',
    sorter: (a, b) => a.last_check_in - b.last_check_in
  },
  {
    title: 'LAST CHECK OUT',
    dataIndex: 'last_check_out',
    sorter: (a, b) => a.last_check_out - b.last_check_out
  }
];

// Data for table
const data = [];
for (let i = 0; i < 50; i += 1) {
  data.push({
    key: i,
    uid: Number(`0${i}54${i}`),
    name: `Paul Elliott ${i}`,
    status: 'Currently Checked In',
    last_check_in: `Mar 5th, 2022 at 01:00:00 PM`,
    last_check_out: 'Mar 5th, 2022 at 01:00:00 PM'
  });
}

const rowSelection = {
  type: 'checkbox',
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name
  })
};

// Pagination Items
function itemRender(current, type, originalElement) {
  if (type === 'prev') {
    return (
      <div>
        <ArrowLeft />
      </div>
    );
  }
  if (type === 'next') {
    return (
      <div>
        <ArrowRight />
      </div>
    );
  }
  return originalElement;
}

export function Table() {
  return (
    <div className="custom-table">
      <AntdTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        className="custom-table__el"
        showSorterTooltip={false}
        pagination={{
          pageSize: 5,
          itemRender,
          showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} Records`
        }}
      />
    </div>
  );
}
