import React, { useRef, useEffect, useState } from "react";
import {
  DropMenuItemButton,
  DropMenuItem,
  DropMenu,
  InputGroup,
  LabelGroup,
} from "../ui/ui";
import { ItemAddCategory } from "./ItemAddCategory.jsx";
import api from "../../api";
import { useSelector, useDispatch } from "react-redux";
import C from "../constants/constatnts";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Icons from "../img/icons.jsx";

const ButtonIcon = styled.div`
   {
    width: 6px;
    height: 6px;
    position: absolute;
    right: 2px;
    bottom: 8px;
    display: flex;
    z-index: 20;
    justify-content: center;
    transform: ${(props) =>
      props.showDropMenu ? "rotate(180deg) translateY(3px)" : ""};
  }
`;

const DropMenuAddCategory = styled(DropMenu)`
  top: 30px;
  left: 15px;
`;
const DropItemMenu = styled(DropMenu)`
  position: fixed;
  top: ${(props) => props.clientY + 15}px;
  left: ${(props) => props.clientX - 150}px;
`;

export const ContactMenu = ({ toggle, contact, clientX, clientY }) => {
  const history = useHistory();
  const elRef = useRef(null);
  const contacts = useSelector((state) => state.contacts.allContacts);
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [addedGroup, setAddedGroup] = useState({ groupName: "" });
  const [showDropMenu, setShowDropMenu] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", toggle);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("scroll", toggle);
    };
  });

  const handleClickOutside = (event) => {
    if (elRef && !elRef.current.contains(event.target)) {
      toggle();
    }
  };

  const handleDelete = () => {
    api.contacts
      .delete(contact)
      .then(() => {
        const filterContacts = contacts.filter(
          (item) => item._id !== contact._id
        );
        dispatch({ type: C.SET_ALL_CONTACTS, payload: filterContacts });
        toggle();
        return;
      })
      .catch((e) => {
        if (e.response.status === 401) {
          history.push("/");
          return;
        }
      });
  };

  const handleEditContact = () => {
    history.push(`/contacts/edit_contacts/${contact._id}`);
  };

  const handleShowCreateGroup = () => {
    setShowDropMenu(false);
    setShowCreateGroup((showCreateGroup) => !showCreateGroup);
  };

  const handleChangeGroupName = (e) => {
    setAddedGroup({ [e.target.name]: e.target.value });
  };

  const handleShowDropMenu = () => {
    setShowCreateGroup(false);
    setShowDropMenu(!showDropMenu);
  };

  const handleCreateGroup = (e) => {
    if (e.keyCode == 27) {
      toggle();
      return;
    }
    if (e.keyCode !== 13) {
      return;
    }
    api.group
      .create(addedGroup)
      .then((res) => {
        dispatch({ type: C.ADD_CATEGORY, payload: res.data });
        res.data.groups;
        toggle();
      })
      .catch((e) => {
        toggle();
        if (e.response.status === 401) {
          history.push("/");
          return;
        }
      });
  };

  return (
    <DropItemMenu ref={elRef} clientX={clientX} clientY={clientY}>
      <DropMenuItem>
        <DropMenuItemButton onClick={handleEditContact}>
          Edit contact
        </DropMenuItemButton>
      </DropMenuItem>
      <DropMenuItem>
        <DropMenuItemButton onClick={handleDelete}>Delete</DropMenuItemButton>
      </DropMenuItem>
      <DropMenuItem>
        <DropMenuItemButton onClick={handleShowCreateGroup}>
          Create Groupe
        </DropMenuItemButton>
      </DropMenuItem>
      {showCreateGroup && (
        <DropMenuItem>
          <LabelGroup>
            <InputGroup
              autoFocus
              type="text"
              name="groupName"
              id="groupName"
              placeholder="enter group name"
              value={addedGroup.groupName}
              onChange={handleChangeGroupName}
              onKeyDown={handleCreateGroup}
            />
          </LabelGroup>
        </DropMenuItem>
      )}
      <DropMenuItem>
        <DropMenuItemButton onClick={handleShowDropMenu}>
          Add to group
          <ButtonIcon showDropMenu={showDropMenu}>
            <Icons name="IconCheck" />
          </ButtonIcon>
        </DropMenuItemButton>
        {showDropMenu && (
          <DropMenuAddCategory>
            {categories.map((item) => {
              return (
                <ItemAddCategory
                  key={item._id}
                  item={item}
                  contact={contact}
                  toggle={toggle}
                />
              );
            })}
          </DropMenuAddCategory>
        )}
      </DropMenuItem>
    </DropItemMenu>
  );
};
