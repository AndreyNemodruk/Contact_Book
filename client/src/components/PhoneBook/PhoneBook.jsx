import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import LeftBar from '../LeftBar/LeftBar';
import AllContacts from '../Contacts/AllContacts';
import EditContact from '../EditContacts/EditContact';
import GroupContacts from '../Contacts/GroupContacts';
import ContactInform from '../ContactInform/ContactInorm';
import EditUser from '../EditUser/EditUser';
import breakpoint from '../constants/breakpoints';

const Container = styled.div`
  background: #1a1f25;
  width: 100%;
  height: 100%;
`;

const GridWrap = styled.div`
   {
    display: block;
    grid-template-areas:
      'sidebar main'
      'sidebar main';
    grid-template-rows: 73px 1fr;

    @media ${breakpoint.device.xs} {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    }
    @media ${breakpoint.device.sm} {
      display: grid;
      grid-template-columns: 292px 1fr;
    }
    @media ${breakpoint.device.lg} {
      display: grid;
      grid-template-columns: 332px 1fr;
    }

    grid-gap: 0;
    margin: 0 auto;
    max-width: 1700px;
    background-color: #f9f9f9;
  }
`;

const MainWrap = styled.div`
  grid-area: main;

  @media ${breakpoint.device.xs} {
    display: ${(props) => (!props.showMenu ? 'block' : 'none')};
  }
  @media ${breakpoint.device.sm} {
    display: block;
  } ;
`;

const PhoneBook = () => {
  const [showMenu, setShowMenu] = useState(true);
  return (
    <Container>
      <GridWrap>
        <Route path="/contacts">
          <LeftBar showMenu={showMenu} setShowMenu={setShowMenu} />
        </Route>
        <MainWrap showMenu={showMenu} setShowMenu={setShowMenu}>
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
        </MainWrap>
      </GridWrap>
    </Container>
  );
};

export default PhoneBook;
