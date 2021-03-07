import { useCallback, useEffect, useState } from 'react';
import { useModal, useSingleReview } from 'hooks';
import Router from 'next/router';
import routes from 'common/constant/routes';
import * as T from 'types/API';

const useSinglePostModal = (fullReviews: T.lightReviewData[]) => {
  const [originPath, setOriginPath] = useState<string>();
  const [index, setIndex] = useState<number>(0);
  const [showModal, modalHandler] = useModal(false);
  const [
    singleReview,
    fetchSingleReviewResult,
    fetchSingleReview,
  ] = useSingleReview(false);

  useEffect(() => {
    let pathName = '/search/';
    const query = Router.query.search_query;
    if (typeof query === 'string' && query) pathName = pathName + query;
    setOriginPath(pathName);
  }, []);

  const openModal = useCallback(
    (id: string) => async () => {
      window.history.replaceState(null, '', `${routes.POST}/${id}`);
      const idx = fullReviews.findIndex((doc) => doc.docId === id);
      setIndex(idx);
      fetchSingleReview(id);
      modalHandler();
    },
    [fullReviews, showModal]
  );

  const closeModal = useCallback(() => {
    window.history.replaceState(null, '', originPath);
    modalHandler();
  }, [originPath, showModal]);

  const prevHandler = useCallback(() => {
    const prevPostId = fullReviews[index - 1].docId;
    fetchSingleReview(prevPostId);
    setIndex(index - 1);
    window.history.replaceState(null, '', `${routes.POST}/${prevPostId}`);
  }, [fullReviews, index]);

  const nextHandler = useCallback(() => {
    const nextPostId = fullReviews[index + 1].docId;
    fetchSingleReview(nextPostId);
    setIndex(index + 1);
    window.history.replaceState(null, '', `${routes.POST}/${nextPostId}`);
  }, [fullReviews, index]);

  return {
    singleReview,
    fetchSingleReviewResult,
    showModal,
    index,
    openModal,
    closeModal,
    prevHandler,
    nextHandler,
  };
};

export default useSinglePostModal;