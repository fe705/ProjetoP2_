"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function EmprestimoFormPage(props) {
  const [editoraFiltrada, setEditoraFiltrada] = useState([]);
  const [autorFiltrado, setAutorFiltrado] = useState([]);
  const [livroFiltrado, setLivroFiltrado] = useState([]);

  const editoras = JSON.parse(localStorage.getItem("editoras")) || [];
  const autores = JSON.parse(localStorage.getItem("autores")) || [];
  const livros = JSON.parse(localStorage.getItem("livros")) || [];

  const router = useRouter();
  const emprestimos = JSON.parse(localStorage.getItem("emprestimos")) || [];
  const id = props.searchParams.id;
  const emprestimoEditado = emprestimos.find((item) => item.id === id);

  useEffect(() => {
    if (autores.length > 0) setAutorFiltrado(autores);
  }, [autores]);
  useEffect(() => {
    if (editoras.length > 0) setEditoraFiltrada(editoras);
  }, [editoras]);
  useEffect(() => {
    if (livros.length > 0) setLivroFiltrado(livros);
  }, [livros]);

  // Função para salvar os dados
  function salvar(dados) {
    if (emprestimoEditado) {
      Object.assign(emprestimoEditado, dados);
      localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
    } else {
      dados.id = v4();
      emprestimos.push(dados);
      localStorage.setItem("emprestimos", JSON.stringify(emprestimos));
    }

    alert("Empréstimo salvo com sucesso!");
    router.push("/emprestimos");
  }

  // Valores iniciais
  const initialValues = {
    livros: "",
    autores: "",
    editoras: "",
    solicitante: "",
    dataEmprestimo: "",
    dataDevolucao: "",
    literario: "",
    taxa: "",
  };

  // Validação
  const validationSchema = Yup.object().shape({
    solicitante: Yup.string().required("Campo Obrigatório"),
    livros: Yup.string().required("Campo obrigatório"),
    autores: Yup.string().required("Campo obrigatório"),
    editoras: Yup.string().required("Campo obrigatório"),
    literario: Yup.string().required("Campo Obrigatório"),
    dataEmprestimo: Yup.date().required("Campo obrigatório"),
    dataDevolucao: Yup.date()
      .min(
        Yup.ref("dataEmprestimo"),
        "A data de devolução não pode ser antes da data de empréstimo"
      )
      .required("Campo obrigatório"),
    taxa: Yup.string().required("Campo obrigatório"),
  });

  // Cálculos para o dashboard
  const totalEmprestimos = emprestimos.length;
  const emprestimosEmAndamento = emprestimos.filter(
    (e) => e.status === "Em Andamento"
  ).length;
  const emprestimosDevolvidos = emprestimos.filter(
    (e) => e.status === "Devolvido"
  ).length;

  return (
    <Pagina titulo={"Cadastro de Empréstimo de Livro"}>
      <Row>
        {/* Dashboard */}
        <Col xs={12} md={4} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Dashboard de Empréstimos</Card.Title>
              <Card.Text>
                <strong>Total de Empréstimos:</strong> {totalEmprestimos}
              </Card.Text>
              <Card.Text>
                <strong>Empréstimos em Andamento:</strong>{" "}
                {emprestimosEmAndamento}
              </Card.Text>
              <Card.Text>
                <strong>Empréstimos Devolvidos:</strong> {emprestimosDevolvidos}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Formulário de Cadastro de Empréstimo */}
        <Col xs={12} md={8}>
          <Formik
            initialValues={emprestimoEditado || initialValues}
            validationSchema={validationSchema}
            onSubmit={salvar}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Solicitante:</Form.Label>
                    <Form.Control
                      name="solicitante"
                      type="text"
                      value={values.solicitante}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.solicitante && !errors.solicitante}
                      isInvalid={touched.solicitante && errors.solicitante}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.solicitante}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Livro:</Form.Label>
                    <Form.Select
                      name="livros"
                      value={values.livros}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.livros && !errors.livros}
                      isInvalid={touched.livros && errors.livros}
                    >
                      <option value="">Selecione</option>
                      {livroFiltrado.map((livro) => (
                        <option key={livro.titulo} value={livro.titulo}>
                          {livro.titulo}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.livros}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Autor:</Form.Label>
                    <Form.Select
                      name="autores"
                      value={values.autores}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.autores && !errors.autores}
                      isInvalid={touched.autores && errors.autores}
                    >
                      <option value="">Selecione</option>
                      {autorFiltrado.map((autor) => (
                        <option key={autor.nome} value={autor.nome}>
                          {autor.nome}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.autores}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Editora:</Form.Label>
                    <Form.Select
                      name="editoras"
                      value={values.editoras}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.editoras && !errors.editoras}
                      isInvalid={touched.editoras && errors.editoras}
                    >
                      <option value="">Selecione</option>
                      {editoraFiltrada.map((editor) => (
                        <option key={editor.nome} value={editor.nome}>
                          {editor.nome}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.editoras}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Gênero Literário:</Form.Label>
                    <Form.Select
                      name="literario"
                      value={values.literario}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.literario && !errors.literario}
                      isInvalid={touched.literario && errors.literario}
                    >
                      <option value="">Selecione</option>
                      <option value="Terror">Terror</option>
                      <option value="Suspense">Suspense</option>
                      <option value="Romance">Romance</option>
                      <option value="Fantasia">Fantasia</option>
                      <option value="Mistério">Mistério</option>
                      <option value="Aventura">Aventura</option>
                      <option value="Drama">Drama</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.literario}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Data de Empréstimo:</Form.Label>
                    <Form.Control
                      name="dataEmprestimo"
                      type="date"
                      value={values.dataEmprestimo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataEmprestimo && !errors.dataEmprestimo}
                      isInvalid={
                        touched.dataEmprestimo && errors.dataEmprestimo
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataEmprestimo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Data de Devolução:</Form.Label>
                    <Form.Control
                      name="dataDevolucao"
                      type="date"
                      value={values.dataDevolucao}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.dataDevolucao && !errors.dataDevolucao}
                      isInvalid={touched.dataDevolucao && errors.dataDevolucao}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.dataDevolucao}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col}>
                    <Form.Label>Taxa:</Form.Label>
                    <InputMask
                      mask="R$ 999,99"
                      maskPlaceholder={null}
                      value={values.taxa}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      {(inputProps) => (
                        <Form.Control
                          {...inputProps}
                          name="taxa"
                          isValid={touched.taxa && !errors.taxa}
                          isInvalid={touched.taxa && errors.taxa}
                        />
                      )}
                    </InputMask>
                    <Form.Control.Feedback type="invalid">
                      {errors.taxa}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Form.Group className="text-end">
                  <Button className="me-2" href="/emprestimos">
                    <FaArrowLeft /> Voltar
                  </Button>
                  <Button type="submit" variant="success">
                    <FaCheck /> Enviar
                  </Button>
                </Form.Group>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Pagina>
  );
}
