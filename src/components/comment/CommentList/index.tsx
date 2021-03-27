import React from 'react';
import { Loading, DropDown, Author, Button, Icon } from 'components/ui';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import {
  EMPTY_COMMENT_TITLE,
  DELETE_BUTTON_CAPTION,
} from 'common/constant/string';
import * as T from 'types/API';
import * as S from './style';

interface Props {
  /** fetch more comments handler */
  getMoreCommentsHandler: () => void;
  /** remove comment from list handler */
  removeCommentHandler: (id: string) => () => void;
  /** comments list to render */
  comments: T.CommentData[];
  /** to check if comment writer and logged-in user is same user  */
  userId?: string;
  /** to check if we can load more comments */
  hasMore: boolean;
  /** fetch status */
  isLoading: boolean;
}

const CommentList = ({
  getMoreCommentsHandler,
  removeCommentHandler,
  comments,
  userId,
  hasMore,
  isLoading,
}: Props): React.ReactElement => {
  return (
    <S.Container>
      <S.List>
        {comments.length > 0 &&
          comments.map((v) => (
            <S.CommentCard key={v.docId}>
              <Author userData={v.userData} size="small">
                {v.userId === userId && (
                  <DropDown
                    menuList={[
                      {
                        title: DELETE_BUTTON_CAPTION,
                        onClick: removeCommentHandler(v.docId),
                      },
                    ]}
                  />
                )}
              </Author>
              <S.CommentContents>{v.contents}</S.CommentContents>
            </S.CommentCard>
          ))}
        {isLoading ? (
          <S.LoadingContainer>
            <Loading size="medium" />
          </S.LoadingContainer>
        ) : (
          <>
            {hasMore ? (
              <Button
                size="large"
                width="100%"
                onClick={getMoreCommentsHandler}>
                <Icon
                  icon={faPlusCircle}
                  size="large"
                  style={S.moreIconStyle}
                />
              </Button>
            ) : (
              comments.length === 0 && <span>{EMPTY_COMMENT_TITLE}</span>
            )}
          </>
        )}
      </S.List>
    </S.Container>
  );
};

export default CommentList;
