import type { ReactNode } from 'react';
import { Fragment } from 'react';
import styled from 'styled-components';
import { GlobalConstants } from '../../constants/global.ts';

function getTitleTagByLevel(level: number) {
  switch (level) {
    case 0:
      return 'h2';
    case 1:
      return 'h3';
    case 2:
      return 'h4';
    case 3:
      return 'h5';
    case 4:
    default:
      return 'h6';
  }
}

function renderTitle({
  title,
  level,
  code,
  search
}: {
  title: string;
  level: number;
  code: string;
  search: string;
}) {
  const codeText = getCodeText(code, level);

  if (!search) {
    return <TitleBody title={title} codeText={codeText} level={level} />;
  }

  const fragments = getTitleFragments(title, search);

  return <TitleBody title={fragments} codeText={codeText} level={level} />;
}

function getCodeText(code: string, level: number) {
  if (!level) {
    return `Группа ${code.toUpperCase()}`;
  }

  const codeParts = code.split(GlobalConstants.okvedCodeSeparatorSymbol);

  codeParts.shift();

  return codeParts.join(GlobalConstants.okvedCodeSeparatorSymbol);
}

function getTitleFragments(title: string, search: string) {
  const searchTrimmed = search.trim();
  const titleLowerCase = title.toLowerCase();
  const searchLowerCase = searchTrimmed.toLowerCase();
  const searchLength = searchLowerCase.length;

  let startIndex = 0;
  const endIndex = titleLowerCase.length;
  const fragments: ReactNode[] = [];

  while (startIndex < endIndex) {
    const matchIndex = titleLowerCase.indexOf(searchLowerCase, startIndex);

    if (matchIndex === -1) {
      fragments.push(
        <Fragment key={startIndex}>{title.slice(startIndex)}</Fragment>
      );

      break;
    }

    const highlight = title.slice(matchIndex, matchIndex + searchLength);

    fragments.push(
      <Fragment key={startIndex}>
        {title.slice(startIndex, matchIndex)}
        <Highlight>{highlight}</Highlight>
      </Fragment>
    );

    startIndex = matchIndex + searchLength;
  }

  return fragments;
}

const TitleBody = ({
  title,
  codeText,
  level
}: {
  title: ReactNode;
  codeText: string;
  level: number;
}) => {
  return (
    <TextWrapper>
      <StrongText $level={level}>{codeText}</StrongText>
      <span>{title}</span>
    </TextWrapper>
  );
};

const TextWrapper = styled.span`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 8px;
`;

const StrongText = styled.strong<{ $level: number }>`
  width: ${({ $level }) => ($level ? 'auto' : '80px')};
`;

const Highlight = styled.span`
  background: ${({ theme }) => theme.colorHighlight};
`;

export const SelectableListHelper = {
  getTitleTagByLevel,
  renderTitle
};
