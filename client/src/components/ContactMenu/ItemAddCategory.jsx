/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropMenuItemButton, DropMenuItem } from '../ui/ui';
import api from '../../api';
import C from '../constants/constatnts';

const ItemAddCategory = ({ item, contact, toggle }) => {
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
      birthday: contact.birthday.split('T')[0].split('-').reverse().join('/'),
    };
    api.contacts
      .update(updateContact)
      .then((res) => {
        const updatedContacts = contacts.map((i) => {
          if (i._id === res.data._id) {
            return res.data;
          }
          return i;
        });
        dispatch({ type: C.SET_ALL_CONTACTS, payload: updatedContacts });
        toggle();
      })
      .catch((e) => {
        if (e.response.status === 401) {
          history.push('/');
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

export default ItemAddCategory;
