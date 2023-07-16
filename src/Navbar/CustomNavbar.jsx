import React from 'react';
import { Navbar, Container } from "react-bootstrap";
import Image from "./pytorch.png";

const CustomNavbar = () => {
  return (
    <Navbar
      className="bg-body-tertiary"
      sticky="top"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand>
          <img
            alt=""
            src={Image}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Devanagiri Handwritten Recognition
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar