/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const BirthdayItemWrap = styled.div`
   {
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin-top: 23px;
    opacity: ${(props) => (props.today ? 1 : 0.3)};
  }
`;

const BirthName = styled.h2`
   {
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    margin: 0;
  }
`;

const BirthdayAge = styled.span`
   {
    opacity: ${(props) => (props.today ? 0.5 : 1)};
    color: #ffffff;
    font-size: 10px;
    font-weight: 400;
  }
`;

const BirthdayDate = styled.span`
   {
    color: #ffffff;
    font-size: 10px;
    font-weight: 500;
    line-height: 24px;
    text-transform: uppercase;
  }
`;

const BirthdayItem = ({ item }) => {
  const thisDay = new Date();
  const year = thisDay.getFullYear();
  const month = thisDay.getMonth() + 1;
  const day = thisDay.getDate();
  const isToday = item.day === day && item.month === month;

  return (
    <BirthdayItemWrap today={isToday}>
      <div>
        <BirthName>{`${item.name} ${item.surName}`}</BirthName>
        <BirthdayAge today={isToday}>{`Turns ${year - item.year}`}</BirthdayAge>
      </div>
      <BirthdayDate>{isToday ? 'Today' : item.dateString}</BirthdayDate>
    </BirthdayItemWrap>
  );
};

export default BirthdayItem;
