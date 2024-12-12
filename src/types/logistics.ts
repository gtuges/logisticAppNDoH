import { RegionName } from './common';

export interface ContractPeriod {
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface LogisticsCompany {
  id: string;
  name: string;
  region: RegionName;
  contact: string;
  description: string;
  batchCount?: number;
  contractPeriods: ContractPeriod[];
}

// Historical and current logistics companies by region
export const logisticsCompaniesByRegion: Record<RegionName, LogisticsCompany[]> = {
  'Highlands': [
    {
      id: 'HL-LOG-2024',
      name: 'Highlands Logistics Ltd',
      region: 'Highlands',
      contact: '+675 123 4567',
      description: 'Current provider specializing in high-altitude medical supply distribution.',
      batchCount: 15,
      contractPeriods: [
        { startDate: '2024-01-01', endDate: '2024-12-31', isActive: true }
      ]
    },
    {
      id: 'HL-LOG-2023',
      name: 'Mountain Range Transport',
      region: 'Highlands',
      contact: '+675 123 8901',
      description: 'Previous highlands region service provider.',
      batchCount: 156,
      contractPeriods: [
        { startDate: '2023-01-01', endDate: '2023-12-31', isActive: false }
      ]
    }
  ],
  'Momase': [
    {
      id: 'MM-LOG-2024',
      name: 'Momase Transport Services',
      region: 'Momase',
      contact: '+675 234 5678',
      description: 'Current coastal and inland distribution services provider.',
      batchCount: 12,
      contractPeriods: [
        { startDate: '2024-01-01', endDate: '2024-12-31', isActive: true }
      ]
    },
    {
      id: 'MM-LOG-2023',
      name: 'Coastal Logistics PNG',
      region: 'Momase',
      contact: '+675 234 9012',
      description: 'Previous Momase region service provider.',
      batchCount: 143,
      contractPeriods: [
        { startDate: '2023-01-01', endDate: '2023-12-31', isActive: false }
      ]
    }
  ],
  'Southern': [
    {
      id: 'ST-LOG-2024',
      name: 'Southern Region Carriers',
      region: 'Southern',
      contact: '+675 345 6789',
      description: 'Current Port Moresby and Southern region provider.',
      batchCount: 18,
      contractPeriods: [
        { startDate: '2024-01-01', endDate: '2024-12-31', isActive: true }
      ]
    },
    {
      id: 'ST-LOG-2023',
      name: 'POM Logistics Solutions',
      region: 'Southern',
      contact: '+675 345 0123',
      description: 'Previous Southern region service provider.',
      batchCount: 167,
      contractPeriods: [
        { startDate: '2023-01-01', endDate: '2023-12-31', isActive: false }
      ]
    }
  ],
  'New Guinea Islands': [
    {
      id: 'NGI-LOG-2024',
      name: 'Islands Freight Solutions',
      region: 'New Guinea Islands',
      contact: '+675 456 7890',
      description: 'Current provider for inter-island distribution.',
      batchCount: 10,
      contractPeriods: [
        { startDate: '2024-01-01', endDate: '2024-12-31', isActive: true }
      ]
    },
    {
      id: 'NGI-LOG-2023',
      name: 'Maritime Logistics PNG',
      region: 'New Guinea Islands',
      contact: '+675 456 1234',
      description: 'Previous Islands region service provider.',
      batchCount: 134,
      contractPeriods: [
        { startDate: '2023-01-01', endDate: '2023-12-31', isActive: false }
      ]
    }
  ]
};