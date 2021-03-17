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
import { useSelector, useDispatch } from "react-redux";
import api from "../../api";
import C from "../constants/constatnts";
import styled from "styled-components";

const GroupContent = styled(Content)`
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const GroupContacts = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  dispatch({ type: C.SELECT_CAT, payload: id });
  const allGroup = useSelector((state) => state.categories.categories);
  const groupName = allGroup && allGroup.find((item) => item?._id === id);
  const history = useHistory();
  const filter = useSelector((state) => state.contacts.filter);
  const [contactsForRender, setContactsForRender] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    api.contacts
      .byGroup(id)
      .then((res) => {
        setContacts(res.data.contacts);
        const filterCintact = res.data.contacts.filter(
          (item) =>
            item.name.toLowerCase().includes(filter.toLowerCase()) ||
            item.surName.toLowerCase().includes(filter.toLowerCase())
        );
        setContactsForRender(filterCintact);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          history.push("/");
          return;
        }
      });
  }, [id]);

  useEffect(() => {
    setContactsForRender(contacts);
    if (filter) {
      const filterContact = [...contacts].filter(
        (item) =>
          item.name.toLowerCase().includes(filter.toLowerCase()) ||
          item.surName.toLowerCase().includes(filter.toLowerCase())
      );
      setContactsForRender(filterContact);
    }
  }, [filter]);

  return (
    <Main>
      <AppBar header={groupName?.groupName} />
      <GroupContent>
        {contactsForRender.map((item) => {
          return <Contact key={item._id} contact={item} sizeGroup={true} />;
        })}
      </GroupContent>
      <BottomBlock>
        <BottomHr />
        <ButtonAdd onClick={() => history.push("/contacts/edit_contacts")}>
          Add new contact
        </ButtonAdd>
      </BottomBlock>
    </Main>
  );
};

export default GroupContacts;
