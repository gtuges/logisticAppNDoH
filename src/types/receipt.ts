export interface Receipt {
  durationMin: number;
  receivingOfficer: string;
  receivingOfficerDesignation: string;
  receivingOfficerPhone: string;
  transportModes: number[];
  podNumber: string;
  isPodAttached: boolean;
  isPhoNotified: boolean;
  totalWeightKg: number;
}