import { format } from "date-fns";
import { useCallback } from "react";

type ParameterDate = Parameters<typeof format>[0];

export const useDateFormatter = () => {
  return useCallback((date: ParameterDate, formatString: string) => {
    return format(date, formatString);
  }, []);
};
