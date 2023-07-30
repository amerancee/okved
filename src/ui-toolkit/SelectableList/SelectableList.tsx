import { Fragment } from 'react';
import styled from 'styled-components';
import type { ListStructure } from '../../api/api.types.ts';
import { ListItem } from './components/ListItem.tsx';
import { ListItemHeader } from './components/ListItemHeader.tsx';
import { NotFoundData } from '../NotFoundData/NotFoundData.tsx';

type ComponentProps = {
  list: ListStructure[];
  expandedItems: string[];
  selectedItems: string[];
  autoSelectedItems: string[];
  search: string;
  searchMatches: string[];
  onExpand: (code: string) => void;
  onSelect: (code: string, active: boolean) => void;
};

export function SelectableList({
  list = [],
  expandedItems,
  selectedItems,
  autoSelectedItems,
  search,
  searchMatches,
  onExpand,
  onSelect
}: ComponentProps) {
  const hasSearch = Boolean(search.length);
  const hasSearchData = hasSearch && Boolean(searchMatches.length);
  const showList = hasSearchData || !hasSearch;

  const renderList = (list: ListStructure[], level: number = 0) => {
    return list.map(({ code, title, children }) => {
      const hasChildren = !!children?.length;
      const isExpanded = hasSearchData
        ? searchMatches.includes(code)
        : expandedItems.includes(code);
      const showItem = !hasSearch || searchMatches.includes(code);
      const showChildren = hasChildren && isExpanded;

      return (
        <Fragment key={code}>
          {showItem && (
            <ListItem>
              <ListItemHeader
                search={search}
                level={level}
                title={title}
                code={code}
                canExpanded={Boolean(hasChildren)}
                isExpanded={isExpanded}
                selectedItems={selectedItems}
                autoSelectedItems={autoSelectedItems}
                onExpand={onExpand}
                onSelect={onSelect}
              />
              <Divider />
              {showChildren && (
                <ListStyled>{renderList(children, level + 1)}</ListStyled>
              )}
            </ListItem>
          )}
        </Fragment>
      );
    });
  };

  return (
    <Wrapper $showList={showList}>
      {showList ? (
        <ListStyled>{renderList(list)}</ListStyled>
      ) : (
        <NotFoundData message={`По запросу "${search}" ничего не найдено :(`} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $showList: boolean }>`
  width: ${({ $showList }) => ($showList ? 'calc(100% - 2px)' : '100%')};
  border-top: ${({ theme, $showList }) =>
    $showList ? `1px solid ${theme.colorBorder}` : 'none'};
  border-right: ${({ theme, $showList }) =>
    $showList ? `1px solid ${theme.colorBorder}` : 'none'};
  border-left: ${({ theme, $showList }) =>
    $showList ? `1px solid ${theme.colorBorder}` : 'none'};
`;

const ListStyled = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export const Divider = styled.div`
  width: 100%;
  height: 0;
  border-bottom: ${({ theme }) => `1px solid ${theme.colorBorder}`};
`;
