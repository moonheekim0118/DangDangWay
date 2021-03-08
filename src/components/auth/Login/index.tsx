import React, { useEffect, useRef, useCallback } from 'react';
import { checkEmail } from 'util/signUpValidations';
import useApiFetch, {
  REQUEST,
  SUCCESS,
  FAILURE,
} from 'hooks/common/useApiFetch';
import { useNotificationDispatch } from 'context/Notification';
import { showError } from 'action';
import { signIn } from 'api/sign';
import { NOT_FULL_INFO_ERROR } from 'common/constant/string';
import { inputRef, defaultRef } from 'types/Input';
import { saveBtnStyle } from 'common/style/baseStyle';
import { MENU_LOGIN_TITLE } from 'common/constant/string';
import { inputId } from 'common/constant/input';
import { Input, Button } from 'atoms';
import routes from 'common/constant/routes';
import Router from 'next/router';
import GoogleLoginButton from 'components/common/GoogleLoginButton';
import * as S from '../style';

const Login = (): React.ReactElement => {
  const dispatch = useNotificationDispatch();
  const emailRef = useRef<inputRef>(defaultRef);
  const passwordRef = useRef<inputRef>(defaultRef);
  const [fetchResult, fetchDispatch, setDefault] = useApiFetch(signIn);

  useEffect(() => {
    switch (fetchResult.type) {
      case SUCCESS:
        Router.push(routes.HOME);
        break;
      case FAILURE:
        dispatch(showError(fetchResult.error));
        setDefault();
    }
  }, [fetchResult]);

  /** submit handler */
  const SignInHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      if (email.length === 0 || password.length === 0 || !checkEmail(email)) {
        return dispatch(showError(NOT_FULL_INFO_ERROR));
      }
      fetchDispatch({ type: REQUEST, params: [{ email, password }] });
    },
    [emailRef, passwordRef]
  );

  return (
    <S.Form>
      <S.Title>{MENU_LOGIN_TITLE}</S.Title>
      <Input type="email" id={inputId.EMAIL} required={true} ref={emailRef} />
      <Input
        type="password"
        id={inputId.PASSWORD}
        ref={passwordRef}
        required={true}
      />
      <S.ButtonContainer>
        <Button
          className="loginBtn"
          css={saveBtnStyle}
          type="submit"
          onClick={SignInHandler}>
          {MENU_LOGIN_TITLE}
        </Button>
        <GoogleLoginButton />
      </S.ButtonContainer>
    </S.Form>
  );
};

export default Login;
