import React, { useCallback } from 'react';
import { SinglePost, PostList } from 'components/Post';
import { useSingleReview } from 'hooks';
import { Anchor } from 'atoms';
import { getReviewsFirst } from 'api/review';
import * as S from 'globalStyle/PostStyle';
import Loading from 'components/Loading';
import Router from 'next/router';

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export async function getStaticProps() {
  return {
    props: {
      reviews: await getReviewsFirst(),
    },
  };
}

const singlePost = ({ reviews }) => {
  const [singleReview, fetchResult] = useSingleReview(true);

  const openSinglePost = useCallback(
    (id: string) => () => {
      Router.push(`/search/${id}`);
    },
    []
  );

  return fetchResult.error ? (
    <span>{fetchResult.error}</span>
  ) : (
    <>
      <S.SinglePostContainer isModal={false}>
        {singleReview ? <SinglePost data={singleReview} /> : <Loading />}
      </S.SinglePostContainer>
      <Anchor fontsize={1} path="/search">
        산책로 리뷰 더 보기
      </Anchor>
      <PostList
        reviewData={reviews.data.reviews}
        openSinglePost={openSinglePost}
      />
    </>
  );
};

export default singlePost;
