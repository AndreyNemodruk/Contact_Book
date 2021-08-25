/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
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
import fakeAva from '../../images/avatarka.jpg';

const Main = styled.div`
  grid-area: main;
  display: grid;
  grid-template-rows: 73px 1fr;
  grid-template-areas:
    'appbar'
    'main';
  position: relative;
  height: 100%;
`;

const Content = styled.div`
  padding: 0 50px 0;
  position: relative;
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
  grid-template-rows: auto 1fr 57px;
  grid-template-columns: 125px 1fr;
  @media ${breakpoint.device.lg} {
    grid-template-rows: 210px 1fr 57px;
    grid-template-columns: 151px 1fr;
  }
  grid-template-areas:
    '1' '2'
    '3' '3'
    '4' '4';
  position: relative;
`;

const WrapAvatar = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1 / 1;
  padding-top: 55px;
`;
const UserInfoWrap = styled.div`
  padding: 58px 0 0 32px;
  width: 100%;
  height: 100%;
  display: block;
  @media ${breakpoint.device.lg} {
    display: grid;
  }
  grid-template-rows: 75px 87px;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    '1' '2'
    '3' '3';
`;

const LabelForm = styled.label`
  color: #000000;
  font-size: 1em;
  text-align: left;
  display: block;
  margin-bottom: 8px;
  line-height: 1;
`;
const LabelFormRight = styled(LabelForm)`
  justify-self: end;
  margin-top: 8px;
`;

const FormInput = styled.input`
  background-color: #ffffff;
  color: #22282d;
  height: 32px;
  width: 100%;
  border: solid 1px;
  font-size: 1rem;
  &::placeholder {
    font-size 0.9rem;
  }
`;

const InputImage = styled.input`
  display: none;
`;

const InputTextAria = styled.textarea`
  background-color: #ffffff;
  color: #22282d;
  height: 54px;
  width: 100%;
  font-family: sans-serif;
  font-size: 1rem;
  &::placeholder {
    font-size 0.9rem;
  }
`;

const InputTextAriaInformation = styled(InputTextAria)`
  margin-bottom: 16px;
  height: 104px;
`;

const InputWrapLeft = styled.div`
  @media ${breakpoint.device.lg} {
    margin-left: 20px;
  }
`;
const InputWrapRight = styled.div`
  @media ${breakpoint.device.lg} {
    margin-right: 20px;
  }
`;
const WrapDescription = styled.div`
  grid-column: 1/3;
`;

const WrapSecondInfo = styled.div`
  grid-column: 1/3;
  display: grid;
  @media ${breakpoint.device.lg} {
    grid-template-columns: 151px 1fr;
  }
  grid-template-columns: 125px 1fr;
  column-gap: 32px;

  @media ${breakpoint.device.lg} {
    margin-top: 48px;
  }
  height: 100px;
