import { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import type { Country } from '../types';
import { RelationLevel, RelationColors, InitialCountryColors } from '../types';
import { DataService } from '../services/dataService';
import MapLegend from './MapLegend';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
  selectedCountry: Country | null;
  onCountrySelect: (country: Country) => void;
  relations: Map<string, RelationLevel>;
}

export default function WorldMap({ selectedCountry, onCountrySelect, relations }: WorldMapProps) {
  const [geoData, setGeoData] = useState<any>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [countriesWithRelations, setCountriesWithRelations] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load GeoJSON data for world countries with country codes
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(res => res.json())
      .then(data => {
        console.log('GeoJSON sample feature:', data.features[0]);
        setGeoData(data);
      })
      .catch(err => console.error('Failed to load geo data:', err));

    // Load countries from Supabase
    DataService.getAllCountries()
      .then(data => {
        console.log('Countries from Supabase:', data);
        setCountries(data);
      })
      .catch(err => console.error('Failed to load countries from Supabase:', err));

    // Load countries with relation data
    DataService.getCountriesWithRelations()
      .then(data => {
        console.log('Countries with relations:', data);
        setCountriesWithRelations(data);
      })
      .catch(err => console.error('Failed to load countries with relations:', err));
  }, []);

  const getCountryStyle = (feature: any) => {
    const props = feature.properties;
    let countryCode = props['ISO3166-1-Alpha-2'] || props.ISO_A2 || props.iso_a2 || props.iso2 || props.code || props.id;
    
    // 国コードが無効な場合（-99等）や取得できない場合は国名からSupabaseデータを検索
    if (!countryCode || countryCode === '-99' || countryCode === '-1') {
      const country = countries.find(c => 
        c.name === props.name || c.nameJa === props.name
      );
      countryCode = country?.code;
    }
    
    // 選択された国がある場合は関係性に基づく色分け
    if (selectedCountry && relations.size > 0) {
      const relationLevel = relations.get(countryCode) ?? RelationLevel.UNKNOWN;
      return {
        fillColor: RelationColors[relationLevel],
        weight: selectedCountry?.code === countryCode ? 3 : 1,
        opacity: 1,
        color: selectedCountry?.code === countryCode ? '#1e40af' : '#9ca3af', // blue-800 for selected, gray-400 for others
        fillOpacity: 0.7
      };
    }
    
    // 初期状態：関係性データの有無で色分け
    const hasRelationData = countryCode && countriesWithRelations.has(countryCode);
    return {
      fillColor: hasRelationData ? InitialCountryColors.HAS_DATA : InitialCountryColors.NO_DATA,
      weight: hasRelationData ? 2 : 0.8,
      opacity: 1,
      color: hasRelationData ? '#2563eb' : '#9ca3af', // blue-600 for data, gray-400 for no data
      fillOpacity: 0.8 // データありなしに関わらず透明度を統一
    };
  };

  const onEachCountry = (feature: any, layer: L.Layer) => {
    if (feature.properties && feature.properties.name) {
      const props = feature.properties;
      let countryCode = props['ISO3166-1-Alpha-2'] || props.ISO_A2 || props.iso_a2 || props.iso2 || props.code || props.id;
      
      // 国コードが無効な場合（-99等）や取得できない場合は国名からSupabaseデータを検索
      if (!countryCode || countryCode === '-99' || countryCode === '-1') {
        const country = countries.find(c => 
          c.name === props.name || c.nameJa === props.name
        );
        countryCode = country?.code;
      }
      
      // フランスとスペインのデバッグログ
      if (props.name === 'France' || props.name === 'Spain' || props.name === 'フランス' || props.name === 'スペイン') {
        console.log('Debug country mapping:', {
          name: props.name,
          countryCode: countryCode,
          allProps: props,
          foundInDatabase: !!countries.find(c => c.code === countryCode)
        });
      }
      
      // 日本語名を優先してツールチップに表示
      const country = countries.find(c => c.code === countryCode);
      const displayName = country?.nameJa || country?.name || props.name;
      
      layer.bindTooltip(displayName);
      
      (layer as L.Path).on({
        click: () => {
          const props = feature.properties;
          let countryCode = props['ISO3166-1-Alpha-2'] || props.ISO_A2 || props.iso_a2 || props.iso2 || props.code || props.id;
          
          // 国コードが無効な場合（-99等）や取得できない場合は国名からSupabaseデータを検索
          if (!countryCode || countryCode === '-99' || countryCode === '-1') {
            const country = countries.find(c => 
              c.name === props.name || c.nameJa === props.name
            );
            countryCode = country?.code;
          }
          
          console.log('Clicked country:', {
            name: props.name,
            code: countryCode,
            allProperties: props
          });
          
          // フランスとスペインの特別デバッグ
          if (props.name === 'France' || props.name === 'Spain') {
            console.log('FR/ES Debug - Click:', {
              name: props.name,
              extractedCode: countryCode,
              iso2: props.ISO_A2,
              iso3166: props['ISO3166-1-Alpha-2'],
              foundInCountries: !!countries.find(c => c.code === countryCode),
              relationsForCode: countriesWithRelations.has(countryCode || '')
            });
          }
          
          // Supabaseから取得した国データを使用
          const supabaseCountry = countries.find(c => c.code === countryCode);
          
          const country: Country = {
            code: countryCode || props.name, // フォールバックとして国名を使用
            name: supabaseCountry?.name || props.name,
            nameJa: supabaseCountry?.nameJa || props.name,
            capital: supabaseCountry?.capital || '',
            region: supabaseCountry?.region || props.subregion || '',
            latlng: [0, 0] // Will be set from geometry
          };
          onCountrySelect(country);
        },
        mouseover: (e: L.LeafletMouseEvent) => {
          const layer = e.target;
          layer.setStyle({
            weight: 2.5,
            fillOpacity: 0.85,
            color: '#1e40af' // blue-800 on hover
          });
        },
        mouseout: (e: L.LeafletMouseEvent) => {
          const layer = e.target;
          // 元のスタイルを完全に復元するため、getCountryStyleを再実行
          layer.setStyle(getCountryStyle(feature));
        }
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <MapContainer
        center={[30, 0]}
        zoom={2}
        minZoom={1}
        maxZoom={8}
        className="w-full h-full"
        scrollWheelZoom={true}
        worldCopyJump={false}
        maxBounds={[[-60, -170], [85, 170]]}
        maxBoundsViscosity={1.0}
        crs={L.CRS.EPSG3857}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true}
        />
        {geoData && (
          <GeoJSON
            data={geoData}
            style={getCountryStyle}
            onEachFeature={onEachCountry}
            key={`${selectedCountry?.code || 'default'}-${countries.length}-${countriesWithRelations.size}-${relations.size}`}
          />
        )}
        <MapLegend showRelationColors={selectedCountry !== null && relations.size > 0} />
      </MapContainer>
    </div>
  );
}