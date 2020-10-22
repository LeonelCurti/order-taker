import jsPDF from "jspdf";

export const generateOrderPdf = (order) => {
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;

  const columns = [["Code", "Description", "Qty", "Price", "Subtotal"]];

  const rows = order.items.map((elt) => [
    elt.cod,
    elt.descrip,
    elt.quantity,
    elt.price,
    elt.price * elt.quantity,
  ]);
  rows.push([
    "",
    "",
    "",
    {
      content: "Total",
      styles: { fontStyle: "bold" },
    },
    {
      content: order.total,
      styles: { fontStyle: "bold" },
    },
  ]);

  let tableContent = {
    startY: 50,
    head: columns,
    body: rows,
  };

  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(15);
  doc.setProperties({
    title: `Order_${order.number}`,
  });

  doc.text(`Order nº ${order.number}`, marginLeft, 40);
  doc.autoTable(tableContent);
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(doc.output("blob"), "Name.pdf");
  } else {
    // For other browsers:
    // Create a link pointing to the ObjectURL containing the blob.
    window.open(URL.createObjectURL(doc.output("blob")), "_blank");

    // For Firefox it is necessary to delay revoking the ObjectURL
    setTimeout(() => {
      window.URL.revokeObjectURL(doc.output("bloburl"));
    }, 100);
  }
};

