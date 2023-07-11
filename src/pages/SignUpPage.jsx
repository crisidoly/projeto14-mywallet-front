import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
const url = import.meta.env.VITE_API_URL;

export default function SignUpPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();
  
    if (form.password !== form.confirmPassword) {
      return alert("As senhas não coincidem!");
    }
  
    axios.post(`${import.meta.env.VITE_API_URL}}/sign-up`, forms)
  .then((res) => console.log(res.data))
  .catch((err) => console.log(err.response.data));
    navigate("/")
  }  

  return (
    <SingUpContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          data-test="name"
          required
          placeholder="Nome"
          value={form.name}
          onChange={handleForm}
          name="name"
          type="text"
        />
        <input
          data-test="email"
          required
          placeholder="E-mail"
          value={form.email}
          onChange={handleForm}
          name="email"
          type="email"
        />
        <input
          required
          data-test="password"
          placeholder="Senha"
          value={form.password}
          onChange={handleForm}
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={3}
        />
        <input
          required
          data-test="conf-password"
          placeholder="Confirme a senha"
          value={form.confirmPassword}
          onChange={handleForm}
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
        />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
