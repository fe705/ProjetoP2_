"use client";

import Pagina from "@/components/Pagina";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function BibliotecaPage() {
  const livros = JSON.parse(localStorage.getItem("livros")) || [];
  const autores = JSON.parse(localStorage.getItem("autores")) || [];
  const kits = JSON.parse(localStorage.getItem("kits")) || [];
  const editoras = JSON.parse(localStorage.getItem("editoras")) || [];
  const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];

  const lista = [
    {
      nome: "Livros",
      imagem:
        "https://blog.unis.edu.br/hubfs/Imported_Blog_Media/15-livros-incriveis-para-todo-estudante-ler.jpeg",
      quantidade: livros.length,
      link: "/livros",
    },
    {
      nome: "Autores",
      imagem:
        "https://foconoenem.com/wp-content/uploads/2015/08/autores-mais-cobrados-no-enem.jpg",
      quantidade: autores.length,
      link: "/autores",
    },
    {
      nome: "kits",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWskFTVebAS97VJb-gPspEeJKohV4j7nUfiw&s.png",
      quantidade: kits.length,
      link: "/kits",
    },
    {
      nome: "Editoras",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuGWVmcOhk96X5L14JcK8OznjjVleFe0cysg&s.png",
      quantidade: editoras.length,
      link: "/editoras",
    },
    {
      nome: "Emprestimos",
      imagem:
        "https://unisalesiano.com.br/lins/wp-content/uploads/2020/09/Emprestimo-de-Livros2.png",
      quantidade: emprestimos.length,
      link: "/emprestimos",
    },
  ];

  return (
    <Pagina titulo={"Biblioteca"}>
      <Row md={3}>
        {lista.map((item, index) => (
          <Col key={index} className="py-2">
            <Card style={{ height: "100%" }}>
              <Card.Img
                variant="top"
                src={item.imagem}
                style={{ objectFit: "cover", height: "200px" }} // Ajuste de imagem
              />
              <Card.Body className="text-center">
                <Card.Title>
                  <b>{item.nome}</b>
                </Card.Title>
                <p>Cadastrados: {item.quantidade}</p>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button className="bg-success" href={item.link}>
                  Ver Lista
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Pagina>
  );
}
