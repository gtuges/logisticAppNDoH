import React from 'react';
import { Truck, Calendar } from 'lucide-react';
import { LogisticsCompany } from '../../types/logistics';

interface LogisticsCompanySelectorProps {
  companies: LogisticsCompany[];
  selectedCompany: LogisticsCompany | null;
  onCompanySelect: (company: LogisticsCompany | null) => void;
}

const LogisticsCompanySelector: React.FC<LogisticsCompanySelectorProps> = ({
  companies,
  selectedCompany,
  onCompanySelect
}) => {
  // Separate active and historical companies
  const activeCompany = companies.find(company => 
    company.contractPeriods.some(period => period.isActive)
  );
  
  const historicalCompanies = companies.filter(company => 
    !company.contractPeriods.some(period => period.isActive)
  );

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Logistics Companies</h2>
        <p className="text-sm text-gray-600">Select a logistics company to view its batches</p>
      </div>
      
      <div className="p-4 space-y-6">
        {/* Current Active Provider */}
        {activeCompany && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <h3 className="text-sm font-medium text-gray-900">Current Provider</h3>
            </div>
            <button
              onClick={() => onCompanySelect(selectedCompany?.id === activeCompany.id ? null : activeCompany)}
              className={`
                w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
                ${selectedCompany?.id === activeCompany.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Truck className="w-5 h-5 text-gray-600" />
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{activeCompany.name}</h3>
                  <div className="text-sm text-gray-500">
                    <span>{activeCompany.contact}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {activeCompany.batchCount} batches
              </div>
            </button>
          </div>
        )}

        {/* Historical Providers */}
        {historicalCompanies.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="w-4 h-4 text-gray-400" />
              <h3 className="text-sm font-medium text-gray-900">Historical Providers</h3>
            </div>
            <div className="space-y-3">
              {historicalCompanies.map((company) => (
                <button
                  key={company.id}
                  onClick={() => onCompanySelect(selectedCompany?.id === company.id ? null : company)}
                  className={`
                    w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all
                    ${selectedCompany?.id === company.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-200'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Truck className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{company.name}</h3>
                      <div className="text-sm text-gray-500">
                        <span>{company.contact}</span>
                        <span className="mx-2">•</span>
                        <span>
                          {new Date(company.contractPeriods[0].startDate).getFullYear()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {company.batchCount} batches
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogisticsCompanySelector;