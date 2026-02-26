/**
 * Options for multi-select filter variant.
 */
export type TFilterMultiSelectOptions = {
  data: {
    value: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
  }[];
};

/**
 * Options for single-select filter variant.
 */
export type TFilterSingleSelectOptions = {
  data: {
    value: string;
    label: string;
    count?: number;
    icon?: React.ReactNode;
  }[];
};

/**
 * Options for number range filter variant.
 */
export type TFilterNumberRangeOptions = {
  min: number;
  max: number;
  step?: number;
  minRange?: number;
  suffix?: string;
};
