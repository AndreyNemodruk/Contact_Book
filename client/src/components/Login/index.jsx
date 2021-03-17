import React, { useState, Suspense } from "react";
import styled from "styled-components";
import FormLogin from "./FormLogin.jsx";

const Wrap = styled.div`
  background: #1a1f25;
  min-height: 100vh;
  padding: 1.5rem;
`;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 2rem auto;
`;

const ButtonsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto 15px;
  max-width: 80%;
`;

const Header = styled.h1`
  margin: 0 auto;
  text-align: center;
`;

const Button = styled.button`
  background: transparent;
  float: right;
  color: ${(props) => (props.isLogin ? "white" : "#7f8084")};
  border: none;
  // border: ${(props) => (props.isLogin ? "none" : "1px solid #22272d")};
  padding: 7px 15px;
  outline: none;
  border-radius: 3px;
  font-size: ${(props) => (props.isLogin ? "1.6em" : "1em")};
  cursor: ${(props) => (props.isLogin ? "" : "pointer")};
  &:hover {
    color: ${(props) => (props.isLogin ? "" : "#d3d3d3")};
  }
`;

const Registr = () => {
  const [isLogin, setIsLogin] = useState(true);
  const FormReg = React.lazy(() => import("./FormReg.jsx"));

  return (
    <Wrap>
      <Header>Phone Book</Header>
      <Wrapper>
        <Suspense fallback={<div>Загрузка...</div>}>
          <ButtonsBlock>
            <Button
              isLogin={isLogin}
              type="button"
              onClick={() => setIsLogin(true)}
            >
              Войти
            </Button>
            <Button
              isLogin={!isLogin}
              type="button"
              onClick={() => {
                setIsLogin(false);
              }}
            >
              Регистрация
            </Button>
          </ButtonsBlock>
          {isLogin ? <FormLogin /> : <FormReg setIsLogin={setIsLogin} />}
        </Suspense>
      </Wrapper>
    </Wrap>
  );
};

export default Registr;
