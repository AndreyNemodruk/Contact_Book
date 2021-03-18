import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage.jsx";
import api from "../../api";
import { useHistory } from "react-router-dom";
import authContext from "../context/authContext";
import { useHandleError } from "../hooks/useHandleError.js";

const Form = styled.form`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Label = styled.label`
  color: #503e3e;
  margin-top: 10px;
  font-size: 14px;
`;

const ButtonSubmit = styled.button`
  background: #e6b333;
  border: none;
  border-radius: 2px;
  color: white;
  margin-top: 10px;
  text-align: center;
  font-size: 0.8em;
  cursor: pointer;
  width: 100%;
  height: 40px;
`;

const InputValue = styled.input`
  background: transparent;
  border: 2px solid #22272d;
  outline: none;
  padding-left: 45px;
  color: white;
  width: 100%;
  padding: 5px;
  margin: 10px 0 5px 0;
  height: 40px;
  border-radius: 3px;
  font-size: 1em;
  &:focus {
    border: 1px solid white;
    box-shadow: none;
  }
`;

const FormReg = () => {
  const initForm = {
    email: "",
    password: "",
  };
  const { error, setErrorFromApi } = useHandleError();
  const [form, setForm] = useState(initForm);
  const history = useHistory();
  const { login } = useContext(authContext);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    api.users
      .login(form)
      .then((res) => {
        login(res);
        history.push("/contacts");
      })
      .catch((e) => {
        setErrorFromApi(e.response.data);
      });
  };

  return (
    <Form onSubmit={(e) => handleLogin(e)}>
      <ErrorMessage error={error?.message} />
      <Label htmlFor="email">Email:</Label>
      <InputValue
        value={form.email}
        onChange={handleForm}
        type="text"
        name="email"
        id="email"
        placeholder="Введите Email"
      />
      <ErrorMessage error={error?.email} />
      <Label htmlFor="password">Password:</Label>
      <InputValue
        value={form.password}
        onChange={handleForm}
        type="password"
        name="password"
        id="password"
        placeholder="Введите пароль"
      />
      <ErrorMessage error={error?.password} />
      <ButtonSubmit>Войти</ButtonSubmit>
    </Form>
  );
};

export default FormReg;
