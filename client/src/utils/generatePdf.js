import jsPDF from "jspdf";

export const generatePdf = (data) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);
  doc.setProperties({
		title: data.title
	});

  doc.text(data.title, marginLeft, 40);
  doc.autoTable(data.tableContent);
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(doc.output("blob"), "Name.pdf");
  } else {

    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    // doc.autoPrint();
    window.open(
      URL.createObjectURL(doc.output("blob")),
      "_blank",
    );

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => {
      window.URL.revokeObjectURL(doc.output("bloburl"));
    }, 100);
  }

};
