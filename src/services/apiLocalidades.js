import axios from "axios";

const apiLivros = axios.create({
  baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades",
});

export default apiLivros;
