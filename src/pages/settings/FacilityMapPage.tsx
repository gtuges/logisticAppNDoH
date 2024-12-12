import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import { initialFacilities, facilityTypes } from '../../types/facilities';

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY'; // Replace with your API key
const PNG_CENTER = { lat: -6.314993, lng: 143.95555 };

const FacilityMapPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [clusterer, setClusterer] = useState<MarkerClusterer | null>(null);
  const [selectedType, setSelectedType] = useState<number | 'all'>('all');

  useEffect(() => {
    const loader = new Loader({
      apiKey: GOOGLE_MAPS_API_KEY,
      version: 'weekly'
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const mapInstance = new google.maps.Map(mapRef.current, {
          center: PNG_CENTER,
          zoom: 6,
          mapTypeId: 'terrain',
          styles: [
            {
              featureType: 'poi.medical',
              elementType: 'geometry',
              stylers: [{ color: '#c6e2ff' }]
            },
            {
              featureType: 'poi.medical',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#2c5282' }]
            }
          ]
        });

        setMap(mapInstance);
      }
    });
  }, []);

  useEffect(() => {
    if (!map) return;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));
    if (clusterer) clusterer.clearMarkers();

    // Filter facilities based on selected type
    const filteredFacilities = selectedType === 'all'
      ? initialFacilities
      : initialFacilities.filter(f => f.facilityTypeId === selectedType);

    // Create new markers
    const newMarkers = filteredFacilities.map(facility => {
      const facilityType = facilityTypes.find(t => t.id === facility.facilityTypeId);
      
      const marker = new google.maps.Marker({
        position: {
          lat: facility.geoCoordinates.latitude,
          lng: facility.geoCoordinates.longitude
        },
        map,
        title: facility.description,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: '#3182CE',
          fillOpacity: 0.9,
          strokeWeight: 2,
          strokeColor: '#2C5282'
        }
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-bold text-gray-900">${facility.description}</h3>
            <p class="text-sm text-gray-600">${facilityType?.name || 'Unknown Type'}</p>
            <p class="text-xs text-gray-500 mt-1">
              Lat: ${facility.geoCoordinates.latitude.toFixed(4)}<br>
              Lng: ${facility.geoCoordinates.longitude.toFixed(4)}
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setMarkers(newMarkers);

    // Create marker clusterer
    const newClusterer = new MarkerClusterer({
      map,
      markers: newMarkers,
      algorithm: {
        maxZoom: 12,
        gridSize: 60
      }
    });

    setClusterer(newClusterer);
  }, [map, selectedType]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Facility Map</h1>
          <p className="text-gray-600 mt-1">View all facilities across Papua New Guinea</p>
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value === 'all' ? 'all' : Number(e.target.value))}
          className="form-select w-64"
        >
          <option value="all">All Facility Types</option>
          {facilityTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div 
          ref={mapRef} 
          className="w-full h-[calc(100vh-12rem)]"
          style={{ minHeight: '600px' }}
        />
      </div>
    </div>
  );
};

export default FacilityMapPage;