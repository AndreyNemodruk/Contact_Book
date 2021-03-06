/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AppBar from '../AppBar/AppBar';
import UserAvatar from '../../ui/Avatar';
import api from '../../api';
import C from '../constants/constatnts';
import { ButtonClose } from '../ui/ui';
import useHandleError from '../hooks/useHandleError';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { BottomHr, ButtonAdd } from '../ui/uiAllContact';
import breakpoint from '../constants/breakpoints';

const Main = styled.div`
  grid-area: main;
  display: grid;
  grid-template-rows: 73px 1fr;
  grid-template-areas:
    'appbar'
    'main';
  position: relative;
`;

const Content = styled.div`
  padding: 0 25px 0;
  @media ${breakpoint.device.lg} {
    padding: 0 50px 0;
  }
  position: relative;
  margin-top: 30px;
`;

const BottomBlock = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / 3;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 183px 183px;
  grid-column-gap: 32px;
`;

const ButtonCancel = styled(ButtonAdd)`
  color: #00b3e4;
  background-color: white;
  border: solid 1px #00b3e4;
  grid-column: 3 / 3;
`;

const Form = styled.form`
  height: 100%;
  display: grid;
  @media ${breakpoint.device.lg} {
    grid-template-columns: 151px 1fr;
  }
  grid-template-rows: 1fr 57px;
  grid-template-columns: 125px 1fr;
  position: relative;
`;

const WrapAvatar = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1 / 1;
  padding-top: 55px;
`;
const UserInfoWrap = styled.div`
  padding: 100px 0 0 32px;
  width: 100%;
  height: 100%;
`;

const LabelForm = styled.label`
  color: #000000;
  font-size: 1em;
  text-align: left;
  display: block;
  margin-bottom: 8px;
  line-height: 1;
`;

const FormInput = styled.input`
  background-color: #ffffff;
  color: #22282d;
  height: 32px;
  width: 100%;
  border: solid 1px;
  font-size: 1rem;
  padding-left: 10px;
  &::placeholder {
    font-size 0.9rem;
  }
`;

const InputImage = styled.input`
  display: none;
`;

const InputWrap = styled.div`
  padding-bottom: 15px;
`;

const UserFoto = styled(UserAvatar)`
  @media ${breakpoint.device.lg} {
    width: 151px;
    height: 151px;
  }
  width: 120px;
  height: 120px;
`;

const EditContact = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const initForm = {
    email: '',
    phone: '',
    firstName: '',
    secondName: '',
    file: '',
  };
  const [form, setForm] = useState(initForm);
  const { error, setErrorFromApi } = useHandleError();
  const history = useHistory();
  const fileRef = useRef();

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadFile = () => {
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
        if (e.response.status === 401) {
          history.push('/');
          return;
        }
        setErrorFromApi(e.response.data);
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    api.users
      .update(form)
      .then(() => {
        dispatch({ type: C.UPDATE_USER, payload: form });
        const us = JSON.parse(localStorage.getItem('phone_book'));
        const updatedUser = { ...us, ...form };
        localStorage.setItem('phone_book', JSON.stringify(updatedUser));
        history.push('/contacts');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push('/');
          return;
        }
        setErrorFromApi(e.response.data);
      });
  };
  return (
    <Main>
      <AppBar header="Edit User" />
      <Content>
        <Form onSubmit={(e) => submitForm(e)}>
          <ButtonClose type="button" onClick={() => history.push('/contacts')}>
            X
          </ButtonClose>
          <WrapAvatar>
            <label htmlFor="url">
              <UserFoto src={form?.file} />
            </label>
            <InputImage
              type="file"
              id="url"
              name="url"
              ref={fileRef}
              onChange={uploadFile}
            />
          </WrapAvatar>
          <UserInfoWrap>
            <LabelForm htmlFor="firstName">Name</LabelForm>
            <InputWrap>
              <FormInput
                type="text"
                id="firstName"
                onChange={handleForm}
                name="firstName"
                placeholder="Enter name"
                value={form?.firstName}
              />
              <ErrorMessage error={error?.firstName} />
            </InputWrap>

            <LabelForm htmlFor="secondName">Surname</LabelForm>
            <InputWrap>
              <FormInput
                type="text"
                id="secondName"
                placeholder="Enter surname"
                onChange={handleForm}
                value={form?.secondName}
                name="secondName"
              />
              <ErrorMessage error={error?.secondName} />
            </InputWrap>
            <LabelForm htmlFor="phone">Phone</LabelForm>
            <InputWrap>
              <FormInput
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter phone +38----------"
                onChange={handleForm}
                value={form?.phone}
              />
              <ErrorMessage error={error?.phone} />
            </InputWrap>
            <LabelForm htmlFor="email">Email</LabelForm>
            <InputWrap>
              <FormInput
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={handleForm}
                value={form?.email}
              />
              <ErrorMessage error={error?.email} />
            </InputWrap>
          </UserInfoWrap>
          <BottomBlock>
            <BottomHr />
            <ButtonAdd type="submit">Save Changes</ButtonAdd>
            <ButtonCancel
              type="button"
              onClick={() => history.push('/contacts')}
            >
              Cancel
            </ButtonCancel>
          </BottomBlock>
        </Form>
      </Content>
    </Main>
  );
};

export default EditContact;
