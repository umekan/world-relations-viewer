import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { Country } from '../types';
import { RelationLevel, RelationColors } from '../types';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
  selectedCountry: Country | null;
  onCountrySelect: (country: Country) => void;
  relations: Map<string, RelationLevel>;
}

export default function WorldMap({ selectedCountry, onCountrySelect, relations }: WorldMapProps) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // Load GeoJSON data for world countries
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error('Failed to load geo data:', err));
  }, []);

  const getCountryStyle = (feature: any) => {
    const countryCode = feature.properties.iso_a2 || feature.properties.ISO_A2;
    const relationLevel = relations.get(countryCode) ?? RelationLevel.UNKNOWN;
    
    console.log('Styling country:', {
      name: feature.properties.name,
      code: countryCode,
      relationLevel,
      hasRelation: relations.has(countryCode)
    });
    
    return {
      fillColor: RelationColors[relationLevel],
      weight: selectedCountry?.code === countryCode ? 3 : 1,
      opacity: 1,
      color: selectedCountry?.code === countryCode ? '#1f2937' : '#e5e7eb',
      fillOpacity: 0.7
    };
  };

  const onEachCountry = (feature: any, layer: L.Layer) => {
    if (feature.properties && feature.properties.name) {
      layer.bindTooltip(feature.properties.name);
      
      (layer as L.Path).on({
        click: () => {
          const countryCode = feature.properties.iso_a2 || feature.properties.ISO_A2;
          console.log('Clicked country:', {
            name: feature.properties.name,
            code: countryCode,
            allProperties: feature.properties
          });
          
          const country: Country = {
            code: countryCode,
            name: feature.properties.name,
            nameJa: feature.properties.name, // TODO: Add Japanese names
            capital: '',
            region: feature.properties.subregion || '',
            latlng: [0, 0] // Will be set from geometry
          };
          onCountrySelect(country);
        },
        mouseover: (e: L.LeafletMouseEvent) => {
          const layer = e.target;
          layer.setStyle({
            weight: 2,
            fillOpacity: 0.9
          });
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          const layer = e.target;
          layer.setStyle({
            weight: selectedCountry?.code === feature.properties.iso_a2 ? 3 : 1,
            fillOpacity: 0.7
          });
        }
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[20, 0]}
        zoom={2}
        className="w-full h-full"
        scrollWheelZoom={true}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={getCountryStyle}
            onEachFeature={onEachCountry}
            key={selectedCountry?.code || 'default'}
          />
        )}
      </MapContainer>
    </div>
  );
}