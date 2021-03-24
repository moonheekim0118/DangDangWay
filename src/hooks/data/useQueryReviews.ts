import { useEffect, useState, useCallback } from 'react';
import { useApiFetch } from 'hooks';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { removeReview } from 'api/review';
import searchByKeyword from 'api/search';
import { useRouter } from 'next/router';
import * as T from 'types/API';

const useQueryReviews = () => {
  const router = useRouter();
  const query = router.query.search_query;
  const [allReviews, setAllReviews] = useState<T.LightReviewData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch<
    T.LightReviewData[]
  >(searchByKeyword);

  const [
    fetchRemoveResult,
    fetchRemoveDispatch,
    setRemoveDefault,
  ] = useApiFetch<string>(removeReview);

  useEffect(() => {
    if (typeof query === 'string') {
      fetchDispatch({ type: REQUEST, params: [query] });
    }
  }, []);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        if (fetchResult.data) {
          const newReviews = fetchResult.data;
          setAllReviews(allReviews.concat(newReviews));
          setHasMore(newReviews.length === REVIEW_DATA_LIMIT);
        }
        setDefault();
        break;
      case FAILURE:
    }
  }, [fetchResult, allReviews]);

  useEffect(() => {
    switch (fetchRemoveResult.type) {
      case SUCCESS:
        const deletedId = fetchRemoveResult.data;
        const newReviews = allReviews.filter((v) => v.docId !== deletedId);
        setAllReviews(newReviews);
        setRemoveDefault();
        break;
      case FAILURE:
    }
  }, [fetchRemoveResult, allReviews]);

  const fetchReview = useCallback(() => {
    if (hasMore && query) {
      fetchDispatch({ type: REQUEST, params: [query] });
    }
  }, [allReviews, hasMore, query]);

  const fetchRemove = useCallback((id: string) => {
    fetchRemoveDispatch({ type: REQUEST, params: [id] });
  }, []);

  return [
    allReviews,
    fetchReview,
    fetchRemove,
    fetchResult,
    hasMore,
    query,
  ] as const;
};

export default useQueryReviews;
