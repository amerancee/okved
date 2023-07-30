import styled from 'styled-components';

type ComponentProps = {
  center?: boolean;
};

export function Loader({ center = true }: ComponentProps) {
  return (
    <Wrapper $center={center}>
      <LoaderStyled />
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $center: boolean }>`
  display: flex;
  align-items: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  margin: 16px;
`;

const LoaderStyled = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  background: transparent;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: ${({ theme }) => `6px solid ${theme.colorPrimary}`};
    border-color: ${({ theme }) =>
      `${theme.colorPrimary} transparent ${theme.colorPrimary} transparent`};
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
