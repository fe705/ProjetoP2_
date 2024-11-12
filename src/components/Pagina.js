"use client";

import { Container, Nav, Navbar } from "react-bootstrap";

export default function Pagina({ titulo, children }) {
  return (
    <>
      {/* Barra de Navegação */}
      <Navbar bg="success" data-bs-theme="success">
        <Container>
          <Navbar.Brand href="/">Biblioteca</Navbar.Brand>
          <Nav className="me-end">
            <Nav.Link href="/livros">Livros</Nav.Link>
            <Nav.Link href="/autores">Autores</Nav.Link>
            <Nav.Link href="/kits">Kits</Nav.Link>
            <Nav.Link href="/editoras">Editoras</Nav.Link>
            <Nav.Link href="/emprestimos">Empréstimos</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Barra de Titulo */}
      <div
        style={{
          backgroundColor: "rgba(25,135,84,0.50)",
          padding: "4px",
          textAlign: "center",
        }}
      >
        <h1>
          <b>{titulo}</b>
        </h1>
      </div>

      {/* Conteúdo da Página */}
      <Container className="mt-2">{children}</Container>
    </>
  );
}
