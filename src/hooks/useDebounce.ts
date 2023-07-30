import { useEffect, useState } from 'react';

export function useDebounce<V>(
  value: V,
  delay: number = 500
): { debouncedValue: V; loading: boolean } {
  const [skipEffect, setSkipEffect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [debouncedValue, setDebouncedValue] = useState<V>(value);

  useEffect(() => {
    setSkipEffect(false);
  }, []);

  useEffect(() => {
    if (skipEffect) {
      return;
    }

    if (!loading) {
      setLoading(true);
    }

    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      setLoading(false);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return { debouncedValue, loading };
}
