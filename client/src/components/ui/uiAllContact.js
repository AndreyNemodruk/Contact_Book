import styled from 'styled-components';

export const Main = styled.div`
    grid-area: main;
    display: grid;
    grid-template-rows: 73px 1fr 57px ;
    grid-template-areas: 
    "appbar"
    "main"
    "button";
    position: relative;
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-template-rows: repeat(auto-fit, 112px);
  padding: 24px 50px 0;
`
export const BottomBlock = styled.div`
  grid-area: button;
  width:100%;
  position: relative;
  padding: 0 50px;
  display: grid;
  grid-template-columns: 1fr 183px;
  grid-column-gap: 32px;

`
export const BottomHr = styled.div`
  width: 100%;
  position: relative;
  border-top: 1px solid #9699a5;
  grid-column: 1 / 2;
`

export const ButtonAdd = styled.button`
  background-color: #0FB0DF;
  width: 182px;
  height: 46px;
  border-radius: 30px;
  outline: none;
  border: none;
  cursor: pointer;
  position: relative;
  bottom: 23px;
  grid-column: 2 / 3;
  `