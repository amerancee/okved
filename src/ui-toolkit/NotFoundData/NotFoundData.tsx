import styled from 'styled-components';

type ComponentProps =
  | {
      message: string;
      errorMessage?: string;
    }
  | {
      message?: string;
      errorMessage: string;
    };

export function NotFoundData({
  message = '',
  errorMessage = ''
}: ComponentProps) {
  const isErrorMessage = Boolean(errorMessage);

  return (
    <Wrapper>
      <Message $danger={isErrorMessage}>
        {isErrorMessage ? errorMessage : message}
      </Message>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-gap: 24px;
  margin: 48px 0;
`;

const Message = styled.h2<{ $danger: boolean }>`
  font-size: 24px;
  font-weight: 400;
  text-align: center;
  margin: 0;
  color: ${({ theme, $danger }) =>
    $danger ? theme.colorDanger : theme.colorSecondary};
`;
