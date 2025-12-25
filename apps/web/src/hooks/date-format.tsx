import { format } from "date-fns";

type ParameterDate = Parameters<typeof format>[0];

export const useDateFormatter = () => {
  return (date: ParameterDate, formatString: string) => {
    return format(date, formatString);
  };
};
