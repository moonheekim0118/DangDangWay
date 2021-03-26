import { useEffect, useState, useCallback } from 'react';
import { useApiFetch } from 'hooks';
import { REQUEST, SUCCESS, FAILURE } from 'hooks/common/useApiFetch';
import { REVIEW_DATA_LIMIT } from 'common/constant/number';
import { removeReview } from 'api/review';
import { useRouter } from 'next/router';
import searchByKeyword from 'api/search';
import cacheProto from 'util/cache';
import * as T from 'types/API';

interface DataType {
  reviews: T.LightReviewData[];
  hasMore: boolean;
}

const CACHE = new cacheProto<DataType>();

const useQueryReviews = () => {
  const router = useRouter();
  const query = router.query.search_query as string;
  const [allReviews, setAllReviews] = useState<T.LightReviewData[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const [getReviewsResult, getReviewsFetch, getReviewsSetDefault] = useApiFetch<
    T.LightReviewData[]
  >(searchByKeyword);

  const [
    removeReviewResult,
    removeReviewFetch,
    removeReviewSetDefault,
  ] = useApiFetch<string>(removeReview);

  useEffect(() => {
    const cachedData = CACHE.get(query);
    if (CACHE.has(query) && cachedData) {
      setAllReviews(cachedData.reviews);
      setHasMore(cachedData.hasMore);
    } else {
      getReviewsFetch({ type: REQUEST, params: [query] });
    }
  }, []);

  useEffect(() => {
    switch (getReviewsResult.type) {
      case SUCCESS:
        if (getReviewsResult.data) {
          const newReviews = getReviewsResult.data;
          const updatedReviews = allReviews.concat(newReviews);
          const hasMore = newReviews.length === REVIEW_DATA_LIMIT;
          setAllReviews(updatedReviews);
          setHasMore(newReviews.length === REVIEW_DATA_LIMIT);
          CACHE.set(query, {
            reviews: updatedReviews,
            hasMore,
          });
        }
        getReviewsSetDefault();
        break;
      case FAILURE:
    }
  }, [getReviewsResult, allReviews]);

  useEffect(() => {
    switch (removeReviewResult.type) {
      case SUCCESS:
        const deletedId = removeReviewResult.data;
        const newReviews = allReviews.filter((v) => v.docId !== deletedId);
        setAllReviews(newReviews);
        removeReviewSetDefault();
        const cachedData = CACHE.get(query);
        CACHE.set(query, {
          ...cachedData,
          reviews: newReviews,
        } as DataType);
        break;
      case FAILURE:
    }
  }, [removeReviewResult, allReviews]);

  const fetchReviewHandler = useCallback(() => {
    if (hasMore && query) {
      getReviewsFetch({ type: REQUEST, params: [query] });
    }
  }, [allReviews, hasMore, query]);

  const fetchRemoveHandler = useCallback((id: string) => {
    removeReviewFetch({ type: REQUEST, params: [id] });
  }, []);

  return [
    allReviews,
    fetchReviewHandler,
    fetchRemoveHandler,
    getReviewsResult.type,
    hasMore,
    query,
  ] as const;
};

export default useQueryReviews;
