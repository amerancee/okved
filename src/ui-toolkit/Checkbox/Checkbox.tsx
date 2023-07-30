import styled from 'styled-components';
import { memo } from 'react';
import { CheckIcon } from '../../icon-components/CheckIcon.tsx';

type ComponentProps = {
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
};

export const Checkbox = memo(
  ({ checked, disabled, onChange, ...props }: ComponentProps) => {
    const handleCheck = () => {
      if (!disabled) {
        onChange(!checked);
      }
    };

    return (
      <CheckboxWrapper onClick={handleCheck}>
        <HiddenCheckbox {...props} checked={checked} onChange={() => {}} />
        <StyledCheckbox
          {...props}
          $checked={checked}
          $disabled={Boolean(disabled)}
        >
          <IconStyled />
        </StyledCheckbox>
      </CheckboxWrapper>
    );
  }
);

export const CheckboxWrapper = styled.div`
  display: inline-block;
  position: relative;
  cursor: pointer;
`;

export const IconStyled = styled(CheckIcon)`
  width: 16px;
  height: 16px;
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  outline: none;
  border: none;
  width: 0;
  height: 0;
  appearance: none;
  z-index: -1;
`;

export const StyledCheckbox = styled.div<{
  $checked: boolean;
  $disabled: boolean;
}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  transition: all 150ms;
  border: none;
  border-radius: 50%;
  background: ${({ theme, $checked, $disabled }) =>
    $disabled
      ? theme.colorDisabled
      : $checked
      ? theme.colorLight
      : theme.colorWhite};
  outline: ${({ theme, $checked, $disabled }) => {
    const outlineParams = '2px solid';

    if ($checked) {
      return `${outlineParams} ${
        $disabled ? theme.colorDisabled : theme.colorLight
      }`;
    }

    return `${outlineParams} ${theme.colorDisabled}`;
  }};

  ${HiddenCheckbox}:focus + & {
    box-shadow: ${({ theme }) => `0 0 0 3px ${theme.colorFocus}`};
  }

  ${IconStyled} {
    stroke: ${({ theme, $disabled }) =>
      $disabled ? theme.colorSecondary : theme.colorPrimary};
    visibility: ${({ $checked }) => ($checked ? 'visible' : 'hidden')};
  }
`;
