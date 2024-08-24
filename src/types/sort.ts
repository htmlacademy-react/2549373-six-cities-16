import { SORT_OPTIONS, SortOptionValue } from '../const';

export type SortOption = typeof SORT_OPTIONS[number];
export type SortOptionValueType = (typeof SortOptionValue)[keyof typeof SortOptionValue];
