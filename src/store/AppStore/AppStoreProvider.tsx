import { createContext, PropsWithChildren, useReducer } from 'react';
import type { AppDispatchContextType, AppState } from './AppStore.types.ts';
import { reducer } from './reducer.ts';

const initialState: AppState = {
  okvedList: [],
  error: null,
  loading: false,
  search: '',
  searchMatches: [],
  expandedItems: [],
  selectedItems: [],
  autoSelectedItems: []
};

export const AppStoreContext = createContext<AppState>(initialState);
export const AppDispatchContext = createContext<AppDispatchContextType>(
  () => {}
);

export function AppStoreProvider({ children }: PropsWithChildren) {
  const [store, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStoreContext.Provider value={store}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStoreContext.Provider>
  );
}
