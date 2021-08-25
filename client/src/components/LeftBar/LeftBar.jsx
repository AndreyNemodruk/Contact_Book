/* eslint-disable operator-linebreak */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React, { useContext, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import UserAvatar from '../../ui/Avatar';
import Icons from '../img/icons';
import authContext from '../context/authContext';
import C from '../constants/constatnts';
import Categories from '../Categories/index';
import BirthdayItem from '../Birthday/BirthdayItem';
import UserMenu from '../UserMenu/UserMenu';
import useToggle from '../hooks/useToogle';
import breakpoint from '../constants/breakpoints';
import { ButtonClose } from '../ui/ui';

const SideBar = styled.div`
  grid-area: sidebar;
  position: relative;
  box-sizing: border-box;
  align-items: stretch;
  width: 100%;
  min-height: 100vh;
  z-index: 100000;
  padding-top: 25px;
  background-image: linear-gradient(to top, #485173 0%, #24283e 100%);
  @media ${breakpoint.device.xs} {
    display: ${(props) => (props.showMenu ? 'grid' : 'none')};
  }
  @media ${breakpoint.device.sm} {
  } ;
`;

const SideBarWrap = styled.div`
  max-width: 450px;
  margin: 0 auto;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 57px;
  width: 100%;
  @media ${breakpoint.device.sm} {
    margin: 0;
  } ;
`;

const HeadlineBar = styled.h1`
  color: #ffffff;
  text-align: left;
  font-size: 1.5em;
  margin: 0px 81px 0 56px;
  display: none;
  @media ${breakpoint.device.sm} {
    display: block;
    margin: 0 81px 0 56px;
  }
`;

const BlockUser = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 57px 20px 55px;
  max-width: 350px;
  @media ${breakpoint.device.sm} {
    width: 220px;
    margin: 57px auto 55px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 14px;
  width: 140px;
`;

const UserName = styled.span`
  width: 140px;
  color: #ffffff;
  font-size: 0.8em;
  font-weight: 400;
`;

const ButtonLogOut = styled.button`
  width: 60px;
  color: #8992ca;
  font-size: 12px;
  font-weight: 400;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  margin-top: 13px;
  &:hover {
    text-decoration: underline;
    color: #ffffff;
  }
`;

const BlockSearch = styled.div`
  height: 32px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  display: flex;
  margin: 57px 20px 55px;
  align-items: center;
  @media ${breakpoint.device.sm} {
    width: 222px;
    margin: 57px auto 55px;
  }
`;

const InputSearch = styled.input`
  height: 100%;
  background: none;
  border: 0;
  padding-left: 17px;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  &:focus {
    outline: none;
  }
`;

const ButtonSearch = styled.button`
  width: 18px;
  height: 18px;
  padding: 0;
  border: none;
  background: none;
  &:focus {
    outline: none;
  }
  svg {
    margin-top: 2px;
    width: 16px;
    color: rgba(255, 255, 255, 0.5);
    &:hover {
      color: white;
    }
  }
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

const ButtonMenu = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display:flex;
    outline: none;
    align-self: flex-start;
    color: rgba(255, 255, 255, 0.5);
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
      
`;

const BirthDayWrap = styled.div`
  height: 236px;
  margin: 0 20px;
  @media ${breakpoint.device.sm} {
    width: 222px;
    margin: 0 auto;
  } ;
`;

const NewContactBlock = styled.div`
  margin: 0 20px;
  height: 57px;
  border-top: 1px solid #9699a5;
  @media ${breakpoint.device.sm} {
    width: 222px;
    margin: 0 auto;
  }
`;

const AddButton = styled.button`
  background: none;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  border: none;
  color: #ffffff;
  margin-top: 17px;
  &:hover {
    text-decoration: underline;
  }
`;

const Close = styled(ButtonClose)`
  right: 35px;
  @media ${breakpoint.device.sm} {
    display: none;
  } ;
`;

const AddButtonIcon = styled.div`
  width: 23px;
  height: 23px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  padding: 4px;
  box-sizing: border-box;
  svg {
    width: 13px;
  }
`;

const AddButtonText = styled.span`
  font-size: 15px;
  font-weight: 400;
  margin-left: 11px;
`;

const LeftBar = ({ showMenu, setShowMenu }) => {
  const { logOut } = useContext(authContext);
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const birthday = useSelector((state) => state.contacts.birthday);
  const [search, setSearch] = useState('');
  const [toggle, setToggle] = useToggle();
  const [clientX, setClientX] = useState(null);
  const [clientY, setClientY] = useState(null);

  const handleShowMenu = useCallback(
    (e) => {
      setClientX(e.clientX);
      setClientY(e.clientY);
      setToggle();
    },
    // eslint-disable-next-line comma-dangle
    [setToggle]
  );
  const unLog = () => {
    history.push('/');
    dispatch({ type: C.DEL_USER, payload: null });
    logOut();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    dispatch({ type: C.SET_FILTER_CONTACTS, payload: e.target.value });
  };
  return (
    <SideBar showMenu={showMenu}>
      <SideBarWrap>
        <div>
          <Close onClick={() => setShowMenu(!showMenu)}>X</Close>
          <HeadlineBar>Contact Book</HeadlineBar>
          <BlockUser>
            <div style={{ display: 'flex' }}>
              <UserAvatar
                src={user.file}
                alt={`foto ${user.firstName} ${user.secondName}`}
              />
              <UserInfo>
                <UserName>{`${user.firstName} ${user.secondName}`}</UserName>
                <ButtonLogOut onClick={unLog}>Log out</ButtonLogOut>
              </UserInfo>
            </div>
            <ButtonMenu onClick={handleShowMenu}>
              <Icons name="MenuDots" />
            </ButtonMenu>
            {toggle && (
              <UserMenu
                toggle={setToggle}
                clientX={clientX}
                clientY={clientY}
              />
            )}
          </BlockUser>
          <BlockSearch>
            <ButtonSearch>
              <Icons name="IconSearch" />
            </ButtonSearch>
            <InputSearch
              type="text"
              placeholder="Search a contact"
              value={search}
              onChange={handleChange}
              name="search"
            />
          </BlockSearch>
          <Categories />
          <HeadlineSideBar>coming birthday</HeadlineSideBar>
          <BirthDayWrap>
            {birthday &&
              birthday.map((item) => (
                <BirthdayItem item={item} key={item._id} />
              ))}
          </BirthDayWrap>
        </div>
        <div>
          <NewContactBlock>
            <AddButton onClick={() => history.push('/contacts/edit_contacts')}>
              <AddButtonIcon>
                <Icons name="NewContactButton" />
              </AddButtonIcon>
              <AddButtonText>New Contact</AddButtonText>
            </AddButton>
          </NewContactBlock>
        </div>
      </SideBarWrap>
    </SideBar>
  );
};

export default LeftBar;
