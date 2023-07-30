function loadLocalStorageArray<V>(key: string): V[] {
  const valueStringify = localStorage.getItem(key);

  if (!valueStringify) {
    return [];
  }

  const value = JSON.parse(valueStringify);

  if (!Array.isArray(value)) {
    return [];
  }

  return value;
}

function updateLocalStorageData<V>(key: string, value: V[]) {
  const valueStringify = JSON.stringify(value);

  localStorage.setItem(key, valueStringify);
}

export const LocalStorageUtil = {
  loadLocalStorageArray,
  updateLocalStorageData
};