`;

const FormInputWrap = styled.div`
  padding-bottom: 10px;
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
  const { id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.allContacts);
  const editedContact = contacts.find((item) => item._id === id);
  const fakeImg = { fakeAva };
  const initState = {
    name: '',
    surName: '',
    phone: '',
    birthday: '',
    faceBook: '',
    instagram: '',
    description: '',
    information: '',
    url: fakeImg,
    email: '',
    category: [],
  };

  const [form, setForm] = useState(id ? editedContact : initState);
  const { error, setErrorFromApi } = useHandleError();
  const history = useHistory();
  const fileRef = useRef();

  useEffect(() => {
    if (id) {
      setForm({ ...editedContact, birthday: editedContact?.dateString });
    }
  }, [editedContact, id]);

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateBirthday = () => {
    api.contacts
      .birthday()
      .then((res) =>
        dispatch({ type: C.SET_BIRTHDAY_DATA, payload: res.data.contacts })
      )
      .catch();
  };

  const updateContact = async (e) => {
    e.preventDefault();
    const req = await api.contacts
      .update(form)
      .then((res) => {
        const updatedContacts = contacts.map((item) => {
          if (item._id === res.data._id) {
            return res.data;
          }
          return item;
        });

        dispatch({ type: C.SET_ALL_CONTACTS, payload: updatedContacts });
        dispatch({ type: C.SELECT_CAT, payload: 'allContacts' });
        history.push('/contacts');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push('/');
        }
        setErrorFromApi(e.response.data);
      });
    updateBirthday();
  };

  const createContact = (e) => {
    e.preventDefault();
    api.contacts
      .create(form)
      .then((res) => {
        dispatch({ type: C.SET_ALL_CONTACTS, payload: res.contacts });
        dispatch({ type: C.SELECT_CAT, payload: 'allContacts' });
        history.push('/contacts');
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push('/');
          return;
        }
        setErrorFromApi(e.response.data);
      });
    updateBirthday();
  };

  const uploadFile = () => {
    const file = fileRef.current.files && fileRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);

    api.image
      .upload(formData)
      .then((res) => {
        setForm({ ...form, url: res.data.url });
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
  return (
    <Main>
      <AppBar header={id ? 'Edit Contact' : 'Add New Contact'} />
      <Content>
        <Form onSubmit={id ? updateContact : createContact}>
          <ButtonClose type="button" onClick={() => history.push('/contacts')}>
            X
          </ButtonClose>
          <WrapAvatar>
            <label htmlFor="url">
              <UserFoto src={form?.url} alt="foto edit contact" />
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
            <InputWrapRight>
              <LabelForm htmlFor="name">Name</LabelForm>
              <div>
                <FormInput
                  type="text"
                  id="name"
                  onChange={handleForm}
                  name="name"
                  placeholder="Enter name"
                  value={form?.name}
                />
                <ErrorMessage error={error?.name} />
              </div>
            </InputWrapRight>
            <InputWrapLeft>
              <LabelForm htmlFor="surName">Surname</LabelForm>
              <div>
                <FormInput
                  type="text"
                  id="surName"
                  placeholder="Enter surname"
                  onChange={handleForm}
                  value={form?.surName}
                  name="surName"
                />
                <ErrorMessage error={error?.surName} />
              </div>
            </InputWrapLeft>
            <WrapDescription>
              <LabelForm htmlFor="description">Description</LabelForm>
              <div>
                <InputTextAria
                  type="text"
                  placeholder="Enter description contact"
                  id="description"
                  name="description"
                  onChange={handleForm}
                  value={form?.description}
                />
                <ErrorMessage error={error?.description} />
              </div>
            </WrapDescription>
          </UserInfoWrap>
          <WrapSecondInfo>
            <LabelFormRight htmlFor="phone">Phone</LabelFormRight>
            <FormInputWrap>
              <FormInput
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter phone +38----------"
                onChange={handleForm}
                value={form?.phone}
              />
              <ErrorMessage error={error?.phone} />
            </FormInputWrap>
            <LabelFormRight htmlFor="email">Email</LabelFormRight>
            <FormInputWrap>
              <FormInput
                type="text"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={handleForm}
                value={form?.email}
              />
              <ErrorMessage error={error?.email} />
            </FormInputWrap>

            <LabelFormRight htmlFor="birthday">Birthday</LabelFormRight>
            <FormInputWrap>
              <FormInput
                type="text"
                id="birthday"
                name="birthday"
                placeholder="Enter date birthday DD/MM/YYYY"
                onChange={handleForm}
                value={form?.birthday}
              />
              <ErrorMessage error={error?.birthday} />
            </FormInputWrap>
            <LabelFormRight htmlFor="information">Information</LabelFormRight>
            <InputTextAriaInformation
              type="text"
              id="information"
              name="information"
              placeholder="Enter information contact"
              onChange={handleForm}
              value={form?.information}
            />
            <LabelFormRight htmlFor="instagram">Instagram</LabelFormRight>
            <FormInputWrap>
              <FormInput
                type="text"
                id="instagram"
                name="instagram"
                placeholder="Enter user name instagramm"
                onChange={handleForm}
                value={form?.instagram}
              />
              <ErrorMessage error={error?.instagram} />
            </FormInputWrap>
            <LabelFormRight htmlFor="faceBook">Facebook</LabelFormRight>
            <FormInputWrap>
              <FormInput
                type="text"
                id="faceBook"
                name="faceBook"
                placeholder="Enter Facebook Link"
                onChange={handleForm}
                value={form?.faceBook}
              />
              <ErrorMessage error={error?.faceBook} />
            </FormInputWrap>
          </WrapSecondInfo>
          <BottomBlock>
            <BottomHr />
            <ButtonAdd type="submit">
              {id ? 'Save Changes' : 'Add new contact'}
            </ButtonAdd>
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
