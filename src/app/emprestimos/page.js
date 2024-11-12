"use client";

import Pagina from "@/components/Pagina";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaPlusCircle, FaTrash } from "react-icons/fa";

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] = useState([]);

  useEffect(() => {
    const emprestimosLocalStorage =
      JSON.parse(localStorage.getItem("emprestimos")) || [];
    setEmprestimos(emprestimosLocalStorage);
    console.log(emprestimosLocalStorage);
  }, []);

  function excluir(emprestimo) {
    if (
      window.confirm(
        `Deseja realmente excluir o empréstimo do livro ${emprestimo.livro}?`
      )
    ) {
      const novaLista = emprestimos.filter((item) => item.id !== emprestimo.id);
      localStorage.setItem("emprestimos", JSON.stringify(novaLista));
      setEmprestimos(novaLista);
      alert("Empréstimo excluído com sucesso!");
    }
  }

  return (
    <Pagina titulo={"Lista de Empréstimos"}>
      <div className="text-end mb-2">
        <Button className="bg-success" href="/emprestimos/form">
          <FaPlusCircle /> Novo Empréstimo
        </Button>
      </div>

      {/* Tabela com os Empréstimos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Livro</th>
            <th>Emprestado Para</th>
            <th>Data de Empréstimo</th>
            <th>Data de Devolução</th>
            <th>Gênero</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {emprestimos.map((emprestimo) => (
            <tr key={emprestimo.id}>
              <td>{emprestimo.livros}</td>
              <td>{emprestimo.solicitante}</td>
              <td>{emprestimo.dataEmprestimo}</td>
              <td>{emprestimo.dataDevolucao}</td>
              <td>{emprestimo.literario}</td>
              <td className="text-center">
                {/* Botões das ações */}
                <Button
                  className="me-2"
                  href={`/emprestimos/form?id=${emprestimo.id}`}
                >
                  <FaPen />
                </Button>
                <Button variant="danger" onClick={() => excluir(emprestimo)}>
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
