import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function SignInPage() {
  const apiUrl = "http://localhost:5000";
  const {setToken, setUserName} = useContext(AuthContext)
  const [form, setForm] = useState({
    email: "",
    password: ""
   
  });
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitForm(e) {
    e.preventDefault();
    if (!form.email || !form.password) {
     
      return alert("Por favor, preencha todos os campos.");
    }
    axios
      .post(`${apiUrl}/login`, form)
      .then((res) => {
        setToken(res.data.token)
        setUserName(res.data.userName)
        navigate("/home")
      })
      .catch((err) => console.log(err.response.data));
  }

  return (
    <SignInContainer>
      <form onSubmit={submitForm}>
        <MyWalletLogo />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          onChange={handleForm}
        />
        <input
         data-test="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          onChange={handleForm}
        />
        <button data-test="sign-in-submit" type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SignInContainer>
  );
}

const SignInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
