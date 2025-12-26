export const mergeQueryKey = (queryKey: string, prefixQueryKey?: string) => {
  if (prefixQueryKey) {
    return `${prefixQueryKey}_${queryKey}`;
  }
  return queryKey;
};
