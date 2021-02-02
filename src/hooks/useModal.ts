import { useState, useEffect, useCallback } from 'react';

const useModal = (opend) => {
  const [showModal, setShowModal] = useState<boolean>(opend);

  useEffect(() => {
    setShowModal(opend);
  }, [opend]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'; // modal open 시 overflow 감추기
    }
  }, [showModal]);

  const modalHandler = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  return [showModal, modalHandler] as const;
};

export default useModal;