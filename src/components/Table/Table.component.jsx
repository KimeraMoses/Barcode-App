import { Input, Table as AntdTable } from "antd";
import { Button } from "components";
import { ArrowLeft, ArrowRight, Search } from "icons";
import { useState } from "react";
import "./Table.styles.scss";

// const { Option } = Select;

// Pagination Items
function itemRender(current, type, originalElement) {
  if (type === "prev") {
    return (
      <div>
        <ArrowLeft />
      </div>
    );
  }
  if (type === "next") {
    return (
      <div>
        <ArrowRight />
      </div>
    );
  }
  return originalElement;
}

export function Table({ data, columns, rowSelection, buttons, pageSize = 5 }) {
  // const [selectedFilter, setSelectedFilter] = useState(columns[0]?.dataIndex);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  // const [currentFilter, setCurrentFilter] = useState("");

  let userFilteredData = data;
  // const filterHandler = (selected) => {
  //   setSelectedFilter(selected);
  //   const newData = userFilteredData?.sort((a, b) => {
  //     let fa =
  //         typeof a[selectedFilter] === "number"
  //           ? a[selectedFilter].toString().toLowerCase()
  //           : a[selectedFilter]?.toLowerCase(),
  //       fb =
  //         typeof b[selectedFilter] === "number"
  //           ? b[selectedFilter].toString().toLowerCase()
  //           : b[selectedFilter]?.toLowerCase();
  //     setCurrentFilter(selectedFilter);
  //     if (fa < fb) {
  //       return currentFilter === selectedFilter ? 1 : -1;
  //     }
  //     if (fa > fb) {
  //       return currentFilter === selectedFilter ? -1 : 1;
  //     }
  //     return 0;
  //   });

  //   if (newData.length) {
  //     setFilteredData(newData);
  //   } else {
  //     setFilteredData([
  //       {
  //         key: "Not Found",
  //         uid: "Not Found",
  //         name: "Not Found",
  //         status: "Not Found",
  //         last_check_in: "Not Found",
  //         last_check_out: "Not Found",
  //       },
  //     ]);
  //   }
  // };

  const userSearchHandler = (e) => {
    const { value } = e.target;
    setSearchTerm(value);

    if (searchTerm !== "") {
      const Results = userFilteredData.filter((Result) => {
        return Object.values(Result)
          .join(" ")
          .replace(/-/g, " ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      if (Results.length > 0) {
        setSearchResults(Results);
      } else {
        setSearchResults([
          {
            key: "Not Found",
            uid: "Not Found",
            name: "Not Found",
            status: "Not Found",
            last_check_in: "Not Found",
            last_check_out: "Not Found",
          },
        ]);
      }
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
              type="search"
              value={searchTerm}
              onChange={userSearchHandler}
            />
            {/* <Select
              suffixIcon={<ArrowDown color="#000" />}
              value={selectedFilter}
              className="custom-table__filters-select"
              dropdownClassName="custom-select__dropdown"
              onChange={(selected) => {
                filterHandler(selected);
              }}
            >
              {columns
                ?.filter((col) => col["sorter"] !== undefined)
                .map((col) => {
                  return (
                    <Option key={col?.dataIndex} value={col?.dataIndex}>
                      Filter By : {col?.title}
                    </Option>
                  );
                })}
            </Select> */}
          </div>
          <div className="custom-table__filters-buttons">
            {buttons?.map((btn) => {
              return (
                <Button
                  key={btn?.title}
                  variant={btn?.variant}
                  onClick={btn?.onClick}
                  disabled={btn?.disabled}
                >
                  {btn?.title}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <AntdTable
        rowSelection={rowSelection}
        sortDirections={["ascend", "descend", "ascend"]}
        columns={columns}
        dataSource={searchTerm.length > 0 ? [...searchResults] : [...data]}
        className="custom-table__el"
        showSorterTooltip={false}
        pagination={{
          pageSize,
          itemRender,
          showTotal: (total, range) =>
            `Showing ${range[0]}-${range[1]} of ${total} Records`,
        }}
        scroll={{ x: true }}
      />
    </div>
  );
}
