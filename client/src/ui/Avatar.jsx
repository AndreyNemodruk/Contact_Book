import React from "react";
import styled from "styled-components";

const Avatar = styled.img`
   {
    width: ${(props) => props.sizing || "48px"};
    border: 1px solid #ffffff;
    height: ${(props) => props.sizing || "48px"};
    border-radius: 50%;
    background-size: cover;
    margin: 0 auto;
    &:hover {
    }
  }
`;

const UserAvatar = ({ sizing, ...rest }) => (
  <Avatar sizing={sizing} {...rest} />
);

export default UserAvatar;
