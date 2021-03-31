import React from 'react';
import { PostBookMark } from 'components/Post';
import { CommentSection } from 'components/Comment';
import { ReviewData } from 'types/API';
import { NavigationInfo } from 'types/Navigation';
import { useLoginInfoState } from 'context/LoginInfo';
import { Author, ControllerBtn } from 'components/UI';
import {
  PARKING_LOT_CAPTION,
  OFFLEASH_CAPTION,
  RECOMMENDATION_CAPTION,
  UPDATE_BUTTON_CAPTION,
  DELETE_BUTTON_CAPTION,
} from 'common/constant/string';
import { ImageSlider } from 'components/Image';
import { BasicMap } from 'components/Map';
import routes from 'common/constant/routes';
import * as S from './style';

interface Props {
  /** single Review Data */
  data: ReviewData;
  /** Navigation info */
  NavigationInfo?: NavigationInfo;
  /** remove Handler */
  removeHanlder?: (id: string) => (e: React.MouseEvent) => void;
}

const SinglePost = ({
  data,
  NavigationInfo,
  removeHanlder,
}: Props): React.ReactElement => {
  const { userId } = useLoginInfoState();
  return (
    <>
      <S.Container>
        <S.ContentsContainer>
          <PostBookMark postId={data.docId} />
          <S.PlaceName>{data.placeInfo.place_name}</S.PlaceName>
          <S.PlaceDetail>{data.placeInfo.address_name}</S.PlaceDetail>
          <BasicMap coordX={data.placeInfo.x} coordY={data.placeInfo.y} />
          <S.InfoContainer>
            <S.Info>
              {PARKING_LOT_CAPTION}
              {data.hasParkingLot}
            </S.Info>
            <S.Info>
              {OFFLEASH_CAPTION}
              {data.hasOffLeash}
            </S.Info>
            <S.Info>
              {RECOMMENDATION_CAPTION}
              {data.recommendation}
            </S.Info>
          </S.InfoContainer>
        </S.ContentsContainer>
        <S.ContentsContainer>
          <Author
            userData={data.userData}
            createdAt={data.createdAt}
            size="medium"
            menuList={
              userId === data.userId
                ? [
                    {
                      title: UPDATE_BUTTON_CAPTION,
                      href: `${routes.UPDATE_POST}/${data.docId}`,
                    },
                    {
                      title: DELETE_BUTTON_CAPTION,
                      onClick: removeHanlder && removeHanlder(data.docId),
                    },
                  ]
                : undefined
            }
          />
          {data.imageList.length > 0 && (
            <ImageSlider imageList={data.imageList} />
          )}
          <S.FreeCommentContainer>{data.freeText}</S.FreeCommentContainer>
        </S.ContentsContainer>
        <S.ContentsContainer>
          <CommentSection userId={userId} postId={data.docId} />
        </S.ContentsContainer>
      </S.Container>
      {NavigationInfo && <ControllerBtn {...NavigationInfo} />}
    </>
  );
};

export default SinglePost;
