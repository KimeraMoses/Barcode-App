import { Table as AntdTable } from 'antd';
import { ArrowLeft, ArrowRight } from 'icons';
import './Table.styles.scss';

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

export function Table({ data, columns, rowSelection }) {
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
        scroll={{ x: true }}
      />
    </div>
  );
}
