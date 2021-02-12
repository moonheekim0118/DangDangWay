import React from 'react';
import Layout from 'components/Layout';
import useSignUp from 'hooks/useSignUp';
import useLoginCheck from 'hooks/useLoginCheck';
import SignUpForm from 'components/Forms/SignUpForm';
import withNotAuth from 'helpers/withNotAuth';
import getAuthentication from 'libs/getAuthentication';
import { GetServerSidePropsContext } from 'next';

export const getServerSideProps = (context: GetServerSidePropsContext) =>
  getAuthentication(context);

const SignUp = (props): React.ReactElement => {
  /** logic */
  const [
    email,
    emailError,
    EmailChangeHandler,
    nickname,
    nicknameError,
    NicknameChangeHandler,
    password,
    passwordError,
    PasswordChangeHandler,
    passwordCheck,
    passwordMatch,
    PasswordCheckChangeHandler,
    SubmitHanlder,
    ErrorMessage,
  ] = useSignUp();

  // change isLoggedIn state by props authenticated
  useLoginCheck(props.authenticated);

  return (
    <Layout>
      <SignUpForm
        email={email}
        emailError={emailError}
        EmailChangeHandler={EmailChangeHandler}
        nickname={nickname}
        nicknameError={nicknameError}
        NicknameChangeHandler={NicknameChangeHandler}
        password={password}
        passwordError={passwordError}
        PasswordChangeHandler={PasswordChangeHandler}
        passwordCheck={passwordCheck}
        passwordMatch={passwordMatch}
        PasswordCheckChangeHandler={PasswordCheckChangeHandler}
        SubmitHanlder={SubmitHanlder}
        ErrorMessage={ErrorMessage}
      />
    </Layout>
  );
};

export default withNotAuth(SignUp);
