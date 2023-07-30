import type { Dispatch } from 'react';
import type { ListStructure } from '../../api/api.types.ts';
import {
  AddSelectedItemAction,
  RemoveSelectedItemAction,
  SetDataAction,
  SetErrorAction,
  SetLoadingAction,
  SetSearchAction,
  ToggleExpandItemAction
} from './actions.ts';

export type AppState = {
  okvedList: ListStructure[];
  error: string | null;
  loading: boolean;
  search: string;
  searchMatches: string[];
  expandedItems: string[];
  selectedItems: string[];
  autoSelectedItems: string[];
};

export type AppSelectorType<D> = (state: AppState) => D;

export type AppDispatchContextType = Dispatch<AppActionType>;

export type AppActionType =
  | SetDataAction
  | SetErrorAction
  | SetLoadingAction
  | SetSearchAction
  | ToggleExpandItemAction
  | AddSelectedItemAction
  | RemoveSelectedItemAction;
