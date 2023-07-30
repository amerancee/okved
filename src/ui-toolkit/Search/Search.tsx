import type { ChangeEvent, FocusEvent } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { SearchIcon } from '../../icon-components/SearchIcon.tsx';

type ComponentProps = {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  focused?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
};

export function Search({ focused = false, onFocus, ...props }: ComponentProps) {
  const [focus, setFocus] = useState(focused);

  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(true);
    onFocus?.(e);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setFocus(false);
    onFocus?.(e);
  };

  return (
    <SearchWrapper $focus={focus}>
      <SearchIconStyled />
      <SearchStyled {...props} onFocus={handleFocus} onBlur={handleBlur} />
    </SearchWrapper>
  );
}

export const SearchWrapper = styled.div<{ $focus: boolean }>`
  display: grid;
  grid-template-columns: 16px 1fr;
  align-items: center;
  grid-gap: 8px;
  margin: 0;
  padding: 8px 12px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.colorBorder}`};
  background: ${({ theme }) => theme.colorInput};
  outline: ${({ theme, $focus }) =>
    $focus ? `2px solid ${theme.colorPrimary}` : 'none'};
`;

const SearchIconStyled = styled(SearchIcon)`
  width: 16px;
  height: 16px;
  stroke: ${({ theme }) => theme.colorSecondary};
`;

const SearchStyled = styled.input`
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  margin: 0;
  padding: 0;

  outline: none;
  border: none;
  background: transparent;

  &:focus {
    outline: none;
  }
`;
