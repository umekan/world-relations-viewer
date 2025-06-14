import React, { useEffect, useRef } from 'react';

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
  const flagRef = useRef<HTMLSpanElement>(null);
  
  const sizeStyle = {
    small: { width: '1.5em', height: '1.125em' },
    medium: { width: '2em', height: '1.5em' },
    large: { width: '2.5em', height: '1.875em' }
  }[size];
  
  // ダークモード対策を強制的に適用
  useEffect(() => {
    if (flagRef.current) {
      const element = flagRef.current;
      // スタイルを強制的に適用
      element.style.setProperty('filter', 'none', 'important');
      element.style.setProperty('-webkit-filter', 'none', 'important');
      element.style.setProperty('color-scheme', 'light', 'important');
      element.style.setProperty('forced-color-adjust', 'none', 'important');
      
      // MutationObserverで変更を監視
      const observer = new MutationObserver(() => {
        element.style.setProperty('filter', 'none', 'important');
        element.style.setProperty('-webkit-filter', 'none', 'important');
      });
      
      observer.observe(element, {
        attributes: true,
        attributeFilter: ['style', 'class']
      });
      
      return () => observer.disconnect();
    }
  }, [flagClass]);
  
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em' }}>
      {flagClass && (
        <span 
          ref={flagRef}
          className={flagClass} 
          style={{
            ...sizeStyle,
            display: 'inline-block',
            borderRadius: '2px',
            backgroundColor: 'transparent'
          }}
        />
      )}
      <span>{name}</span>
    </span>
  );
};