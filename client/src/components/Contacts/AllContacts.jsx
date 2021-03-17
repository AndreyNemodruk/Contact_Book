import React, { useState, useEffect } from "react";
import Contact from "../Contact/Contact.jsx";
import { AppBar } from "../AppBar/AppBar.jsx";
import {
  Main,
  Content,
  BottomBlock,
  BottomHr,
  ButtonAdd,
} from "../ui/uiAllContact";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api";

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
        {renderContacts.map((item) => {
          return <Contact key={item._id} contact={item} />;
        })}
      </Content>
      <BottomBlock>
        <BottomHr />
        <ButtonAdd onClick={() => history.push("/contacts/edit_contacts")}>
          Add new contact
        </ButtonAdd>
      </BottomBlock>
    </Main>
  );
};

export default AllContacts;
