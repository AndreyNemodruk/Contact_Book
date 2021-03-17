import React, { useRef, useEffect, useState } from "react";
import {
  DropMenuItemButton,
  DropMenuItem,
  DropMenu,
  InputGroup,
  LabelGroup,
} from "../ui/ui";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import C from "../constants/constatnts";
import api from "../../api";
import { useHistory } from "react-router-dom";

const DropMenuCategories = styled(DropMenu)`
  position: fixed;
  left: ${(props) => props.clientX}px;
  top: ${(props) => props.clientY}px;
`;

export const CategoriesMenu = ({
  toggle,
  clientX,
  clientY,
  changedCategory,
}) => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const elRef = useRef(null);
  const [showEditGroup, setshowEditGroup] = useState(false);
  const [editedGroup, setEditedGroup] = useState(changedCategory);
  const history = useHistory();

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
    api.group
      .delete(changedCategory)
      .then((res) => {
        const remainingCat = categories.filter(
          (item) => item._id !== res.data._id
        );
        dispatch({ type: C.SET_ALL_CAT, payload: remainingCat });
        toggle();
        dispatch({ type: C.SELECT_CAT, payload: "allContacts" });
        history.push("/contacts");
        return;
      })
      .catch((e) => {
        console.log(e);
        if (e.response.status === 401) {
          history.push("/");
          return;
        }
      });
  };

  const handleChangeGroup = (e) => {
    setEditedGroup({ ...editedGroup, [e.target.name]: e.target.value });
  };

  const handleEditGroup = () => {
    setshowEditGroup((showEditGroup) => !showEditGroup);
  };

  const handleUpdateGroup = (e) => {
    if (e.keyCode == 27) {
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
      .catch((e) => {
        if (e.response.status === 401) {
          history.push("/");
          return;
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
