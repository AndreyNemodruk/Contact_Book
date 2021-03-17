import React, { useState, useRef, useEffect } from "react";
import { AppBar } from "../AppBar/AppBar.jsx";
import styled from "styled-components";
import UserAvatar from "../../ui/Avatar.jsx";
import api from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import C from "../constants/constatnts";
import { ButtonClose } from "../ui/ui";
import { errorHandler } from "../../utills/utils";

const Main = styled.div`
  grid-area: main;
  display: grid;
  grid-template-rows: 73px 1fr;
  grid-template-areas:
    "appbar"
    "main";
  position: relative;
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
const BottomHr = styled.div`
  width: 100%;
  position: relative;
  border-top: 1px solid #9699a5;
  grid-column: 1 / 2;
`;

const ButtonAdd = styled.button`
  background-color: #0fb0df;
  width: 182px;
  height: 46px;
  border-radius: 30px;
  outline: none;
  border: none;
  cursor: pointer;
  position: relative;
  bottom: 23px;
  grid-column: 2 / 3;
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
  grid-template-rows: 210px 1fr 57px;
  grid-template-columns: 151px 1fr;
  grid-template-areas:
    "1" "2"
    "3" "3"
    "4" "4";
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
  display: grid;
  grid-template-rows: 75px 87px;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "1" "2"
    "3" "3";
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
  text-align: right;
  margin-bottom: 31px;
`;
const LabelFormRightMargin = styled(LabelForm)`
  text-align: right;
  margin-bottom: 111px;
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

const FormInputWithMargin = styled(FormInput)`
  margin-bottom: 16px;
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

const ContactDataWrap = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 2;
  padding-top: 48px;
  padding-left: 32px;
`;

const InputWrapLeft = styled.div`
  margin-left: 20px;
`;
const InputWrapRight = styled.div`
  margin-right: 20px;
`;
const WrapDescription = styled.div`
  grid-column: 1/3;
`;
const WrapLabel = styled.div`
  grid-column: 1 / 2;
  padding-top: 54px;
`;

const EditContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.allContacts);
  const editedContact = contacts.find((item) => item._id === id);
  const fakeImg = "http://localhost:8080/api/img/avatarka.jpg";
  const initState = {
    name: "",
    surName: "",
    phone: "",
    birthday: "",
    faceBook: "",
    instagram: "",
    description: "",
    information: "",
    url: fakeImg,
    email: "",
    category: [],
  };

  const [form, setForm] = useState(id ? editedContact : initState);
  const history = useHistory();
  const [error, setError] = useState(null);
  const fileRef = useRef();
  console.log(error);

  useEffect(() => {
    if (id) {
      setForm({ ...editedContact, birthday: editedContact?.dateString });
    }
  }, [editedContact]);

  const clearError = () => {
    setTimeout(() => setError(null), 2500);
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
        dispatch({ type: C.SELECT_CAT, payload: "allContacts" });
        history.push("/contacts");
        return;
      })
      .catch((e) => {
        if (e.response.status === 401) {
          history.push("/");
          return;
        }
        const messageErr = e.response.data;
        if (messageErr.errors) {
          const errors = errorHandler(messageErr.errors);
          setError(errors);
          clearError();
          return;
        }
        setError(messageErr);
        clearError();
      });
    api.contacts
      .birthday()
      .then((res) =>
        dispatch({ type: C.SET_BIRTHDAY_DATA, payload: res.data.contacts })
      )
      .catch();
  };

  const createContact = (e) => {
    e.preventDefault();
    api.contacts
      .create(form)
      .then((res) => {
        dispatch({ type: C.SET_ALL_CONTACTS, payload: res.contacts });
        dispatch({ type: C.SELECT_CAT, payload: "allContacts" });
        history.push("/contacts");
        return;
      })
      .catch((e) => {
        if (e.response.status === 401) {
          history.push("/");
          return;
        }
        const messageErr = e.response.data;
        if (messageErr.errors) {
          const errors = errorHandler(messageErr.errors);
          setError(errors);
          clearError();
          return;
        }
        setError(messageErr);
        clearError();
      });
  };

  const uploadFile = () => {
    const file = fileRef.current.files && fileRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    api.image
      .upload(formData)
      .then((res) => {
        setForm({ ...form, url: res.data.url });
        return res.data;
      })
      .catch((e) => {
        if (e.response.status === 401) {
          history.push("/");
          return;
        }
        const messageErr = e.response.data;
        if (messageErr.errors) {
          const errors = errorHandler(messageErr.errors);
          setError(errors);
          clearError();
          return;
        }
        setError(messageErr);
        clearError();
      });
  };
  return (
    <Main>
      <AppBar header={id ? "Edit Contact" : "Add New Contact"} />
      <Content>
        <Form onSubmit={id ? updateContact : createContact}>
          <ButtonClose type="button" onClick={() => history.push("/contacts")}>
            X
          </ButtonClose>
          <WrapAvatar>
            <label htmlFor="url">
              <UserAvatar sizing="151px" src={form?.url} />
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
              <FormInput
                type="text"
                id="name"
                onChange={handleForm}
                name="name"
                placeholder="Enter name"
                value={form?.name}
              />
            </InputWrapRight>
            <InputWrapLeft>
              <LabelForm htmlFor="surName">Surname</LabelForm>
              <FormInput
                type="text"
                id="surName"
                placeholder="Enter surname"
                onChange={handleForm}
                value={form?.surName}
                name="surName"
              />
            </InputWrapLeft>
            <WrapDescription>
              <LabelForm htmlFor="description">Description</LabelForm>
              <InputTextAria
                type="text"
                placeholder="Enter description contact"
                id="description"
                name="description"
                onChange={handleForm}
                value={form?.description}
              />
            </WrapDescription>
          </UserInfoWrap>
          <WrapLabel>
            <LabelFormRight htmlFor="phone">Phone</LabelFormRight>
            <LabelFormRight htmlFor="email">Email</LabelFormRight>
            <LabelFormRight htmlFor="birthday">Birthday</LabelFormRight>
            <LabelFormRightMargin htmlFor="information">
              Information
            </LabelFormRightMargin>
            <LabelFormRight htmlFor="instagram">Instagram</LabelFormRight>
            <LabelFormRight htmlFor="faceBook">Facebook</LabelFormRight>
          </WrapLabel>
          <ContactDataWrap>
            <FormInputWithMargin
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter phone +38----------"
              onChange={handleForm}
              value={form?.phone}
            />

            <FormInputWithMargin
              type="text"
              id="email"
              name="email"
              placeholder="Enter email"
              onChange={handleForm}
              value={form?.email}
            />

            <FormInputWithMargin
              type="text"
              id="birthday"
              name="birthday"
              placeholder="Enter date birthday DD/MM/YYYY"
              onChange={handleForm}
              value={form?.birthday}
            />

            <InputTextAriaInformation
              type="text"
              id="information"
              name="information"
              placeholder="Enter information contact"
              onChange={handleForm}
              value={form?.information}
            />

            <FormInputWithMargin
              type="text"
              id="instagram"
              name="instagram"
              placeholder="Enter user name instagramm"
              onChange={handleForm}
              value={form?.instagram}
            />

            <FormInputWithMargin
              type="text"
              id="faceBook"
              name="faceBook"
              placeholder="Enter Facebook Link"
              onChange={handleForm}
              value={form?.faceBook}
            />
          </ContactDataWrap>
          <BottomBlock>
            <BottomHr />
            <ButtonAdd type="submit">
              {id ? "Save Changes" : "Add new contact"}
            </ButtonAdd>
            <ButtonCancel
              type="button"
              onClick={() => history.push("/contacts")}
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
