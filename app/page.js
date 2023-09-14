"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Container from "react-bootstrap/Container";
import InvoiceForm from "./components/InvoiceForm";

import { UserButton } from "@clerk/nextjs";

function App() {
  return (
    <div className="bg-dark App d-flex flex-column align-items-center justify-content-center w-100">
      <UserButton afterSignOutUrl="/" />

      <Container>
        <InvoiceForm />
      </Container>
    </div>
  );
}

export default App;
