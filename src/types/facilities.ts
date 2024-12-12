export interface Region {
  id: number;
  name: string;
  description: string;
}

export interface Province {
  id: number;
  name: string;
  regionId: number;
}

export interface District {
  id: number;
  provinceId: number;
  name: string;
}

export interface FacilityType {
  id: number;
  name: string;
  description: string;
}

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface Facility {
  id: number;
  description: string;
  facilityTypeId: number;
  provinceId: number;
  districtId: number;
  regionId: number;
  geoCoordinates: GeoCoordinates;
}

// Mock data for dropdowns
export const regions: Region[] = [
  { id: 1, name: 'Highlands', description: 'Highland region of Papua New Guinea' },
  { id: 2, name: 'Momase', description: 'Northern coastal region' },
  { id: 3, name: 'Southern', description: 'Southern region including Port Moresby' },
  { id: 4, name: 'New Guinea Islands', description: 'Island regions' }
];

export const facilityTypes: FacilityType[] = [
  { id: 1, name: 'Medical stores', description: 'Central medical supply storage facilities' },
  { id: 2, name: 'Health Center', description: 'Primary healthcare facilities' },
  { id: 3, name: 'Sub Health Center', description: 'Secondary healthcare facilities' },
  { id: 4, name: 'Hospital', description: 'Full-service medical facilities' },
  { id: 5, name: 'Medicinal Store', description: 'Pharmaceutical storage and distribution' }
];

