import React from 'react';
import useInput from '../../hooks/useInput';
import styled from '@emotion/styled';
import Icon from '../../atoms/Icon';
import Span from '../../atoms/Span';
import { colorCode } from '../../model/colorCode';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  color: 'blue' | 'white';
}

const PLACEHOLDER = '지역명을 입력하세요. 예) 강원도 속초시';

const SearchBar = ({ color }: Props) => {
  const [keyword, keywordChangeHanlder] = useInput();

  return (
    <Form>
      <Input
        type="text"
        color={color}
        value={keyword}
        onChange={keywordChangeHanlder}
        placeholder={PLACEHOLDER}
      />
      <IconContainer>
        <Icon
          icon={faSearch}
          iconsize={20}
          color={color === 'blue' ? 'white' : 'blue'}
          rotate={180}
        />
      </IconContainer>
      <SpanContainer>
        <Span
          title="Go"
          color={color === 'blue' ? 'white' : 'blue'}
          fontsize={1}
          cursor="pointer"
        />
      </SpanContainer>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
`;

const SpanContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: -40px;

  @media only screen and (max-width: 780px) {
    right: 10px;
  }
`;

const Input = styled.input<Props>`
  background-color: ${(props) => colorCode[props.color]};
  color: ${(props) =>
    props.color === 'blue' ? colorCode['white'] : colorCode['blue']};
  border: none;
  border-radius: 20px;
  width: 120%;
  padding: 20px 40px;
  font-weight: bold;
  box-shadow: 0px 0px 3px 0px rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
  }

  ::placeholder {
    color: ${(props) =>
      props.color === 'blue' ? colorCode['white'] : colorCode['gray']};
  }

  @media only screen and (max-width: 780px) {
    width: 100%;
  }
`;

export default SearchBar;
