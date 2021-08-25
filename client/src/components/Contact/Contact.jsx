/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable indent */
/* eslint-disable no-confusing-arrow */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import UserAvatar from '../../ui/Avatar';
import Icons from '../img/icons';
import useToggle from '../hooks/useToogle';
import ContactMenu from '../ContactMenu/index';
import breakpoint from '../constants/breakpoints';

const ContactWrap = styled.div`
  display: grid;
  @media ${breakpoint.device.lg} {
    grid-template-columns: ${(props) =>
      props.sizeGroup ? '77px 170px 30px' : '48px auto 30px'};
  }
  grid-template-columns: 48px auto 30px;
  position: relative;
  margin: 0 auto;
  padding: 0 15px;
`;

const ContactName = styled(Link)`
  color: #000000;
  font-size: 1em;
  font-weight: 400;
  text-decoration: none;
`;

const ContactInfo = styled.div`
  color: #9b9b9b;
  margin-top: 5px;
  font-size: 12px;
  font-weight: 400;
`;

const WrapDropMenu = styled.div`
  padding-left: 10px;
`;

const ButtonMenu = styled.button`
   {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-self: center;
    color: #9b9b9b;
    position: relative;
    &:focus {
      outline: none;
    }
    svg {
      margin-top: 2px;
      width: 16px;
      &:hover {
        color: black;
      }
    }
  }
`;

const Contact = ({ contact, sizeGroup }) => {
  const [toggle, setToggle] = useToggle();
  const [clientX, setClientX] = useState(null);
  const [clientY, setClientY] = useState(null);
  const handleShowMenu = useCallback(
    (e) => {
      setClientX(e.clientX);
      setClientY(e.clientY);
      setToggle();
    },
    [setToggle]
  );
  return (
    <ContactWrap sizeGroup={sizeGroup}>
      <UserAvatar
        alt={`foto ${contact.name} ${contact.surName}`}
        src={contact.url}
        sizing={sizeGroup ? '77px' : ''}
      />
      <div style={{ gridColumn: '1 2', marginLeft: '12px' }}>
        <ContactName to={`/contacts/information/${contact._id}`}>
          {`${contact.name} ${contact.surName}`}
        </ContactName>
        <ContactInfo>{contact.phone}</ContactInfo>
      </div>
      <WrapDropMenu>
        <ButtonMenu onClick={(e) => handleShowMenu(e)}>
          <Icons name="MenuDots" />
        </ButtonMenu>
        {toggle && (
          <ContactMenu
            toggle={setToggle}
            contact={contact}
            clientX={clientX}
            clientY={clientY}
          />
        )}
      </WrapDropMenu>
    </ContactWrap>
  );
};
export default Contact;
