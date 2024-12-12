import { useState, useMemo } from 'react';
import { LogisticsCompany, logisticsCompaniesByRegion } from '../types/logistics';
import { RegionName } from '../types/common';

export const useLogisticsCompanies = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionName | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<LogisticsCompany | null>(null);

  const availableCompanies = useMemo(() => {
    if (!selectedRegion) return [];
    return logisticsCompaniesByRegion[selectedRegion];
  }, [selectedRegion]);

  const handleRegionSelect = (region: RegionName | null) => {
    setSelectedRegion(region);
    setSelectedCompany(null);
  };

  const handleCompanySelect = (company: LogisticsCompany | null) => {
    setSelectedCompany(company);
  };

  return {
    selectedRegion,
    selectedCompany,
    availableCompanies,
    handleRegionSelect,
    handleCompanySelect
  };
};