"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function KitsPage() {
  const [kits, setKits] = useState([]);

  useEffect(() => {
    const kitsLocalStorage = JSON.parse(localStorage.getItem("kits")) || [];
    setKits(kitsLocalStorage);
    console.log(kitsLocalStorage);
  }, []);

  function excluir(kit) {
    if (window.confirm(`Deseja realmente excluir a kit ${kit.nome}?`)) {
      const novaLista = kits.filter((item) => item.id !== kit.id);
      localStorage.setItem("kits", JSON.stringify(novaLista));
      setKits(novaLista);
      alert("Kit excluída com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de kits"}>
      <div className="text-end mb-2">
        <Button className="bg-success" cd href="/kits/form">
          <FaPlusCircle /> Novo
        </Button>
      </div>

      {/* Tabela com as kits */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Estoque</th>
            <th>Valor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {kits.map((kit) => {
            return (
              <tr key={kit.id}>
                <td>{kit.nome}</td>
                <td>{kit.descricao}</td>
                <td>{kit.estoque}</td>
                <td>{kit.valor}</td>
                <td className="text-center">
                  {/* Botões das ações */}
                  <Button className="me-2" href={`/kits/form?id=${kit.id}`}>
                    <FaPen />
                  </Button>
                  <Button variant="danger" onClick={() => excluir(kit)}>
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
