import React, { useState, useCallback } from "react";
import styled from "styled-components";
import Category from "./Categories.jsx";
import { CategoriesMenu } from "./CategoriesMenu.jsx";
import useToggle from "../hooks/useToogle";
import { useSelector } from "react-redux";

const ListCategoriesWrap = styled.div`
  margin-top: 19px;
  position: relative;
`;

const HeadlineSideBar = styled.h2`
  width: 200px;
  height: 10px;
  color: #8992ca;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  margin: 35px 0 5px 55px;
`;

export const Categories = () => {
  const [toggle, setToggle] = useToggle(false);
  const [clientX, setClientX] = useState(null);
  const [clientY, setClientY] = useState(null);
  const [changedCategory, setChangedCategory] = useState(null);
  const categories = useSelector((state) => state.categories.categories);

  const handleShowMenu = useCallback((e, category) => {
    setClientX(e.clientX);
    setClientY(e.clientY);
    setChangedCategory(category);
    setToggle();
  }, []);
  return (
    <>
      <HeadlineSideBar>Categories</HeadlineSideBar>
      <ListCategoriesWrap>
        <div style={{ position: "relative" }}>
          {toggle && (
            <CategoriesMenu
              toggle={setToggle}
              clientX={clientX}
              clientY={clientY}
              changedCategory={changedCategory}
            />
          )}
          <Category
            categories={categories}
            toggle={setToggle}
            handleShowMenu={handleShowMenu}
          />
        </div>
      </ListCategoriesWrap>
    </>
  );
};
