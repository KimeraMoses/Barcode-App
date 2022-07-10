import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

export const exportToExcel = (json, fileName) => {
  const fileType = 'text/csv;charset=utf-8';
  const fileExtension = '.csv';

  const ws = XLSX.utils.json_to_sheet(json);

  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };

  const excelBuffer = XLSX.write(wb, { bookType: 'csv', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
