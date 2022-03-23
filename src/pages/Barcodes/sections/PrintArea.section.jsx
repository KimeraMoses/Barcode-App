import { forwardRef } from 'react';
import './PrintArea.styles.scss';

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
                <img src={row.image} alt="barcode" />
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
