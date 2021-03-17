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
  padding: 100px 0 0 32px;
  width: 100%;
  height: 100%;
  display: grid;
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
  margin-bottom: 41px;
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

const FormInputWithMargin = styled(FormInput)`
  margin-bottom: 25px;
`;

const ContactDataWrap = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 2;
  padding-top: 80px;
  padding-left: 32px;
`;

const WrapLabel = styled.div`
  grid-column: 1 / 2;
  padding-top: 86px;
`;

const EditContact = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const initForm = {
    email: "",
    phone: "",
    firstName: "",
    secondName: "",
    file: "",
  };
  const [form, setForm] = useState(initForm);
  const history = useHistory();
  const [error, setError] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    if (user) {
      setForm(user);
    }
  }, [user]);

  const clearError = () => {
    setTimeout(() => setError(null), 2500);
  };

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const uploadFile = () => {
    const file = fileRef.current.files && fileRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);

    api.image
      .upload(formData)
      .then((res) => {
        setForm({ ...form, file: res.data.url });
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

  const submitForm = (e) => {
    e.preventDefault();
    api.users
      .update(form)
      .then((res) => {
        dispatch({ type: C.UPDATE_USER, payload: form });
        const user = JSON.parse(localStorage.getItem("phone_book"));
        const updatedUser = { ...user, ...form };
        localStorage.setItem("phone_book", JSON.stringify(updatedUser));
        history.push("/contacts");
      })
      .catch((e) => console.log(e));
  };
  return (
    <Main>
      <AppBar header="Edit User" />
      <Content>
        <Form onSubmit={(e) => submitForm(e)}>
          <ButtonClose type="button" onClick={() => history.push("/contacts")}>
            X
          </ButtonClose>
          <WrapAvatar>
            <label htmlFor="url">
              <UserAvatar sizing="151px" src={form?.file} />
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
            <div>
              <LabelForm htmlFor="firstName">Name</LabelForm>
              <FormInput
                type="text"
                id="firstName"
                onChange={handleForm}
                name="firstName"
                placeholder="Enter name"
                value={form?.firstName}
              />
            </div>
            <div style={{ paddingTop: "20px" }}>
              <LabelForm htmlFor="secondName">Surname</LabelForm>
              <FormInput
                type="text"
                id="secondName"
                placeholder="Enter surname"
                onChange={handleForm}
                value={form?.secondName}
                name="secondName"
              />
            </div>
          </UserInfoWrap>
          <WrapLabel>
            <LabelFormRight htmlFor="phone">Phone</LabelFormRight>
            <LabelFormRight htmlFor="email">Email</LabelFormRight>
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
          </ContactDataWrap>
          <BottomBlock>
            <BottomHr />
            <ButtonAdd type="submit">Save Changes</ButtonAdd>
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
