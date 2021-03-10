import React, { useCallback } from 'react';
import {
  useUser,
  useQueryReviews,
  useInfiniteScroll,
  useSinglePostModal,
} from 'hooks';
import { WriteButton, PostList, SinglePost } from 'components/post';
import { REQUEST } from 'hooks/common/useApiFetch';
import * as S from 'common/style/post';
import Loading from 'components/ui/Loading';
import Modal from 'components/ui/Modal';

const SearchResult = () => {
  const { user } = useUser();
  const [
    allReviews,
    fetchReview,
    fetchRemove,
    fetchResult,
    hasMore,
    query,
  ] = useQueryReviews();
  const observerTarget = useInfiniteScroll({
    deps: [hasMore],
    fetcher: fetchReview,
  });
  const modalDatas = useSinglePostModal(allReviews);

  const removeHanlder = useCallback(
    (id: string) => () => {
      modalDatas.closeModal();
      fetchRemove(id);
    },
    []
  );

  return (
    <>
      <PostList
        searchKeyword={query?.toString()}
        reviewData={allReviews}
        openSinglePost={modalDatas.openModal}
      />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal
        showModal={modalDatas.showModal}
        modalHandler={modalDatas.closeModal}>
        {modalDatas.singleReview ? (
          <SinglePost
            isModal={true}
            data={modalDatas.singleReview}
            NavigationInfo={{
              hasPrev: modalDatas.index > 0,
              hasNext: modalDatas.index < allReviews.length - 1,
              prevHandler: modalDatas.prevHandler,
              nextHandler: modalDatas.nextHandler,
            }}
            removeHanlder={removeHanlder}
          />
        ) : (
          <Loading />
        )}
      </Modal>
      <div ref={observerTarget}>
        {fetchResult.type === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchResult;
