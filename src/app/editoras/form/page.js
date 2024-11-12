"use client";

import Pagina from "@/components/Pagina";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function EditoraFormPage(props) {
  const router = useRouter();
  const editoras = JSON.parse(localStorage.getItem("editoras")) || [];
  const id = props.searchParams.id;
  const editoraEditada = editoras.find((item) => item.id === id);

  function salvar(dados) {
    if (editoraEditada) {
      Object.assign(editoraEditada, dados);
      localStorage.setItem("editoras", JSON.stringify(editoras));
    } else {
      dados.id = v4();
      editoras.push(dados);
      localStorage.setItem("editoras", JSON.stringify(editoras));
    }

    alert("Editora salva com sucesso!");
    router.push("/editoras");
  }

  const initialValues = {
    nome: "",
    cep: "",
    anoFundacao: "",
    status: "",
    quantidadeLivros: 1,
    email: "",
    telefone: "",
    website: "",
    descricao: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    cep: Yup.string().required("Campo obrigatório"),
    anoFundacao: Yup.date().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório"),
    quantidadeLivros: Yup.number()
      .min(0, "Deve ser um número positivo")
      .required("Campo obrigatório"),
    email: Yup.string()
      .email("Deve ser um email válido")
      .required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    website: Yup.string()
      .url("Deve ser uma URL válida")
      .required("Campo obrigatório"),
    descricao: Yup.string().required("Campo obrigatório"),
  });

  return (
    <Pagina titulo={"Cadastro de Editora"}>
      <Formik
        initialValues={editoraEditada || initialValues}
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
                <Form.Label>Nome da Editora:</Form.Label>
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
                <Form.Label>CEP:</Form.Label>
                <InputMask
                  mask="99999-999"
                  value={values.cep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="cep"
                      isValid={touched.cep && !errors.cep}
                      isInvalid={touched.cep && errors.cep}
                      placeholder="Digite o CEP"
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.cep}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Ano de Fundação:</Form.Label>
                <Form.Control
                  name="anoFundacao"
                  type="date"
                  value={values.anoFundacao}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.anoFundacao && !errors.anoFundacao}
                  isInvalid={touched.anoFundacao && errors.anoFundacao}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.anoFundacao}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Telefone:</Form.Label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {(inputProps) => (
                    <Form.Control
                      {...inputProps}
                      name="telefone"
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                  )}
                </InputMask>
                <Form.Control.Feedback type="invalid">
                  {errors.telefone}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Preferência de Contato:</Form.Label>
                <Form.Select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.status && !errors.status}
                  isInvalid={touched.status && errors.status}
                >
                  <option value="">Selecione</option>
                  <option value="Telefone">Telefone</option>
                  <option value="E-mail">E-mail</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.status}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Quantidade de Livros:</Form.Label>
                <Form.Control
                  name="quantidadeLivros"
                  type="number"
                  value={values.quantidadeLivros}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.quantidadeLivros && !errors.quantidadeLivros}
                  isInvalid={
                    touched.quantidadeLivros && errors.quantidadeLivros
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.quantidadeLivros}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Website:</Form.Label>
                <Form.Control
                  name="website"
                  type="url"
                  placeholder="url do site.com"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.website && !errors.website}
                  isInvalid={touched.website && errors.website}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.website}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-2">
              <Form.Group as={Col}>
                <Form.Label>Descrição:</Form.Label>
                <Form.Control
                  name="descricao"
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
              <Button className="me-2" href="/editoras">
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
