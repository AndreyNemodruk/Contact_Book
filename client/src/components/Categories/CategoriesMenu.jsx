/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  DropMenuItemButton,
  DropMenuItem,
  DropMenu,
  InputGroup,
  LabelGroup,
} from '../ui/ui';
import C from '../constants/constatnts';
import api from '../../api';

const DropMenuCategories = styled(DropMenu)`
  position: fixed;
  left: ${(props) => props.clientX}px;
  top: ${(props) => props.clientY}px;
`;

const CategoriesMenu = ({ toggle, clientX, clientY, changedCategory }) => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const elRef = useRef(null);
  const [showEditGroup, setshowEditGroup] = useState(false);
  const [editedGroup, setEditedGroup] = useState(changedCategory);
  const history = useHistory();

  const handleClickOutside = (event) => {
    if (elRef && !elRef.current.contains(event.target)) {
      toggle();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('scroll', toggle);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', toggle);
    };
  });

  const handleDelete = () => {
    api.group
      .delete(changedCategory)
      .then((res) => {
        const remainingCat = categories.filter(
          (item) => item._id !== res.data._id
        );
        dispatch({ type: C.SET_ALL_CAT, payload: remainingCat });
        toggle();
        dispatch({ type: C.SELECT_CAT, payload: 'allContacts' });
        history.push('/contacts');
      })
      .catch((e) => {
        if (e.response.status === 401) {
          history.push('/');
        }
      });
  };

  const handleChangeGroup = (e) => {
    setEditedGroup({ ...editedGroup, [e.target.name]: e.target.value });
  };

  const handleEditGroup = () => {
    setshowEditGroup((prev) => !prev);
  };

  const handleUpdateGroup = (e) => {
    if (e.keyCode === 27) {
      toggle();
      return;
    }
    if (e.keyCode !== 13) {
      return;
    }
    api.group
      .update(editedGroup)
      .then((res) => {
        const updatedCategories = categories.map((item) => {
          if (item._id === res.data._id) {
            return res.data;
          }
          return item;
        });
        dispatch({ type: C.SET_ALL_CAT, payload: updatedCategories });
        toggle();
      })
      .catch((error) => {
        if (error.response.status === 401) {
          history.push('/');
        }
      });
  };

  return (
    <DropMenuCategories ref={elRef} clientX={clientX} clientY={clientY}>
      <DropMenuItem>
        <DropMenuItemButton onClick={handleEditGroup}>
          Edit group
        </DropMenuItemButton>
      </DropMenuItem>
      {showEditGroup && (
        <DropMenuItem>
          <LabelGroup>
            <InputGroup
              autoFocus
              type="text"
              name="groupName"
              id="groupName"
              placeholder="enter group name"
              value={editedGroup.groupName}
              onChange={handleChangeGroup}
              onKeyDown={handleUpdateGroup}
            />
          </LabelGroup>
        </DropMenuItem>
      )}
      <DropMenuItem>
        <DropMenuItemButton onClick={handleDelete}>
          Delete group
        </DropMenuItemButton>
      </DropMenuItem>
    </DropMenuCategories>
  );
};

export default CategoriesMenu;
