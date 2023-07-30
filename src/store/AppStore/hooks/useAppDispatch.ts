import { useContext } from 'react';
import { AppDispatchContext } from '../AppStoreProvider.tsx';

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}
