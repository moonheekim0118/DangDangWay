import React, { memo } from 'react';
import { colorCode } from 'common/style/color';
import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Title = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.span`
  font-family: 'Do Hyeon', sans-serif;
  font-size: 1.6rem;

  &::before {
    content: '';
    position: absolute;
    display: inline-block;
    top: 0px;
    left: -20px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${colorCode['blue']};
  }

  @media only screen and (max-width: 500px) {
    position: relative;
    top: 0;
    right: 0;
    margin: 20px 0;
  }
`;

export default memo(Title);
