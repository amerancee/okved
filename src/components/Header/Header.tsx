import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Search } from '../../ui-toolkit/Search/Search.tsx';
import { useAppDispatch } from '../../store/AppStore/hooks/useAppDispatch.ts';
import { useAppStoreSelector } from '../../store/AppStore/hooks/useAppStoreSelector.ts';
import {
  errorSelector,
  searchSelector
} from '../../store/AppStore/selectors.ts';
import { setLoading, setSearch } from '../../store/AppStore/actions.ts';
import { useDebounce } from '../../hooks/useDebounce.ts';

export function Header() {
  const dispatch = useAppDispatch();
  const search = useAppStoreSelector(searchSelector);
  const error = useAppStoreSelector(errorSelector);

  const [searchValue, setSearchValue] = useState(search);
  const { debouncedValue: debouncedSearch, loading } = useDebounce(searchValue);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  useEffect(() => {
    dispatch(setSearch(debouncedSearch));
  }, [debouncedSearch]);

  useEffect(() => {
    dispatch(setLoading(loading));
  }, [loading]);

  return (
    <HeaderStyled>
      <Title>Коды ОКВЭД</Title>
      <Search
        value={searchValue}
        placeholder="Поиск"
        disabled={Boolean(error)}
        onChange={handleSearch}
      />
    </HeaderStyled>
  );
}

const Title = styled.h1`
  text-align: center;
  font-size: 24px;
  margin: 0;
`;

const HeaderStyled = styled.header`
  display: grid;
  grid-template-rows: 24px 1fr;
  align-items: center;
  grid-gap: 24px;
  width: 100%;
  margin: 24px 0;
`;
