import styled from 'styled-components';

export const DropMenuItemButton = styled.button`
   {
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    color: #ffffff;
    font-size: 14px;
    font-weight: 400;
    text-align: left;
    cursor: pointer;
    :hover {
      text-decoration: underline;
    }
    :focus {
      outline: none;
    }
  }
`;

export const DropMenuItem = styled.li`
   {
    list-style: none;
    height: 28px;
    width: 100%;
    position: relative;
    :not(:last-child) {
      border-bottom: 1px solid #ffffff;
    }
  }
`;

export const DropMenu = styled.ul`
   {
    margin: 0;
    padding: 0 10px;
    width: 175px;
    box-shadow: 0 0 10px rgba(48, 54, 80, 0.2);
    background-color: #2c314a;
    border-radius: 5px;
    z-index: 10;
    position: absolute;
    left: 51px;
    top: 24px;
  }
`;

export const LabelGroup = styled.label`
  &:before {
    content: '';
    position: absolute;
    left: 115px;
    bottom: 15px;
    border: 10px solid transparent;
    border-top: 10px solid red;
  }
  &:after {
    content: 'enter category and press key Enter';
    width: 90px;
    background: red;
    font-size: 0.6rem;
    position: absolute;
    bottom: 34px;
    left: 105px;
    padding: 5px;
  }
`;

export const InputGroup = styled.input`
   {
    background-color: #8ad2ec;
    outline: none;
    position: relative;
  }
`;

export const ButtonClose = styled.button`
  width: 23px;
  height: 23px;
  color: #eaf8fc;
  background-color: #10b1df;
  position: absolute;
  top: 28px;
  right: 10px;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
`;
