"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);

  useEffect(() => {
    const autoresLocalStorage =
      JSON.parse(localStorage.getItem("autores")) || [];
    setAutores(autoresLocalStorage);
    console.log(autoresLocalStorage);
  }, []);

  function excluir(autor) {
    if (window.confirm(`Deseja realmente excluir o autor ${autor.nome}?`)) {
      const novaLista = autores.filter((item) => item.id !== autor.id);
      localStorage.setItem("autores", JSON.stringify(novaLista));
      setAutores(novaLista);
      alert("Autor excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Autores"}>
      <div className="text-end mb-2">
        <Button className="bg-success" href="/autores/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com os autores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Biografia</th>
            <th>País</th>
            <th>Estado</th>
            <th>Gênero Literário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {autores.map((autor) => {
            return (
              <tr key={autor.id}>
                <td>{autor.nome}</td>
                <td>{autor.biografia}</td>
                <td>{autor.pais}</td>
                <td>{autor.estado}</td>
                <td>{autor.literario}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button
                    className="me-2"
                    href={`/autores/form?id=${autor.id}`}
                  >
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(autor)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Pagina>
  );
}
