import type { AppState } from './AppStore.types.ts';

export const okvedListSelector = (state: AppState) => state.okvedList;
export const errorSelector = (state: AppState) => state.error;
export const loadingSelector = (state: AppState) => state.loading;
export const searchSelector = (state: AppState) => state.search;
export const searchMatchesSelector = (state: AppState) => state.searchMatches;
export const expandedItemsSelector = (state: AppState) => state.expandedItems;
export const selectedItemsSelector = (state: AppState) => state.selectedItems;
export const autoSelectedItemsSelector = (state: AppState) =>
  state.autoSelectedItems;
