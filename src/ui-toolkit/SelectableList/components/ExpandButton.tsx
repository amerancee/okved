import styled from 'styled-components';
import { ExpandIcon } from '../../../icon-components/ExpandIcon.tsx';

type ComponentProps = {
  expanded: boolean;
  onClick?: () => void;
};

export function ExpandButton({ expanded, onClick }: ComponentProps) {
  const handleClick = () => onClick?.();

  return (
    <ExpandButtonStyled onClick={handleClick}>
      <ExpandButtonIconWrapper $expanded={expanded}>
        <ExpandIcon />
      </ExpandButtonIconWrapper>
    </ExpandButtonStyled>
  );
}

const ExpandButtonStyled = styled.button`
  cursor: pointer;
  margin: 8px 12px;
  padding: 0;
  border: none;
  background: transparent;
  width: 24px;
  height: 24px;
`;

const ExpandButtonIconWrapper = styled.div<{ $expanded: boolean }>`
  ${({ $expanded }) => !$expanded && 'transform: rotate(-90deg)'};
  transition: transform 150ms ease;
  width: 24px;
  height: 24px;
`;
