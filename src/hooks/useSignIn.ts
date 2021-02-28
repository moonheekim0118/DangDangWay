import { useCallback } from 'react';
import { checkEmail } from 'util/signUpValidations';
import { useInput } from 'hooks';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import api from 'api';
import Router from 'next/router';

/** sign in logics */
const useSignIn = () => {
  const dispatch = useNotificationDispatch();

  /** email */
  const [email, emailChangeHandler] = useInput();

  /** password */
  const [password, PasswordChangeHandler] = useInput();

  /** submit handler */
  const SignInHandler = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (email.length === 0 || password.length === 0 || !checkEmail(email)) {
        return dispatch(showError('정보를 올바르게 입력해주세요'));
      }
      const response = await api.signIn({ email, password });
      if (response.isError) {
        return dispatch(showError(response.error));
      }
      Router.push('/'); // push to index page
    },
    [email, password]
  );

  /** Google sign in handler */
  const GoogleSignInHandler = useCallback(async () => {
    const response = await api.googleSignIn();
    if (response.isError) {
      return dispatch(showError(response.error));
    }
    Router.push('/');
  }, []);

  return {
    email,
    emailChangeHandler,
    password,
    PasswordChangeHandler,
    SignInHandler,
    GoogleSignInHandler,
  };
};

export default useSignIn;
