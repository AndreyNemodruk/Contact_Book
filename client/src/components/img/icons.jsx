/* eslint-disable react/prop-types */
import React from 'react';
import { ReactComponent as AddButton } from './AddButton.svg';
import { ReactComponent as IconDots } from './menu-dots.svg';
import { ReactComponent as IconSearch } from './searchIcon.svg';
import { ReactComponent as IconCheck } from './icon.svg';
import { ReactComponent as IconEdit } from './edit-tool.svg';
import { ReactComponent as IconFoto } from './picture.svg';

const Icons = (props) => {
  switch (props.name) {
    case 'NewContactButton':
      return <AddButton />;
    case 'MenuDots':
      return <IconDots id={props.id} />;
    case 'IconSearch':
      return <IconSearch />;
    case 'IconCheck':
      return <IconCheck />;
    case 'IconEdit':
      return <IconEdit />;
    case 'IconFoto':
      return <IconFoto />;
    default:
      return null;
  }
};

export default Icons;
