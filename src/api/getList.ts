import type { ListStructure } from './api.types.ts';

export async function getList(): Promise<ListStructure[]> {
  const res = await fetch('src/api/data.json');

  return await res.json();
}
