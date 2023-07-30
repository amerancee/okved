import { useContext } from 'react';
import { AppStoreContext } from '../AppStoreProvider.tsx';
import type { AppSelectorType } from '../AppStore.types.ts';

export function useAppStoreSelector<D>(selector: AppSelectorType<D>) {
  const state = useContext(AppStoreContext);

  return selector(state);
}
