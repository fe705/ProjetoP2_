"use client";

import Pagina from "@/components/Pagina";
import apiLocalidades from "@/services/apiLocalidades";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import InputMask from "react-input-mask";

export default function AutorFormPage(props) {
  const router = useRouter();

  const [paises, setPaises] = useState([]);
  const [estados, setEstados] = useState([]);
  const [literarios, setLiterarios] = useState([]);

  const autores = JSON.parse(localStorage.getItem("autores")) || [];
  const id = props.searchParams.id;
  const autorEditado = autores.find((item) => item.id === id);

  useEffect(() => {
    apiLocalidades.get("/paises").then((response) => {
      setPaises(response.data);
    });

    apiLocalidades.get("/estados?orderBy=nome").then((response) => {
      setEstados(response.data);
    });
  }, []);

  const initialValues = {
    nome: "",
    pais: "Brasil",
    estado: "",
    biografia: "",
    dataNascimento: "",
    email: "",
    genero: "",
    literario: "",
    telefone: "",
  };

  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    pais: Yup.string().required("Campo obrigatório"),
    estado: Yup.string().required("Campo obrigatório"),
    literario: Yup.string().required("Campo obrigatório"),
    biografia: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório").nullable(),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    genero: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo Obrigatório"),
  });

  const salvar = (dados) => {
    if (autorEditado) {
      Object.assign(autorEditado, dados);
      localStorage.setItem("autores", JSON.stringify(autores));
    } else {
      dados.id = uuidv4();
      autores.push(dados);
      localStorage.setItem("autores", JSON.stringify(autores));
    }

    alert("Autor salvo com sucesso!");
    router.push("/autores");
  };

  return (
    <Pagina titulo={"Cadastro de Autor"}>
      <Formik
        initialValues={autorEditado || initialValues}
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
        }) => {
          useEffect(() => {
            if (values.estado !== "") {
              apiLocalidades
                .get(`/estados/${values.estado}/municipios`)
                .then((response) => {
                  setLiterarios(response.data);
                });
            }
          }, [values.estado]);

          return (
            <Form onSubmit={handleSubmit}>
              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Nome:</Form.Label>
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
                  <Form.Label>Biografia:</Form.Label>
                  <Form.Control
                    name="biografia"
                    as="textarea"
                    rows={4}
                    value={values.biografia}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.biografia && !errors.biografia}
                    isInvalid={touched.biografia && errors.biografia}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.biografia}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>Data de Nascimento:</Form.Label>
                  <Form.Control
                    name="dataNascimento"
                    type="date"
                    value={values.dataNascimento}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataNascimento && !errors.dataNascimento}
                    isInvalid={touched.dataNascimento && errors.dataNascimento}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataNascimento}
                  </Form.Control.Feedback>
                </Form.Group>

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

                <Form.Group as={Col}>
                  <Form.Label>Gênero:</Form.Label>
                  <Form.Select
                    name="genero"
                    value={values.genero}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.genero && !errors.genero}
                    isInvalid={touched.genero && errors.genero}
                  >
                    <option value="">Selecione</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                    <option value="Outro">Outro</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.genero}
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
                </Form.Group>
              </Row>

              <Row className="mb-2">
                <Form.Group as={Col}>
                  <Form.Label>País:</Form.Label>
                  <Form.Select
                    name="pais"
                    value={values.pais}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.pais && !errors.pais}
                    isInvalid={touched.pais && errors.pais}
                  >
                    <option value="">Selecione</option>
                    {paises.map((pais) => (
                      <option key={pais.id} value={pais.nome}>
                        {pais.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.pais}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Estado:</Form.Label>
                  <Form.Select
                    name="estado"
                    value={values.estado}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={values.pais !== "Brasil"}
                    isValid={touched.estado && !errors.estado}
                    isInvalid={touched.estado && errors.estado}
                  >
                    <option value="">Selecione</option>
                    {estados.map((estado) => (
                      <option key={estado.sigla} value={estado.sigla}>
                        {estado.nome}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.estado}
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

              <Form.Group className="text-end">
                <Button className="me-2" href="/autores">
                  <FaArrowLeft /> Voltar
                </Button>
                <Button type="submit" variant="success">
                  <FaCheck /> Enviar
                </Button>
              </Form.Group>
            </Form>
          );
        }}
      </Formik>
    </Pagina>
  );
}
