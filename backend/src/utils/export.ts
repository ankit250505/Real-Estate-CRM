import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";

export async function buildExcelReport(rows: Record<string, unknown>[], sheetName: string) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(sheetName);

  if (rows.length > 0) {
    sheet.columns = Object.keys(rows[0]).map((key) => ({
      header: key,
      key,
      width: 24
    }));
    rows.forEach((row) => sheet.addRow(row));
  }

  return workbook.xlsx.writeBuffer();
}

export async function buildPdfReport(title: string, rows: Record<string, unknown>[]) {
  const doc = new PDFDocument({ margin: 32 });
  const chunks: Buffer[] = [];

  doc.on("data", (chunk) => chunks.push(chunk as Buffer));

  doc.fontSize(18).text(title);
  doc.moveDown();
  rows.forEach((row) => {
    doc.fontSize(11).text(JSON.stringify(row, null, 2));
    doc.moveDown();
  });
  doc.end();

  return new Promise<Buffer>((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(chunks)));
  });
}
