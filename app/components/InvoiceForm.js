"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";

function InvoiceForm(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate, setCurrentDate] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(1);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");

  const [items, setItems] = useState([
    {
      id: 0,
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  useEffect(() => {
    handleCalculateTotal();
  }, [items]);

  const handleRowDel = (item) => {
    const updatedItems = items.filter((i) => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    const newItem = {
      id,
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  const handleCalculateTotal = () => {
    let subTotal = 0;
    items.forEach((item) => {
      subTotal += parseFloat(
        (parseFloat(item.price) * item.quantity).toFixed(2)
      );
    });

    const calculatedSubTotal = parseFloat(subTotal).toFixed(2);
    setSubTotal(calculatedSubTotal);

    const calculatedTaxAmount = parseFloat(
      calculatedSubTotal * (taxRate / 100)
    ).toFixed(2);
    setTaxAmount(calculatedTaxAmount);

    const calculatedDiscountAmount = parseFloat(
      calculatedSubTotal * (discountRate / 100)
    ).toFixed(2);
    setDiscountAmount(calculatedDiscountAmount);

    const calculatedTotal = parseFloat(
      calculatedSubTotal -
        calculatedDiscountAmount +
        parseFloat(calculatedTaxAmount)
    ).toFixed(2);
    setTotal(calculatedTotal);
  };

  const onItemizedItemEdit = (event) => {
    const { id, name, value } = event.target;
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setItems(updatedItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "dateOfIssue":
        setDateOfIssue(value);
        break;
      case "invoiceNumber":
        setInvoiceNumber(value);
        break;
      case "billTo":
        setBillTo(value);
        break;
      case "billToEmail":
        setBillToEmail(value);
        break;
      case "billToAddress":
        setBillToAddress(value);
        break;
      case "billFrom":
        setBillFrom(value);
        break;
      case "billFromEmail":
        setBillFromEmail(value);
        break;
      case "billFromAddress":
        setBillFromAddress(value);
        break;
      case "notes":
        setNotes(value);
        break;
      default:
        break;
    }
    handleCalculateTotal();
  };

  const onCurrencyChange = (selectedOption) => {
    setCurrency(selectedOption.currency);
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
  }, []);

  return (
    <Form onSubmit={openModal}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="bg-black text-white p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current Date:&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={(event) => editField(event)}
                    style={{
                      maxWidth: "150px",
                    }}
                    required
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  color="white"
                  onChange={(event) => editField(event)}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="name"
                  required
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={(event) => editField(event)}
                  autoComplete="email"
                  required
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={(event) => editField(event)}
                  required
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={notes}
              onChange={(event) => editField(event)}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                currency,
                currentDate,
                dateOfIssue,
                invoiceNumber,
                billTo,
                billToEmail,
                billToAddress,
                billFrom,
                billFromEmail,
                billFromAddress,
                notes,
                total,
                subTotal,
                taxRate,
                taxAmount,
                discountRate,
                discountAmount,
              }}
              items={items}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={(event) =>
                  onCurrencyChange({ currency: event.target.value })
                }
                className="btn btn-light my-1"
                aria-label="Change Currency"
                value={currency}
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold text-white">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(event) => editField(event)}
                  className="bg-212529 border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-black border fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold text-white">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={(event) => editField(event)}
                  className="bg-212529 border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-black border fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
}

export default InvoiceForm;
