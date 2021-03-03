import React from 'react';
import { Icon } from 'atoms';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { DEFAULT_IMAGE_URL } from 'common/constant/images';
import styled from '@emotion/styled';

interface Props {
  /** onClick for this component */
  previewClickHanlder: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** thumNail image */
  thumnail: string | null;
  /** place name to be shown in Preview */
  placeName: string;
}

const Preview = ({ previewClickHanlder, thumnail, placeName }: Props) => {
  return (
    <Post onClick={previewClickHanlder}>
      <Overlay>
        <Description>
          <PlaceName>{placeName}</PlaceName>
          <div>
            <Icon icon={faComment} iconsize={25} /> 12
          </div>
        </Description>
      </Overlay>
      <Image src={thumnail || DEFAULT_IMAGE_URL} />
    </Post>
  );
};

const Post = styled.div`
  width: 300px;
  height: 300px;
  cursor: pointer;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const Overlay = styled.div`
  opacity: 0;
  display: grid;
  place-items: center;
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 2000;

  transition: opacity 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const Description = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const PlaceName = styled.span`
  max-height: 80px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Preview;
