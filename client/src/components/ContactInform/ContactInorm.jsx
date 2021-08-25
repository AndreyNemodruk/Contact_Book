/* eslint-disable operator-linebreak */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable arrow-body-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import api from '../../api';
import { ButtonClose } from '../ui/ui';
import Avatar from '../../ui/Avatar';
import AppBar from '../AppBar/AppBar';
import Icons from '../img/icons';
import Spinn from '../Spinner/Spinner';
import breakpoint from '../constants/breakpoints';

const Main = styled.div`
  grid-area: main;
  display: grid;
  grid-template-rows: 73px 1fr;
  grid-template-areas:
    'appbar'
    'main'
    'button';
  position: relative;
`;

const Content = styled.div`
  @media ${breakpoint.device.lg} {
    padding: 23px 84px 23px 120px;
  }
  padding: 23px 10px 120px;
  position: relative;
  display: grid;
  grid-template-columns: 150px 250px auto;
  grid-template-rows: 150px auto auto;
  grid-column-gap: 20px;
`;
const Button = styled(ButtonClose)`
  @media ${breakpoint.device.lg} {
    top: 15px;
    right: 75px;
  }
  top: 15px;
  right: 15px;
`;
const AvatarWrap = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`;

const ContactInfo = styled.div`
  grid-column: 2/3;
  grid-row: 1/2;
  padding-top: 32px;
  position: relative;
`;
const Name = styled.h2`
  font-size: 1.1rem;
  margin-bottom: 18px;
`;
const Description = styled.p`
  color: #1f2226;
  font-size: 0.75rem;
`;

const ButtonEdit = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
`;

const ColumnContent = styled.div`
  grid-column: 1/4;
  grid-row: 2/3;
  padding-top: 50px;
  color: #22282d;
  font-size: 0.9rem;
`;

const RowWrap = styled.div`
  display: grid;
  grid-template-columns: 150px 250px auto;
  grid-column-gap: 20px;
  padding-bottom: 38px;
`;

const LabelInfo = styled.h3`
  text-align: right;
  grid-column: 1/2;
  margin: 0;
`;

const Info = styled.div`
  grid-column: 2/3;
  margin: 0;
  line-height: 24px;
  color: #42484c;
`;

const InfoInstagramm = styled(Info)`
  font-size: 0.75rem;
  color: #3bb9e3;
  position: relative;
  padding-left: 20px;
`;

const FotoInstWrap = styled.div`
  grid-column: 2/4;
  max-width: 280px;
  min-height: 180px;
`;

const FotoInst = styled.img`
  width: 83px;
  height: 83px;
  margin-right: 5px;
  margin-bottom: 1px;
  border-radius: 5px;
`;

const IconFotoWrap = styled.div`
  position: absolute;
  top: 4px;
  left: 0;
`;

const UserFoto = styled(Avatar)`
  @media ${breakpoint.device.lg} {
    width: 151px;
    height: 151px;
  }
  width: 120px;
  height: 120px;
`;

const ConactInform = () => {
  const { id } = useParams();
  const history = useHistory();
  const contact = useSelector((state) => state.contacts.allContacts).find(
    (item) => item._id === id
  );
  const [countMedia, setCountMedia] = useState(null);
  const [mediaList, setMediaList] = useState(null);
  const [showSpinner, setShowSpinner] = useState(false);
  useEffect(() => {
    let req;
    if (contact?.instagram) {
      setShowSpinner(true);
      req = api
        .inst(contact.instagram)
        .then((res) => {
          setCountMedia(res.data.count);
          const img = res.data.edges.slice(0, 6).reduce((acc, item) => {
            return [
              ...acc,
              { src: item.node.thumbnail_resources[2].src, id: item.node.id },
            ];
          }, []);
          setMediaList(img);
          setShowSpinner(false);
        })
        .catch((e) => {
          setShowSpinner(false);
          if (e.response.status === 401) {
            history.push('/');
          }
        });
    }
    return () => {
      return req;
    };
  }, [contact.instagram, history]);

  return (
    <Main>
      <AppBar
        header="Contact information"
        name={` (${contact?.name} ${contact?.surName})`}
      />
      <Content>
        <Button onClick={() => history.push('/contacts')}>X</Button>
        <AvatarWrap>
          <UserFoto src={contact?.url} />
        </AvatarWrap>
        <ContactInfo>
          <ButtonEdit
            onClick={() =>
              history.push(`/contacts/edit_contacts/${contact?._id}`)
            }
          >
            <Icons name="IconEdit" />
          </ButtonEdit>
          <Name>{`${contact?.name} ${contact?.surName}`}</Name>
          <Description>{contact?.description}</Description>
        </ContactInfo>
        <ColumnContent>
          <RowWrap>
            <LabelInfo>Phone</LabelInfo>
            <Info>{contact?.phone}</Info>
          </RowWrap>
          <RowWrap>
            <LabelInfo>Mobile Phone</LabelInfo>
            <Info>{contact?.phone}</Info>
          </RowWrap>
          <RowWrap>
            <LabelInfo>Email</LabelInfo>
            <Info>{contact?.email}</Info>
          </RowWrap>
          <RowWrap>
            <LabelInfo>Birth Day</LabelInfo>
            <Info>{contact?.dateString}</Info>
          </RowWrap>
          <RowWrap>
            <LabelInfo>Information</LabelInfo>
            <Info style={{ gridColumn: '2/4', paddingRight: '100px' }}>
              {contact?.information}
            </Info>
          </RowWrap>
          <RowWrap style={{ paddingBottom: '10px' }}>
            <LabelInfo>Instagramm</LabelInfo>
            <InfoInstagramm>
              <IconFotoWrap>
                <Icons name="IconFoto" />
              </IconFotoWrap>
              {`   ${countMedia || 0} Photos and Videos`}
            </InfoInstagramm>
            <FotoInstWrap>
              {showSpinner && <Spinn />}
              {mediaList &&
                mediaList.map((item) => {
                  return <FotoInst key={item.id} src={item.src} />;
                })}
            </FotoInstWrap>
          </RowWrap>
        </ColumnContent>
      </Content>
    </Main>
  );
};

export default ConactInform;
