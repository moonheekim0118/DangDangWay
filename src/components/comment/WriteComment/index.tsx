import React, {
  forwardRef,
  useImperativeHandle,
  TextareaHTMLAttributes,
  FormEvent,
  useCallback,
} from 'react';
import { COMMENT_PLACEHOLDER } from 'common/constant/string';
import { commentTextLengthCheck } from 'util/reviewTextValidation';
import { useValidation } from 'hooks';
import { InputRef } from 'types/Ref';
import { Button } from 'components/ui';
import * as S from './style';

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  submitComment: () => void;
}

const WriteComment = (
  props: Props,
  ref: React.Ref<InputRef>
): React.ReactElement => {
  const { submitComment, ...rest } = props;
  const { value, error, valueChangeHanlder, setValue } = useValidation({
    validator: commentTextLengthCheck,
  });

  useImperativeHandle(
    ref,
    () => ({
      value,
    }),
    [value]
  );

  const submitHandler = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitComment();
    setValue('');
  }, []);

  return (
    <S.Form onSubmit={submitHandler}>
      <S.TextArea
        cols={1}
        placeholder={COMMENT_PLACEHOLDER}
        value={value}
        onChange={valueChangeHanlder}
        {...rest}
      />
      <S.ButtonContainer>
        <Button
          type="submit"
          theme="primary"
          size="medium"
          width="100px"
          disabled={error}>
          게시
        </Button>
      </S.ButtonContainer>
    </S.Form>
  );
};

export default forwardRef(WriteComment);
