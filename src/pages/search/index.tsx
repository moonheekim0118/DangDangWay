import React, { useCallback } from 'react';
import { WriteButton, PostList, SinglePost } from 'components/post';
import {
  useUser,
  useAllReviews,
  useIntersectionObserver,
  useSinglePostModal,
} from 'hooks';
import { REQUEST } from 'hooks/common/useApiFetch';
import { Loading, Card } from 'components/ui';
import { Modal } from 'components/ui';
import { ReviewResult } from 'types/API';
import { getReviewsFirst } from 'api/review';

export async function getStaticProps() {
  return {
    props: {
      reviews: await getReviewsFirst(),
    },
  };
}

interface Props {
  reviews: { data: ReviewResult };
}

const SearchMain = ({ reviews }: Props) => {
  const { user } = useUser();
  const [
    allReviews,
    fetchReview,
    fetchRemove,
    fetchResult,
    hasMore,
  ] = useAllReviews({
    initReviews: reviews.data.reviews,
    initLastKey: reviews.data.lastKey,
  });
  const observerTarget = useIntersectionObserver({
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
      <PostList reviewData={allReviews} openSinglePost={modalDatas.openModal} />
      {user && user.isLoggedIn && <WriteButton />}
      <Modal
        showModal={modalDatas.showModal}
        modalHandler={modalDatas.closeModal}>
        <Card
          isModal={true}
          isLoading={modalDatas.fetchSingleReviewResult.type === REQUEST}>
          <SinglePost
            data={modalDatas.singleReview}
            NavigationInfo={{
              hasPrev: modalDatas.index > 0,
              hasNext: modalDatas.index < allReviews.length - 1,
              prevHandler: modalDatas.prevHandler,
              nextHandler: modalDatas.nextHandler,
            }}
            removeHanlder={removeHanlder}
          />
        </Card>
      </Modal>
      <div ref={observerTarget}>
        {fetchResult.type === REQUEST && <Loading />}
      </div>
    </>
  );
};

export default SearchMain;
