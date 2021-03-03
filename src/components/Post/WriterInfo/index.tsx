import React from 'react';
import { Avatar } from 'atoms';
import { userContents } from 'types/API';
import { colorCode } from 'common/style/color';
import formatDate from 'util/formatDate';
import styled from '@emotion/styled';
interface Props {
  userData: userContents;
  createdAt: number;
}

const WriterInfo = ({ userData, createdAt }: Props) => {
  return (
    <Container>
      <Avatar imageUrl={userData.profilePic} size={'normal'} />
      <Info>
        <Nickname>{userData.nickname}</Nickname>
        <TimeStamp>{formatDate(createdAt)}</TimeStamp>
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nickname = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
`;

const TimeStamp = styled.span`
  color: ${colorCode['dark-gray']};
`;

export default WriterInfo;
