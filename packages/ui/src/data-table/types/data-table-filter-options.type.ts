export type FilterMultiSelectOptions = {
  data: {
    value: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
  }[];
};

export type FilterSingleSelectOptions = {
  data: {
    value: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
  }[];
};

export type FilterNumberRangeOptions = {
  min: number;
  max: number;
  step?: number;
  minRange?: number;
  suffix?: string;
};
