import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DropMenuItemButton, DropMenuItem } from "../ui/ui";
import api from "../../api";
import C from "../constants/constatnts";

export const ItemAddCategory = ({ item, contact, toggle }) => {
  const contacts = useSelector((state) => state.contacts.allContacts);
  const dispatch = useDispatch();

  const handleUpdateContact = () => {
    if (contact.category.includes(item._id)) {
      toggle();
      return;
    }
    const updateContact = {
      ...contact,
      category: [...contact.category, item._id],
      birthday: contact.birthday.split("T")[0].split("-").reverse().join("/"),
    };
    api.contacts
      .update(updateContact)
      .then((res) => {
        const updatedContacts = contacts.map((item) => {
          if (item._id === res.data._id) {
            return res.data;
          }
          return item;
        });
        dispatch({ type: C.SET_ALL_CONTACTS, payload: updatedContacts });
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
  return (
    <DropMenuItem key={item._id}>
      <DropMenuItemButton onClick={handleUpdateContact}>
        {item.groupName}
      </DropMenuItemButton>
    </DropMenuItem>
  );
};
