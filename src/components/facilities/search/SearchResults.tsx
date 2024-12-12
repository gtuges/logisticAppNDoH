import React from 'react';
import { MapPin } from 'lucide-react';

interface SearchResult {
  id: number;
  name: string;
  description?: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  onSelect: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return (
      <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200 p-4 text-center text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
      {results.map((result) => (
        <button
          key={result.id}
          type="button"
          onClick={() => onSelect(result)}
          className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-0"
        >
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">{result.name}</div>
              {result.description && (
                <div className="text-xs text-gray-500 mt-0.5">{result.description}</div>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchResults;