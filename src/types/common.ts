export type Status = 'Pending' | 'Processing' | 'Ready' | 'Completed';
export type DeliveryStatus = 'In Transit' | 'Delivered' | 'Scheduled';
export type RegionName = 'Highlands' | 'Momase' | 'Southern' | 'New Guinea Islands';

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}