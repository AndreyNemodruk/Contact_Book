/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const Message = styled.p`
  color: coral;
  font-size: 0.8em;
  height: 15px;
  padding: 0;
  margin: 0;
`;
const ErrorMessage = ({ error }) => (
  <div>
    <Message>{error || ''}</Message>
  </div>
);

export default ErrorMessage;
