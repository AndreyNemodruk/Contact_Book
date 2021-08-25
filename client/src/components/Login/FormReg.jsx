/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import api from '../../api';
import UserAvatar from '../../ui/Avatar';
import useHandleError from '../hooks/useHandleError';
import fakeAva from '../../images/avatarka.jpg';

const Form = styled.form`
  width: 100%;
  display: grid;
  grid-template-areas:
    'error error'
    'col1 col2'
    'col1 col2'
    'col1 foto'
    'button button';
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

const Label = styled.label`
  color: #503e3e;
  margin-top: 10px;
  font-size: 0.8em;
`;

const Error = styled.div`
  grid-area: error;
`;

const ButtonSubmit = styled.button`
  grid-area: button;
  background: #e6b333;
  border: none;
  border-radius: 2px;
  color: white;
  margin: 10px auto;
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

const FormReg = ({ setIsLogin }) => {
  const fakeImg = { fakeAva };
  const initForm = {
    email: '',
    password: '',
    confirm: '',
    phone: '',
    firstName: '',
    secondName: '',
    file: fakeImg,
  };

  const [form, setForm] = useState(initForm);
  const { error, setErrorFromApi } = useHandleError();
  const [staticError, setStaticError] = useState();

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (form.password !== form.confirm) {
      setStaticError('Пароли несовпадают');
    } else {
      setStaticError('');
    }
  }, [form.password, form.confirm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.users
      .create(form)
      .then(() => {
        setIsLogin(true);
        setForm({});
      })
      .catch((err) => {
        setErrorFromApi(err.response.data);
      });
  };

  const fileRef = useRef();

  function handleUpload() {
    const file = fileRef.current.files && fileRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    api.image
      .upload(formData)
      .then((res) => {
        setForm({ ...form, file: res.data.url });
        return res.data;
      })
      .catch((e) => {
        setErrorFromApi(e.response.data);
      });
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)}>
      <Error>
        <ErrorMessage error={error?.message || staticError} />
      </Error>
      <div>
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
      </div>
      <div>
        <Label htmlFor="phone">Phone:</Label>
        <InputValue
          value={form.phone}
          onChange={handleForm}
          type="text"
          name="phone"
          id="phone"
          placeholder="Введите телефон +380..."
        />
        <ErrorMessage error={error?.phone} />
      </div>
      <div>
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
      </div>
      <div>
        <Label htmlFor="confirm">Confirm password:</Label>
        <InputValue
          value={form.confirm}
          onChange={handleForm}
          type="password"
          name="confirm"
          id="confirm"
          placeholder="Подтвердите пароль"
        />
        <ErrorMessage error={error?.confirm} />
      </div>
      <div>
        <Label htmlFor="firstName">First name:</Label>
        <InputValue
          value={form.firstName}
          onChange={handleForm}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Введите имя"
        />
        <ErrorMessage error={error?.firstName} />

        <Label htmlFor="secondName">Second name:</Label>
        <InputValue
          value={form.secondName}
          onChange={handleForm}
          type="text"
          name="secondName"
          id="secondName"
          placeholder="Введите фамилию"
        />
        <ErrorMessage error={error?.secondName} />
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Label htmlFor="foto">
          <p style={{ margin: '4px 0 10px 0', textAlign: 'center' }}>
            Your photo, ckick here:
          </p>
          <UserAvatar sizing="120px" src={form.file} />
        </Label>
        <ErrorMessage error={error?.error} />
        <InputValue
          style={{ display: 'none' }}
          onChange={handleUpload}
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="camera"
          name="foto"
          id="foto"
        />
      </div>
      <ButtonSubmit>Зарегистрироваться</ButtonSubmit>
    </Form>
  );
};

export default FormReg;
