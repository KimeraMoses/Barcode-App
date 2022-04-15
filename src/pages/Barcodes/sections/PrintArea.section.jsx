import { forwardRef } from "react";
import ReactBarcode from "react-jsbarcode";
import "./PrintArea.styles.scss";

export const PrintArea = forwardRef(({ rows = [] }, ref) => {
  return (
    <div className="print-area" ref={ref}>
      <table className="print-area__table">
        <thead>
          <tr>
            <th>Scan ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.key}>
              <td>{row.sid}</td>
              <td>
                <ReactBarcode
                  value={row.image}
                  className="barcode"
                  options={{ displayValue: false, background: "transparent" }}
                  displayValue={false}
                  renderer="image"
                />
              </td>
              <td>{row.name}</td>
              <td>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
