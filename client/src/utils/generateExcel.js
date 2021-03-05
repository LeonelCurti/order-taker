import axios from "axios";
import FileSaver from "file-saver";

export const downloadCatalogExcel = () => {
  axios("/api/v1/pricelist/download", {
    responseType: "blob",
  }).then((response) => {
    const date = new Date();
    const fileName =
      "Catalog" +
      "-" +
      date.getDate() +
      "-" +
      `${date.getMonth() + 1}` +
      "-" +
      date.getFullYear();
    FileSaver.saveAs(new Blob([response.data]), `${fileName}.xlsx`);
  });
};
