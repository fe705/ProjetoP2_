"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function KitFormPage(props) {
  const [editoraFiltrada, setEditoraFiltrada] = useState([]);
  const [autorFiltrado, setAutorFiltrado] = useState([]);
  const [livroFiltrado, setLivroFiltrado] = useState([]);

  const editoras = JSON.parse(localStorage.getItem("editoras")) || [];
  const autores = JSON.parse(localStorage.getItem("autores")) || [];
  const livros = JSON.parse(localStorage.getItem("livros")) || [];

  const router = useRouter();
  const kits = JSON.parse(localStorage.getItem("kits")) || [];
  const id = props.searchParams.id;
  const kitEditado = kits.find((item) => item.id === id);

  useEffect(() => {
    if (autores.length > 0) setAutorFiltrado(autores);
  }, [autores]);
  useEffect(() => {
    if (editoras.length > 0) setEditoraFiltrada(editoras);
  }, [editoras]);
  useEffect(() => {
    if (livros.length > 0) setLivroFiltrado(livros);
  }, [livros]);

  function salvar(dados) {
    if (kitEditado) {
      Object.assign(kitEditado, dados);
      localStorage.setItem("kits", JSON.stringify(kits));
    } else {
      dados.id = v4();
      kits.push(dados);
      localStorage.setItem("kits", JSON.stringify(kits));
    }

    alert("Kit salvo com sucesso!");
    router.push("/kits");
  }

  const initialValues = {
    nome: "",
    descricao: "",
    estoque: "1",
    autores: "",
    editoras: "",
    livros: "",
    literario: "",
    valor: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
    estoque: Yup.number().required("Campo obrigatório"),
    autores: Yup.string().required("Campo obrigatório"),
    editoras: Yup.string().required("Campo obrigatório"),
    literario: Yup.string().required("Campo Obrigatório"),
    livros: Yup.string().required("Campo Obrigatório"),
    valor: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Kits"}>
      <Formik
        initialValues={kitEditado || initialValues}
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
                <Form.Label>Nome do kit:</Form.Label>
                <Form.Control
                  name="nome"
                  type="text"
                  value={values.nome}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.nome && !errors.nome}
                  isInvalid={touched.nome && errors.nome}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.nome}
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
                <Form.Label>Estoque:</Form.Label>
                <Form.Control
                  name="estoque"
                  type="number"
                  value={values.estoque}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.estoque && !errors.estoque}
                  isInvalid={touched.estoque && errors.estoque}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.estoque}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Taxa:</Form.Label>
                <InputMask
                  mask="R$ 999,99"
                  maskPlaceholder={null}
                  value={values.valor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="valor"
                      isValid={touched.valor && !errors.valor}
                      isInvalid={touched.valor && errors.valor}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.valor}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name="descricao"
                  type="text"
                  as="textarea"
                  rows={5}
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

            <Form.Group className="text-end">
              <Button className="me-2" href="/kits">
                <FaArrowLeft /> Voltar
              </Button>
              <Button type="submit" variant="success">
                <FaCheck /> Enviar
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </Pagina>
  );
}
