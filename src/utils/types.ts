// @/utils/types.ts

export interface LatLng {
  lat: number;
  lng: number;
}

export interface TimeRange {
  start: string;
  end: string;
}

export interface TimeSlot {
  day: string;
  range: TimeRange[];
}

export interface DayOption {
  value: string;
  label: string;
}

export interface SelectOption {
  value: string;
  label: string;
  original?: any;
}