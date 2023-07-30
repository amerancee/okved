import type { AppActionType, AppState } from './AppStore.types.ts';
import { AppStoreHelper } from './AppStore.helper.ts';
import {
  ADD_SELECTED_ITEM,
  REMOVE_SELECTED_ITEM,
  SET_DATA,
  SET_ERROR,
  SET_LOADING,
  SET_SEARCH,
  TOGGLE_EXPAND_ITEM
} from './actionTypes.ts';

export function reducer(state: AppState, action: AppActionType): AppState {
  switch (action.type) {
    case SET_DATA: {
      return {
        ...state,
        ...AppStoreHelper.mergeDataWithLocalStorage(action.payload)
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: AppStoreHelper.toggleError(action.payload)
      };
    }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_SEARCH: {
      return {
        ...state,
        ...AppStoreHelper.getSearchData(state, action.payload)
      };
    }
    case TOGGLE_EXPAND_ITEM: {
      return {
        ...state,
        expandedItems: AppStoreHelper.toggleExpandedItem(
          state.expandedItems,
          action.payload
        )
      };
    }
    case ADD_SELECTED_ITEM: {
      return {
        ...state,
        ...AppStoreHelper.addSelectedItemCode(state, action.payload)
      };
    }
    case REMOVE_SELECTED_ITEM: {
      return {
        ...state,
        ...AppStoreHelper.removeSelectedItemCode(state, action.payload)
      };
    }
    default:
      return state;
  }
}
