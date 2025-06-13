import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { Country } from '../types';
import { RelationLevel, RelationColors } from '../types';
import { getCountryCodeFromName } from '../data/relations';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
  selectedCountry: Country | null;
  onCountrySelect: (country: Country) => void;
  relations: Map<string, RelationLevel>;
}

export default function WorldMap({ selectedCountry, onCountrySelect, relations }: WorldMapProps) {
  const [geoData, setGeoData] = useState<any>(null);

  useEffect(() => {
    // Load GeoJSON data for world countries with country codes
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(res => res.json())
      .then(data => {
        console.log('GeoJSON sample feature:', data.features[0]);
        setGeoData(data);
      })
      .catch(err => console.error('Failed to load geo data:', err));
  }, []);

  const getCountryStyle = (feature: any) => {
    const props = feature.properties;
    let countryCode = props['ISO3166-1-Alpha-2'] || props.ISO_A2 || props.iso_a2 || props.iso2 || props.code || props.id;
    
    // 国コードが取得できない場合は国名から取得
    if (!countryCode && props.name) {
      countryCode = getCountryCodeFromName(props.name);
    }
    
    const relationLevel = relations.get(countryCode) ?? RelationLevel.UNKNOWN;
    
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
          const props = feature.properties;
          let countryCode = props['ISO3166-1-Alpha-2'] || props.ISO_A2 || props.iso_a2 || props.iso2 || props.code || props.id;
          
          // 国コードが取得できない場合は国名から取得
          if (!countryCode && props.name) {
            countryCode = getCountryCodeFromName(props.name);
          }
          
          console.log('Clicked country:', {
            name: props.name,
            code: countryCode,
            allProperties: props
          });
          
          const country: Country = {
            code: countryCode || props.name, // フォールバックとして国名を使用
            name: props.name,
            nameJa: props.name, // TODO: Add Japanese names
            capital: '',
            region: props.subregion || '',
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
          const props = feature.properties;
          let countryCode = props['ISO3166-1-Alpha-2'] || props.ISO_A2 || props.iso_a2 || props.iso2 || props.code || props.id;
          
          // 国コードが取得できない場合は国名から取得
          if (!countryCode && props.name) {
            countryCode = getCountryCodeFromName(props.name);
          }
          
          layer.setStyle({
            weight: selectedCountry?.code === (countryCode || props.name) ? 3 : 1,
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