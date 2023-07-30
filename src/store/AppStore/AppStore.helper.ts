import type { ToggleExpandItemPayload } from './actions.ts';
import type { AppState } from './AppStore.types.ts';
import type { ListStructure } from '../../api/api.types.ts';
import { iterateStructure } from '../../utils/iterateStructure.ts';
import { getStructureChildrenByCode } from '../../utils/getStructureChildrenByCode.ts';
import { GlobalConstants } from '../../constants/global.ts';
import { LocalStorageUtil } from '../../utils/localStorageUtil.ts';
import { getUniqueArray } from '../../utils/getUniqueArray.ts';
import { getErrorMessage } from '../../utils/getErrorMessage.ts';

function mergeDataWithLocalStorage(data: ListStructure[]) {
  const selectedItems =
    LocalStorageUtil.loadLocalStorageArray<string>('selectedItems');
  const autoSelectedItems =
    LocalStorageUtil.loadLocalStorageArray<string>('autoSelectedItems');

  const expandedItems = selectedItems.reduce<string[]>((acc, code, index) => {
    const parentCodes = getParentCodes(code);

    parentCodes.pop();

    if (index === 0) {
      return parentCodes;
    }

    return getUniqueArray([...acc, ...parentCodes]);
  }, []);

  return {
    okvedList: data,
    expandedItems,
    selectedItems,
    autoSelectedItems
  };
}

function toggleError(error: unknown) {
  if (error === null) {
    return error;
  }

  return getErrorMessage(error);
}

function toggleExpandedItem(items: string[], payload: ToggleExpandItemPayload) {
  const hasAlreadyItem = items.includes(payload);

  if (hasAlreadyItem) {
    return items.filter((expandedItem) => expandedItem !== payload);
  }

  return items.concat(payload);
}

function addSelectedItemCode(store: AppState, code: string) {
  const { okvedList, selectedItems, autoSelectedItems } = store;

  const newSelectedItems = selectedItems.concat(code);

  const newAutoSelectedItems = autoSelectedItems.concat();

  const addedItem = getStructureChildrenByCode(okvedList, code);

  if (addedItem?.children) {
    iterateStructure(addedItem.children, (item) =>
      newAutoSelectedItems.push(item.code)
    );
  }

  LocalStorageUtil.updateLocalStorageData('selectedItems', newSelectedItems);
  LocalStorageUtil.updateLocalStorageData(
    'autoSelectedItems',
    newAutoSelectedItems
  );

  return {
    selectedItems: newSelectedItems,
    autoSelectedItems: newAutoSelectedItems
  };
}

function removeSelectedItemCode(store: AppState, code: string) {
  const { selectedItems, autoSelectedItems } = store;

  const newSelectedItems = selectedItems.filter((item) => item !== code);
  const newAutoSelectedItems = autoSelectedItems.filter(
    (item) => !item.startsWith(code)
  );

  LocalStorageUtil.updateLocalStorageData('selectedItems', newSelectedItems);
  LocalStorageUtil.updateLocalStorageData(
    'autoSelectedItems',
    newAutoSelectedItems
  );

  return {
    selectedItems: newSelectedItems,
    autoSelectedItems: newAutoSelectedItems
  };
}

function getSearchData(store: AppState, search: string) {
  if (!search.length) {
    return { search, searchMatches: [] };
  }

  const { okvedList } = store;

  const searchMatches: string[] = [];

  iterateStructure(okvedList, (item) => {
    const titleLowerCase = item.title.toLowerCase();
    const searchLowerCase = search.trim().toLowerCase();

    const match = titleLowerCase.includes(searchLowerCase);

    if (match) {
      const parentCodes = getParentCodes(item.code);
      searchMatches.push(...parentCodes);
    }
  });

  return { search, searchMatches: getUniqueArray(searchMatches) };
}

function getParentCodes(code: string) {
  const codeParts = code.split(GlobalConstants.okvedCodeSeparatorSymbol);

  return codeParts.reduce<string[]>((acc, part, index) => {
    if (index === 0) {
      acc.push(part);

      return acc;
    }

    const prevCode = acc[index - 1];
    const newCode = `${prevCode}${GlobalConstants.okvedCodeSeparatorSymbol}${part}`;

    acc.push(newCode);

    return acc;
  }, []);
}

export const AppStoreHelper = {
  mergeDataWithLocalStorage,
  toggleError,
  toggleExpandedItem,
  addSelectedItemCode,
  removeSelectedItemCode,
  getSearchData
};
