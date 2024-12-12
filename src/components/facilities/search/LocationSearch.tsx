import React, { useState, useRef, useEffect } from 'react';
import FormField from '../../common/FormField';
import SearchInput from './SearchInput';
import SearchResults from './SearchResults';

interface LocationSearchProps {
  label: string;
  value: string;
  results: Array<{ id: number; name: string; description?: string }>;
  onSelect: (result: { id: number; name: string }) => void;
  onClear: () => void;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  label,
  value,
  results,
  onSelect,
  onClear,
  placeholder,
  disabled = false,
  required = false
}) => {
  const [search, setSearch] = useState(value);
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearch(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (newValue: string) => {
    setSearch(newValue);
    setShowResults(true);
  };

  const handleResultSelect = (result: { id: number; name: string }) => {
    setSearch(result.name);
    setShowResults(false);
    onSelect(result);
  };

  const handleClear = () => {
    setSearch('');
    onClear();
  };

  return (
    <div ref={containerRef}>
      <FormField label={label} required={required}>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          onClear={handleClear}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
        />
        {showResults && results.length > 0 && (
          <SearchResults
            results={results}
            onSelect={handleResultSelect}
          />
        )}
      </FormField>
    </div>
  );
};

export default LocationSearch;