// Initial facilities data
export const initialFacilities: Facility[] = [
  {
    id: 1,
    description: 'AMS LAE',
    facilityTypeId: 1,
    provinceId: 5, // Morobe Province
    districtId: 5, // Lae District
    regionId: 2, // Momase
    geoCoordinates: { latitude: -6.733, longitude: 147.000 }
  },
  {
    id: 2,
    description: 'AMS BADILI',
    facilityTypeId: 1,
    provinceId: 4, // NCD
    districtId: 1,
    regionId: 3, // Southern
    geoCoordinates: { latitude: -9.474, longitude: 147.150 }
  },
  {
    id: 3,
    description: 'AMS MADANG',
    facilityTypeId: 1,
    provinceId: 6, // Madang Province
    districtId: 6,
    regionId: 2, // Momase
    geoCoordinates: { latitude: -5.222, longitude: 145.789 }
  },
  {
    id: 4,
    description: 'AMS KOKOPO',
    facilityTypeId: 1,
    provinceId: 8,
    districtId: 8,
    regionId: 4, // New Guinea Islands
    geoCoordinates: { latitude: -4.352, longitude: 152.263 }
  },
  {
    id: 5,
    description: 'AMS HAGEN',
    facilityTypeId: 1,
    provinceId: 8, // Western Highlands
    districtId: 8,
    regionId: 1, // Highlands
    geoCoordinates: { latitude: -5.857, longitude: 144.233 }
  },
  {
    id: 6,
    description: 'AMS WEWAK',
    facilityTypeId: 1,
    provinceId: 6,
    districtId: 6,
    regionId: 2, // Momase
    geoCoordinates: { latitude: -3.549, longitude: 143.637 }
  },
  {
    id: 7,
    description: 'BOC LAE',
    facilityTypeId: 1,
    provinceId: 5, // Morobe Province
    districtId: 5, // Lae District
    regionId: 2, // Momase
    geoCoordinates: { latitude: -6.733, longitude: 147.000 }
  },
  {
    id: 8,
    description: 'BOC POM',
    facilityTypeId: 1,
    provinceId: 4, // NCD
    districtId: 1,
    regionId: 3, // Southern
    geoCoordinates: { latitude: -9.443, longitude: 147.180 }
  },
  {
    id: 9,
    description: 'BOC HAGEN/KALEX',
    facilityTypeId: 1,
    provinceId: 8, // Western Highlands
    districtId: 8,
    regionId: 1, // Highlands
    geoCoordinates: { latitude: -5.857, longitude: 144.233 }
  },
  {
    id: 10,
    description: 'LD LOGISTICS YARD - LAE',
    facilityTypeId: 1,
    provinceId: 5,
    districtId: 5,
    regionId: 2,
    geoCoordinates: { latitude: -6.733, longitude: 147.000 }
  },
  {
    id: 11,
    description: 'LD LOGISTICS YARD - GOROKA',
    facilityTypeId: 1,
    provinceId: 7,
    districtId: 7,
    regionId: 1,
    geoCoordinates: { latitude: -6.083, longitude: 145.387 }
  },
  {
    id: 12,
    description: 'LD LOGISTICS YARD - WEWAK',
    facilityTypeId: 1,
    provinceId: 6,
    districtId: 6,
    regionId: 2,
    geoCoordinates: { latitude: -3.549, longitude: 143.637 }
  },
  {
    id: 13,
    description: 'LD LOGISTICS YARD - MADANG',
    facilityTypeId: 1,
    provinceId: 6,
    districtId: 6,
    regionId: 2,
    geoCoordinates: { latitude: -5.222, longitude: 145.789 }
  },
  {
    id: 14,
    description: 'PROTOCOL YARD - POM',
    facilityTypeId: 1,
    provinceId: 4,
    districtId: 1,
    regionId: 3,
    geoCoordinates: { latitude: -9.443, longitude: 147.180 }
  },
  {
    id: 15,
    description: 'PROTOCOL YARD - HAGEN',
    facilityTypeId: 1,
    provinceId: 8,
    districtId: 8,
    regionId: 1,
    geoCoordinates: { latitude: -5.857, longitude: 144.233 }
  },
  {
    id: 16,
    description: 'EXPRESS CUSTOMS LIMITED YARD - POM',
    facilityTypeId: 1,
    provinceId: 4,
    districtId: 1,
    regionId: 3,
    geoCoordinates: { latitude: -9.443, longitude: 147.180 }
  },
  {
    id: 17,
    description: 'EXPRESS CUSTOMS LIMITED YARD - LAE',
    facilityTypeId: 1,
    provinceId: 5,
    districtId: 5,
    regionId: 2,
    geoCoordinates: { latitude: -6.733, longitude: 147.000 }
  },
  {
    id: 18,
    description: 'POST PNG YARD - LAE',
    facilityTypeId: 1,
    provinceId: 5,
    districtId: 5,
    regionId: 2,
    geoCoordinates: { latitude: -6.733, longitude: 147.000 }
  },
  {
    id: 19,
    description: 'POST PNG YARD - KOKOPO',
    facilityTypeId: 1,
    provinceId: 8,
    districtId: 8,
    regionId: 4,
    geoCoordinates: { latitude: -4.352, longitude: 152.263 }
  }
];

export const provinces: Province[] = [
  { id: 1, name: 'Western Province', regionId: 3 },
  { id: 2, name: 'Gulf Province', regionId: 3 },
  { id: 3, name: 'Central Province', regionId: 3 },
  { id: 4, name: 'National Capital District', regionId: 3 },
  { id: 5, name: 'Morobe Province', regionId: 2 },
  { id: 6, name: 'Madang Province', regionId: 2 },
  { id: 7, name: 'Eastern Highlands', regionId: 1 },
  { id: 8, name: 'Western Highlands', regionId: 1 }
];

export const districts: District[] = [
  { id: 1, provinceId: 1, name: 'North Fly District' },
  { id: 2, provinceId: 1, name: 'Middle Fly District' },
  { id: 3, provinceId: 2, name: 'Kerema District' },
  { id: 4, provinceId: 2, name: 'Kikori District' },
  { id: 5, provinceId: 5, name: 'Lae District' },
  { id: 6, provinceId: 5, name: 'Markham District' },
  { id: 7, provinceId: 7, name: 'Goroka District' },
  { id: 8, provinceId: 7, name: 'Kainantu District' }
];