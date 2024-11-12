"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaPen, FaPlusCircle, FaTrash, FaTrashAlt } from "react-icons/fa";

export default function EditorasPage() {
  const [editoras, setEditoras] = useState([]);

  useEffect(() => {
    const editorasLocalStorage =
      JSON.parse(localStorage.getItem("editoras")) || [];
    setEditoras(editorasLocalStorage);
    console.log(editorasLocalStorage);
  }, []);

  function excluir(editora) {
    if (window.confirm(`Deseja realmente excluir a editora ${editora.nome}?`)) {
      const novaLista = editoras.filter((item) => item.id !== editora.id);
      localStorage.setItem("editoras", JSON.stringify(novaLista));
      setEditoras(novaLista);
      alert("Editora excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Editoras"}>
      <div className="text-end mb-2">
        <Button className="bg-success" href="/editoras/form">
          <FaPlusCircle /> Nova Editora
        </Button>
      </div>

      {/* Tabela com as Editoras */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CEP</th>
            <th>Ano de Fundação</th>
            <th>Preferência de Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editoras.map((editora) => {
            return (
              <tr key={editora.id}>
                <td>{editora.nome}</td>
                <td>{editora.cep}</td>
                <td>{editora.anoFundacao}</td>
                <td>{editora.status}</td>
                <td className="text-center">
                  <Button
                    className="me-2"
                    href={`/editoras/form?id=${editora.id}`}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(editora)}>
                    <FaTrashAlt />
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
