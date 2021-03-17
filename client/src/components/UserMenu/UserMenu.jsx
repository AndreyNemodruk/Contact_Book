import React, { useRef, useEffect, useState } from "react";
import { DropMenuItemButton, DropMenuItem, DropMenu } from "../ui/ui";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const DropItemMenu = styled(DropMenu)`
  position: fixed;
  top: ${(props) => props.clientY + 10}px;
  left: ${(props) => props.clientX - 25}px;
`;

export const UserMenu = ({ toggle, clientX, clientY }) => {
  const history = useHistory();
  const elRef = useRef(null);

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

  const handleEitUser = () => {
    history.push("/contacts/edit_user");
    toggle();
  };

  return (
    <DropItemMenu
      ref={elRef}
      clientX={clientX}
      clientY={clientY}
      style={{ backgroundColor: "#485173", border: "1px solid #24283e" }}
    >
      <DropMenuItem>
        <DropMenuItemButton onClick={handleEitUser}>
          Edit user
        </DropMenuItemButton>
      </DropMenuItem>
    </DropItemMenu>
  );
};
