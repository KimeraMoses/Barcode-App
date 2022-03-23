import { Input, Select, Table as AntdTable } from 'antd';
import { Button } from 'components';
import { ArrowLeft, ArrowRight, Search } from 'icons';
import { useState } from 'react';
import './Table.styles.scss';

const { Option } = Select;

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

export function Table({ data, columns, rowSelection, buttons }) {
  const [selectedFilter, setSelectedFilter] = useState(columns[0]?.dataIndex);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    if (e.target.value) {
      const newData = data.filter((item) => {
        const value =
          typeof item[selectedFilter] === 'number'
            ? item[selectedFilter].toString()
            : item[selectedFilter];
        return value.indexOf(e.target.value) !== -1;
      });
      if (newData.length) {
        setFilteredData(newData);
      } else {
        setFilteredData([
          {
            key: 'Not Found',
            uid: 'Not Found',
            name: 'Not Found',
            status: 'Not Found',
            last_check_in: 'Not Found',
            last_check_out: 'Not Found'
          }
        ]);
      }
    } else {
      setFilteredData([]);
    }
  };

  return (
    <div className="custom-table">
      <div>
        <div className="custom-table__filters">
          <div className="custom-table__filters-search-wrapper">
            <Input
              className="custom-table__filters-search"
              placeholder="Search..."
              suffix={<Search />}
              onChange={handleSearch}
            />
            <Select
              value={selectedFilter}
              className="custom-table__filters-select"
              dropdownClassName="custom-select__dropdown"
              onChange={(selected) => {
                setSelectedFilter(selected);
              }}>
              {columns?.map((col) => {
                return (
                  <Option key={col?.dataIndex} value={col?.dataIndex}>
                    Filter By : {col?.title}
                  </Option>
                );
              })}
            </Select>
          </div>
          <div className="custom-table__filters-buttons">
            {buttons?.map((btn) => {
              return (
                <Button
                  key={btn?.title}
                  variant={btn?.variant}
                  onClick={btn?.onClick}
                  disabled={btn?.disabled}>
                  {btn?.title}
                </Button>
              );
            })}
            {/* <Button
              variant="secondary"
              onClick={() => {
                //
              }}>
              Export CSV
            </Button>
            <Button
              variant="secondary"
              // disabled={!rows.length}
              onClick={() => {
                // ;
              }}>
              Check In Users
            </Button>
            <Button
              // disabled={!rows.length}
              onClick={() => {
                // ;
              }}>
              Check Out Users
            </Button> */}
          </div>
        </div>
      </div>

      <AntdTable
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData.length ? filteredData : data}
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
