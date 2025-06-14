import React from 'react';

/**
 * 国コードからflag-iconsのCSSクラス名を取得する関数
 * @param countryCode ISO 3166-1 alpha-2国コード
 * @returns flag-iconsのクラス名
 */
export const getFlagClass = (countryCode: string): string => {
  if (!countryCode) {
    return '';
  }
  
  let lowerCode = countryCode.toLowerCase();
  
  // 特別なケースのエイリアス処理
  if (lowerCode === 'uk') {
    lowerCode = 'gb';
  }
  
  return `fi fi-${lowerCode}`;
};

/**
 * React要素として国旗と国名を表示するためのコンポーネント関数
 * @param country 国情報
 * @returns 国旗アイコンと国名を含むReact要素
 */

export const CountryWithFlag: React.FC<{ 
  country: { code: string; nameJa?: string; name: string };
  size?: 'small' | 'medium' | 'large';
}> = ({ country, size = 'small' }) => {
  const flagClass = getFlagClass(country.code);
  const name = country.nameJa || country.name;
  
  const sizeStyle = {
    small: { width: '1em', height: '0.75em' },
    medium: { width: '1.5em', height: '1.125em' },
    large: { width: '2em', height: '1.5em' }
  }[size];
  
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em' }}>
      {flagClass && (
        <span 
          className={flagClass} 
          style={{
            ...sizeStyle,
            display: 'inline-block',
            borderRadius: '2px'
          }}
        />
      )}
      <span>{name}</span>
    </span>
  );
};