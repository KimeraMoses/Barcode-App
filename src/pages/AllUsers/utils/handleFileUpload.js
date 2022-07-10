import { processData } from "utils";
import * as XLSX from "xlsx";

export const handleFileUpload = (e) => {
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = (evt) => {
    /* Parse data */
    const bstr = evt.target.result;
    const wb = XLSX.read(bstr, { type: "binary" });
    /* Get first worksheet */
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    /* Convert array of arrays */
    const csvData = XLSX.utils.sheet_to_csv(ws, { header: 1 });

    const { columns, list } = processData(csvData);

    // Uplaod to backend here
    console.log(columns, list);
  };
  reader.readAsBinaryString(file);
};
