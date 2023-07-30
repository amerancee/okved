import { useMemo } from 'react';
import styled from 'styled-components';
import { ExpandButton } from './ExpandButton.tsx';
import { Checkbox, CheckboxWrapper } from '../../Checkbox/Checkbox.tsx';
import { GlobalConstants } from '../../../constants/global.ts';
import { SelectableListHelper } from '../SelectableList.helper.tsx';

type ComponentProps = {
  search: string;
  level: number;
  title: string;
  code: string;
  canExpanded: boolean;
  isExpanded: boolean;
  selectedItems: string[];
  autoSelectedItems: string[];
  onExpand: (code: string) => void;
  onSelect: (code: string, active: boolean) => void;
};

export function ListItemHeader({
  search,
  level,
  title,
  code,
  canExpanded,
  isExpanded,
  selectedItems,
  autoSelectedItems,
  onExpand,
  onSelect
}: ComponentProps) {
  const checked = useMemo(
    () => selectedItems.includes(code),
    [code, selectedItems]
  );

  const disabled = useMemo(
    () => autoSelectedItems.includes(code),
    [code, autoSelectedItems]
  );

  const showSelector = useMemo(
    () => code.split(GlobalConstants.okvedCodeSeparatorSymbol).length !== 1,
    [code]
  );

  const titleTag = useMemo(
    () => SelectableListHelper.getTitleTagByLevel(level),
    [level]
  );

  const titleWithCode = useMemo(() => {
    return SelectableListHelper.renderTitle({
      title,
      level,
      code,
      search
    });
  }, [title, level, code, search]);

  const handleClickExpand = () => onExpand(code);

  const handleSelect = (active: boolean) => onSelect(code, active);

  return (
    <Wrapper $level={level}>
      {showSelector && (
        <Checkbox
          checked={checked}
          disabled={disabled}
          onChange={handleSelect}
        />
      )}
      <TitleWrapper $canExpanded={canExpanded} onClick={handleClickExpand}>
        <Title as={titleTag} $level={level}>
          {titleWithCode}
        </Title>
        {canExpanded && <ExpandButton expanded={isExpanded} />}
      </TitleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  $level?: number;
}>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin: ${({ $level }) => `8px 12px 8px ${$level ? 12 + $level * 24 : 12}px`};

  ${CheckboxWrapper} {
    margin-right: 16px;
  }
`;

const TitleWrapper = styled.div<{ $canExpanded: boolean }>`
  cursor: ${({ $canExpanded }) => ($canExpanded ? 'pointer' : 'default')};
  display: grid;
  grid-template-columns: 1fr 48px;
  grid-gap: 16px;
  align-items: center;
  flex-grow: 1;
`;

const Title = styled.h2<{ $level: number }>`
  font-size: 18px;
  font-weight: ${({ $level }) => ($level ? 300 : 400)};
  line-height: 20px;
  margin: 0;
`;
