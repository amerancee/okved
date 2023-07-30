import { ListStructure } from '../api/api.types.ts';

export function iterateStructure(
  structure: ListStructure[],
  callback: (item: ListStructure) => void
) {
  for (const item of structure) {
    callback(item);

    if (item.children) {
      iterateStructure(item.children, callback);
    }
  }
}
