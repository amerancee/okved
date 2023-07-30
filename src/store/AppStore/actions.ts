import type { ListStructure } from '../../api/api.types.ts';
import {
  SET_DATA,
  SET_ERROR,
  TOGGLE_EXPAND_ITEM,
  ADD_SELECTED_ITEM,
  REMOVE_SELECTED_ITEM,
  SET_SEARCH,
  SET_LOADING
} from './actionTypes.ts';

export const setData = (payload: SetDataPayload): SetDataAction => ({
  type: SET_DATA,
  payload
});

export const setError = (payload: SetErrorPayload): SetErrorAction => ({
  type: SET_ERROR,
  payload
});

export const setLoading = (payload: SetLoadingPayload): SetLoadingAction => ({
  type: SET_LOADING,
  payload
});

export const setSearch = (payload: SetSearchPayload): SetSearchAction => ({
  type: SET_SEARCH,
  payload
});

export const toggleExpandItem = (
  payload: ToggleExpandItemPayload
): ToggleExpandItemAction => ({
  type: TOGGLE_EXPAND_ITEM,
  payload
});

export const addSelectedItem = (
  payload: AddSelectedItemPayload
): AddSelectedItemAction => ({
  type: ADD_SELECTED_ITEM,
  payload
});

export const removeSelectedItem = (
  payload: RemoveSelectedItemPayload
): RemoveSelectedItemAction => ({
  type: REMOVE_SELECTED_ITEM,
  payload
});

export type SetDataPayload = ListStructure[];
export type SetErrorPayload = unknown;
export type SetLoadingPayload = boolean;
export type SetSearchPayload = string;
export type ToggleExpandItemPayload = string;
export type AddSelectedItemPayload = string;
export type RemoveSelectedItemPayload = string;

export type SetDataAction = {
  type: typeof SET_DATA;
  payload: SetDataPayload;
};
export type SetErrorAction = {
  type: typeof SET_ERROR;
  payload: SetErrorPayload;
};
export type SetLoadingAction = {
  type: typeof SET_LOADING;
  payload: SetLoadingPayload;
};
export type SetSearchAction = {
  type: typeof SET_SEARCH;
  payload: SetSearchPayload;
};
export type ToggleExpandItemAction = {
  type: typeof TOGGLE_EXPAND_ITEM;
  payload: ToggleExpandItemPayload;
};
export type AddSelectedItemAction = {
  type: typeof ADD_SELECTED_ITEM;
  payload: AddSelectedItemPayload;
};
export type RemoveSelectedItemAction = {
  type: typeof REMOVE_SELECTED_ITEM;
  payload: RemoveSelectedItemPayload;
};
