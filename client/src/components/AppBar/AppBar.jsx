/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import Icons from '../img/icons';
import breakpoint from '../constants/breakpoints';

const AppBarWrapper = styled.div`
  @media ${breakpoint.device.lg} {
    padding: 27px 103px 0px 123px;
  }
  padding: 20px 50px 0px 50px;
  background-color: #ffffff;
  grid-area: appbar;
  display: flex;
  justify-content: space-between;
`;
const HeadLine = styled.h2`
  height: 23px;
  margin: 0;
  color: #10b1df;
  text-align: left;
  @media ${breakpoint.device.lg} {
    font-size: 24px;
  }
  font-size: 20px;
`;
const ButtonMenu = styled.button`
  display: block;
  margin-top: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-self: flex-start;
  color: #abafc3;
  z-index: 10;

  &:focus {
    outline: none;
  }
  svg {
    margin-top: 2px;
    width: 16px;
  }
`;

const ContactName = styled.span`
  font-size: 0.8em;
`;

const AppBar = ({ header, isButton, name }) => (
  <AppBarWrapper>
    <HeadLine>
      {header}
      <ContactName>{name}</ContactName>
    </HeadLine>
    {isButton && (
      <ButtonMenu>
        <Icons name="MenuDots" />
      </ButtonMenu>
    )}
  </AppBarWrapper>
);

export default AppBar;
