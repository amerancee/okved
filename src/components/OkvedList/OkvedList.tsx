import { useEffect } from 'react';
import styled from 'styled-components';
import { useAppStoreSelector } from '../../store/AppStore/hooks/useAppStoreSelector.ts';
import { useAppDispatch } from '../../store/AppStore/hooks/useAppDispatch.ts';
import {
  autoSelectedItemsSelector,
  errorSelector,
  expandedItemsSelector,
  loadingSelector,
  okvedListSelector,
  searchMatchesSelector,
  searchSelector,
  selectedItemsSelector
} from '../../store/AppStore/selectors.ts';
import {
  setData,
  toggleExpandItem,
  addSelectedItem,
  removeSelectedItem,
  setError,
  setLoading
} from '../../store/AppStore/actions.ts';
import { getList } from '../../api/getList.ts';
import { SelectableList } from '../../ui-toolkit/SelectableList/SelectableList';
import { NotFoundData } from '../../ui-toolkit/NotFoundData/NotFoundData';
import { Loader } from '../../ui-toolkit/Loading/Loader.tsx';

export function OkvedList() {
  const dispatch = useAppDispatch();
  const list = useAppStoreSelector(okvedListSelector);
  const error = useAppStoreSelector(errorSelector);
  const loading = useAppStoreSelector(loadingSelector);
  const expandedItems = useAppStoreSelector(expandedItemsSelector);
  const selectedItems = useAppStoreSelector(selectedItemsSelector);
  const autoSelectedItems = useAppStoreSelector(autoSelectedItemsSelector);
  const search = useAppStoreSelector(searchSelector);
  const searchMatches = useAppStoreSelector(searchMatchesSelector);

  const handleToggleExpanded = (code: string) => {
    dispatch(toggleExpandItem(code));
  };

  const handleToggleSelected = (code: string, active: boolean) => {
    if (active) {
      dispatch(addSelectedItem(code));
      return;
    }

    dispatch(removeSelectedItem(code));
  };

  useEffect(() => {
    dispatch(setLoading(true));

    getList()
      .then((list) => {
        dispatch(setData(list));
        dispatch(setError(null));
      })
      .catch((error) => {
        dispatch(setError(error));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, []);

  // console.log('selectedItems = ', selectedItems);
  // console.log('auto = ', autoSelectedItems);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <SelectableList
          list={list}
          expandedItems={expandedItems}
          selectedItems={selectedItems}
          autoSelectedItems={autoSelectedItems}
          search={search}
          searchMatches={searchMatches}
          onExpand={handleToggleExpanded}
          onSelect={handleToggleSelected}
        />
      )}
      {error && (
        <NotFoundData errorMessage={`Не удалось загрузить данные: ${error}`} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.main`
  width: 100%;
`;
