import React, { memo } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Icons from "../img/icons.jsx";
import { useSelector, useDispatch } from "react-redux";
import C from "../constants/constatnts";

const ListCategories = styled.ul`
  padding: 0;
  margin: 0;
  height: 192px;
  overflow-x: auto;
  overflow-y: auto;
`;

const ButtonMenu = styled.button`{
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display:flex;
  outline: none;
  align-self: flex-start;
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 15px;
  right: 25px;
  z-index: 10
  &:focus{
      outline: none;
  };
      svg{
          margin-top: 2px;
          width:16px;
          &:hover{
              color: white; 
          }
      };
    
}`;

const ItemCategories = styled.li`
   {
    list-style: none;
    position: relative;
    display: flex;
  }
`;

const ButtonCategories = styled.button`
   {
    width: 100%;
    height: 48px;
    color: #ffffff;
    font-size: 15px;
    font-weight: 400;
    line-height: 48px;
    background: none;
    padding-left: 55px;
    text-align: left;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    outline: none;
    border-left: 3px solid transparent;
    ${(props) =>
      props.isActive
        ? `&{
      border-left: 3px solid #02bbf1;
  }
  &:before{
      content: "";
      display:block;
      position:absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: linear-gradient(to right, #7e8eda 0%, rgba(255, 255, 255, 0) 100%);
      opacity: 0.13;
  }`
        : ""}
  }
`;

const Category = ({ handleShowMenu }) => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.categories.selectedCat);
  const history = useHistory();
  const categories = useSelector((state) => state.categories.categories);

  const handleAllContact = () => {
    dispatch({ type: C.SELECT_CAT, payload: "allContacts" });
    history.push("/contacts");
  };

  const handleCategory = (id) => {
    dispatch({ type: C.SELECT_CAT, payload: id });
    history.push(`/contacts/group/${id}`);
  };

  return (
    <ListCategories>
      <ItemCategories>
        <ButtonCategories
          autoFocus
          onClick={handleAllContact}
          isActive={activeCategory === "allContacts"}
        >
          All categories
        </ButtonCategories>
      </ItemCategories>
      {categories &&
        categories.map((item) => {
          return (
            <ItemCategories key={item._id}>
              <ButtonCategories
                onClick={() => handleCategory(item._id)}
                isActive={activeCategory === item._id}
              >
                {item.groupName}
              </ButtonCategories>
              <ButtonMenu onClick={(e) => handleShowMenu(e, item)}>
                <Icons name="MenuDots" />
              </ButtonMenu>
            </ItemCategories>
          );
        })}
    </ListCategories>
  );
};

export default memo(Category);
