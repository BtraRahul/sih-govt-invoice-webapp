"use client";
import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

//firebase add data
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

function GenerateInvoice() {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      backgroundColor: "black",
      orientation: "portrait",
      unit: "pt",
      format: [1224, 1584],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });

  return null;
}

function SaveInvoice(props) {
  const docRef = addDoc(collection(db, "invoices"), {
    invoiceNumber: props.info.invoiceNumber,

    billTo: props.info.billTo,
    billToAddress: props.info.billToAddress,
    billToEmail: props.info.billToEmail,

    billFrom: props.info.billFrom,
    billFromAddress: props.info.billFromAddress,
    billFromEmail: props.info.billFromEmail,

    dateOfIssue: props.info.dateOfIssue,
    subTotal: props.info.subTotal,
    taxRate: props.info.taxRate,
    taxAmount: props.info.taxAmount,

    discountRate: props.info.discountRate,
    discountAmount: props.info.discountAmount,

    total: props.info.currency + props.info.total,
    notes: props.info.notes,

    items: props.items,
  });
  return null;
}

function InvoiceModal(props) {
  const totalWithTaxAndDiscount = (
    parseFloat(props.subTotal) +
    parseFloat(props.taxAmount) -
    parseFloat(props.discountAmount)
  ).toFixed(2);
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.closeModal}
        size="lg"
        centered
      >
        <div id="invoiceCapture">
          <div className="border capitalize bg-black text-white d-flex flex-row justify-content-between align-items-start w-100 p-4">
            <div className="w-100">
              <h4 className="fw-bold my-2">
                {props.info.billFrom || "John Uberbacher"}
              </h4>
              <h6 className="fw-bold text-secondary mb-1">
                Invoice #: {props.info.invoiceNumber || ""}
              </h6>
            </div>
            <div className="text-end ms-4">
              {/* <h6 className="c fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6> */}
              <h5 className="fw-bold text-secondary">
                {" "}
                {props.info.currency} {props.info.totalWithTaxAndDiscount}
                {/* {props.currency} {props.total} */}
              </h5>
            </div>
          </div>
          <div className="p-4 bg-dark text-white border">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{props.info.billTo || ""}</div>
                <div>{props.info.billToAddress || ""}</div>
                <div>{props.info.billToEmail || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{props.info.billFrom || ""}</div>
                <div>{props.info.billFromAddress || ""}</div>
                <div>{props.info.billFromEmail || ""}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Date Of Issue:</div>
                <div>{props.info.dateOfIssue || ""}</div>
              </Col>
            </Row>
            <Table className="mb-0 hello">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {props.items.map((item, i) => {
                  return (
                    <tr id={i} key={i}>
                      <td style={{ width: "70px" }}>{item.quantity}</td>
                      <td>
                        {item.name} - {item.description}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {props.currency} {item.price}
                      </td>
                      <td className="text-end" style={{ width: "100px" }}>
                        {props.currency} {item.price * item.quantity}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Table>
              <tbody className="bg-dark border-none hello">
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr className="bg-dark border-none  text-end ">
                  <td></td>
                  <td
                    className="bg-dark border-none fw-bold"
                    style={{ width: "100px" }}
                  >
                    SUBTOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.info.currency} {props.info.subTotal}
                  </td>
                </tr>
                {props.info.taxAmount !== "0.00" && (
                  <tr className="text-end">
                    <td></td>
                    <td
                      className="bg-dark border-none fw-bold"
                      style={{ width: "100px" }}
                    >
                      TAX
                    </td>
                    <td className="text-end" style={{ width: "100px" }}>
                      {props.info.currency} {props.info.taxAmount}
                    </td>
                  </tr>
                )}
                {props.info.discountAmount !== "0.00" && (
                  <tr className="text-end">
                    <td></td>
                    <td
                      className="bg-dark border-none fw-bold"
                      style={{ width: "100px" }}
                    >
                      DISCOUNT
                    </td>
                    <td
                      className="text-white text-end"
                      style={{ width: "100px" }}
                    >
                      {props.info.currency} {props.info.discountAmount}
                    </td>
                  </tr>
                )}
                <tr className="text-end">
                  <td></td>
                  <td
                    className="bg-dark border-none fw-bold"
                    style={{ width: "100px" }}
                  >
                    TOTAL
                  </td>
                  <td className="text-end" style={{ width: "100px" }}>
                    {props.info.currency} {props.info.total}
                  </td>
                </tr>
              </tbody>
            </Table>
            {props.info.notes && (
              <div className="border bg-dark py-3 px-4 rounded">
                {props.info.notes}
              </div>
            )}
          </div>
        </div>
        <div className="pb-4 px-4 hello border pt-4">
          <Row>
            <Col md={6}>
              <Button
                variant="primary"
                className="d-block w-100"
                onClick={() => SaveInvoice(props)}
              >
                <BiPaperPlane
                  style={{ width: "15px", height: "15px", marginTop: "-3px" }}
                  className="me-2"
                />
                Save Invoice
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="outline-secondary text-white"
                className="d-block w-100 mt-3 mt-md-0"
                onClick={GenerateInvoice}
              >
                <BiCloudDownload
                  style={{ width: "16px", height: "16px", marginTop: "-3px" }}
                  className="me-2"
                />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
}

export default InvoiceModal;
