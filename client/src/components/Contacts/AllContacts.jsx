/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import AppBar from '../AppBar/AppBar';
import {
  Main,
  Content,
  BottomBlock,
  BottomHr,
  ButtonAdd,
} from '../ui/uiAllContact';

const AllContacts = () => {
  const history = useHistory();
  const contacts = useSelector((state) => state.contacts.allContacts);
  const filter = useSelector((state) => state.contacts.filter);
  const [renderContacts, setRenderContacts] = useState(contacts);

  useEffect(() => {
    setRenderContacts(contacts);
    if (filter) {
      const filterContact = [...contacts].filter(
        (item) =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.surName.toLowerCase().includes(filter.toLowerCase())
      );
      setRenderContacts(filterContact);
    }
  }, [filter, contacts]);

  return (
    <Main>
      <AppBar header="All Contacts" />
      <Content>
        {renderContacts.map((item) => (
          // eslint-disable-next-line no-underscore-dangle
          <Contact key={item._id} contact={item} />
        ))}
      </Content>
      <BottomBlock>
        <BottomHr />
        <ButtonAdd onClick={() => history.push('/contacts/edit_contacts')}>
          Add new contact
        </ButtonAdd>
      </BottomBlock>
    </Main>
  );
};

export default AllContacts;
