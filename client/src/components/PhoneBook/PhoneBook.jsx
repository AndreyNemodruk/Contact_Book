import React from "react";
import { Route, useHistory } from "react-router-dom";
import styled from "styled-components";
import LeftBar from "../LeftBar/LeftBar.jsx";
import AllContacts from "../Contacts/AllContacts.jsx";
import EditContact from "../EditContacts/EditContact.jsx";
import GroupContacts from "../Contacts/GroupContacts.jsx";
import ContactInform from "../ContactInform/ContactInorm.jsx";
import EditUser from "../EditUser/EditUser.jsx";

const Container = styled.div`
  background: #1a1f25;
  width: 100%;
  height: 100%;
`;

const GridWrap = styled.div`
   {
    display: grid;
    grid-template-areas:
      "sidebar main"
      "sidebar main";
    grid-template-rows: 73px 1fr;
    grid-template-columns: 332px 1fr;
    grid-gap: 0;
    margin: 0 auto;
    max-width: 1700px;
    background-color: #f9f9f9;
  }
`;

const PhoneBook = () => {
  const history = useHistory();
  return (
    <Container>
      <GridWrap>
        <Route>
          <LeftBar path="/contacts" />
        </Route>
        <Route path="/contacts" exact>
          <AllContacts />
        </Route>
        <Route path="/contacts/information/:id" exact>
          <ContactInform />
        </Route>
        <Route path="/contacts/edit_contacts" exact>
          <EditContact />
        </Route>
        <Route path="/contacts/edit_contacts/:id" exact>
          <EditContact />
        </Route>
        <Route path="/contacts/group/:id" exact>
          <GroupContacts />
        </Route>
        <Route path="/contacts/edit_user" exact>
          <EditUser />
        </Route>
      </GridWrap>
    </Container>
  );
};

export default PhoneBook;
