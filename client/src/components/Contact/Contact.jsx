import React, { useState, useCallback } from "react";
import styled from "styled-components";
import UserAvatar from "../../ui/Avatar.jsx";
import Icons from "../img/icons.jsx";
import useToggle from "../hooks/useToogle.js";
import { ContactMenu } from "../ContactMenu/index.jsx";
import { Link } from "react-router-dom";

const ContactWrap = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.sizeGroup ? "77px 170px 30px" : "48px auto 30px"};
  position: relative;
  margin: 0 auto;
  padding: 0 15px;
`;

const ContactName = styled(Link)`
  color: #000000;
  font-size: 16px;
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

  const handleShowMenu = useCallback((e) => {
    setClientX(e.clientX);
    setClientY(e.clientY);
    setToggle();
  }, []);
  return (
    <ContactWrap sizeGroup={sizeGroup}>
      <UserAvatar src={contact.url} sizing={sizeGroup ? "77px" : ""} />
      <div style={{ gridColumn: "1 2", marginLeft: "12px" }}>
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
