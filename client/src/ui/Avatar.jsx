/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components';
import breakpoint from '../components/constants/breakpoints';

const Avatar = styled.img`
   {
    border: 1px solid #ffffff;
    width: 48px;
    height: 48px;
    @media ${breakpoint.device.lg} {
      height: ${(props) => props.sizing || '48px'};
      width: ${(props) => props.sizing || '48px'};
    }
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
