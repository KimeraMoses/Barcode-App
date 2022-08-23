import { Input, Table as AntdTable } from "antd";
import { Button } from "components";
import { ArrowLeft, ArrowRight, Search } from "icons";
import { useState } from "react";
import "./Table.styles.scss";

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

export function Table({
  data,
  columns,
  rowSelection,
  buttons,
  pageSize = 5,
  isLoading,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  let userFilteredData = data;

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
        loading={isLoading}
      />
    </div>
  );
}
