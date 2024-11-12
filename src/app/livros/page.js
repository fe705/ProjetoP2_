"use client";

import Pagina from "@/components/Pagina";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function LivrosPage() {
  const [livros, setLivros] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const livrosLocalStorage = JSON.parse(localStorage.getItem("livros")) || [];
    setLivros(livrosLocalStorage);
  }, []);

  function excluir(livro) {
    if (window.confirm(`Deseja realmente excluir o livro ${livro.titulo}?`)) {
      const novaLista = livros.filter((item) => item.id !== livro.id);
      localStorage.setItem("livros", JSON.stringify(novaLista));
      setLivros(novaLista);
      alert("Livro excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo="Lista de Livros">
      <div className="text-end mb-2">
        <Button
          className="bg-success"
          onClick={() => router.push("/livros/form")}
        >
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os Livros */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Ano de Publicação</th>
            <th>Preço</th>
            <th>Editora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autores}</td>
              <td>{new Date(livro.anoPublicacao).getFullYear()}</td>
              <td>R$ {livro.preco}</td>
              <td>{livro.editoras}</td>
              <td className="text-center">
                <Button
                  className="me-2"
                  onClick={() => router.push(`/livros/form?id=${livro.id}`)}
                >
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(livro)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  );
}
