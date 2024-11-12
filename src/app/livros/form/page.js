"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Card } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function LivroFormPage(props) {
  const [editoraFiltrada, setEditoraFiltrada] = useState([]);
  const [autorFiltrado, setAutorFiltrado] = useState([]);
  const router = useRouter();

  const editoras = JSON.parse(localStorage.getItem("editoras")) || [];
  const autores = JSON.parse(localStorage.getItem("autores")) || [];
  const livros = JSON.parse(localStorage.getItem("livros")) || [];
  const id = props.searchParams?.id;
  const livroEditado = livros.find((item) => item.id === id);

  useEffect(() => {
    if (autores.length > 0) setAutorFiltrado(autores);
  }, [autores]);
  useEffect(() => {
    if (editoras.length > 0) setEditoraFiltrada(editoras);
  }, [editoras]);

  function salvar(dados) {
    if (livroEditado) {
      Object.assign(livroEditado, dados);
      localStorage.setItem("livros", JSON.stringify(livros));
    } else {
      dados.id = uuidv4();
      livros.push(dados);
      localStorage.setItem("livros", JSON.stringify(livros));
    }

    alert("Livro salvo com sucesso!");
    router.push("/livros");
  }

  const initialValues = {
    titulo: "",
    autores: "",
    anoPublicacao: "",
    literario: "",
    preco: 0,
    editoras: "",
    quantidadeEstoque: 1,
    descricao: "",
  };

  const validationSchema = Yup.object().shape({
    titulo: Yup.string().required("Campo obrigatório"),
    autores: Yup.string().required("Campo obrigatório"),
    anoPublicacao: Yup.date().required("Campo obrigatório"),
    literario: Yup.string().required("Campo obrigatório"),
    preco: Yup.string()
      .min(0, "Deve ser um valor positivo")
      .required("Campo obrigatório"),
    editoras: Yup.string().required("Campo obrigatório"),
    quantidadeEstoque: Yup.number()
      .min(0, "Deve ser um número positivo")
      .required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
  });

  const calcularEstatisticas = () => {
    const totalLivros = livros.length;
    const totalEstoque = livros.reduce(
      (acc, livro) => acc + livro.quantidadeEstoque,
      0
    );
    const mediaPreco =
      totalLivros > 0
        ? livros.reduce((acc, livro) => acc + livro.preco, 0) / totalLivros
        : 0;

    return {
      totalLivros,
      totalEstoque,
      mediaPreco: mediaPreco.toFixed(2),
    };
  };

  const { totalLivros, totalEstoque, mediaPreco } = calcularEstatisticas();

  return (
    <Pagina titulo={"Cadastro de Livro"}>
      {/* Dashboard */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Dashboard de Estatísticas</Card.Title>
          <Row>
            <Col>
              <Card.Text>
                <strong>Total de Livros:</strong> {totalLivros}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <strong>Total em Estoque:</strong> {totalEstoque}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text>
                <strong>Média de Preço:</strong> R$ {mediaPreco}
              </Card.Text>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Formik
        initialValues={livroEditado || initialValues}
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
                <Form.Label>Título:</Form.Label>
                <Form.Control
                  name="titulo"
                  type="text"
                  value={values.titulo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.titulo && !errors.titulo}
                  isInvalid={touched.titulo && errors.titulo}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.titulo}
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
                <Form.Label>Ano de Publicação:</Form.Label>
                <Form.Control
                  name="anoPublicacao"
                  type="date"
                  value={values.anoPublicacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.anoPublicacao && !errors.anoPublicacao}
                  isInvalid={touched.anoPublicacao && errors.anoPublicacao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.anoPublicacao}
                </Form.Control.Feedback>
              </Form.Group>

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
                <Form.Label>Preço:</Form.Label>
                <InputMask
                  mask="R$ 999,99"
                  maskPlaceholder={null}
                  value={values.preco}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="preco"
                      isValid={touched.preco && !errors.preco}
                      isInvalid={touched.preco && errors.preco}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.preco}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Quantidade em Estoque:</Form.Label>
                <Form.Control
                  name="quantidadeEstoque"
                  type="number"
                  value={values.quantidadeEstoque}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={
                    touched.quantidadeEstoque && !errors.quantidadeEstoque
                  }
                  isInvalid={
                    touched.quantidadeEstoque && errors.quantidadeEstoque
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantidadeEstoque}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name="descricao"
                  as="textarea"
                  rows={3}
                  value={values.descricao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.descricao && !errors.descricao}
                  isInvalid={touched.descricao && errors.descricao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.descricao}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <div className="text-center mt-3">
              <Button className="me-2" onClick={() => router.push("/livros")}>
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Salvar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
