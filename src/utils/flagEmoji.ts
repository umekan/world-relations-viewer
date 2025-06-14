/**
 * 国コードから国旗絵文字を取得する関数
 * @param countryCode ISO 3166-1 alpha-2国コード
 * @returns 国旗のUnicode絵文字
 */
export const getFlagEmoji = (countryCode: string): string => {
  if (!countryCode || countryCode.length !== 2) {
    return '🌍'; // デフォルト：地球アイコン
  }
  
  // 特殊ケースの処理
  const specialFlags: Record<string, string> = {
    'UK': '🇬🇧',
    'GB': '🇬🇧',
    'EN': '🏴󠁧󠁢󠁥󠁮󠁧󠁿', // イングランド
    'SC': '🏴󠁧󠁢󠁳󠁣󠁴󠁿', // スコットランド
    'WA': '🏴󠁧󠁢󠁷󠁬󠁳󠁿', // ウェールズ
  };
  
  const upperCode = countryCode.toUpperCase();
  if (specialFlags[upperCode]) {
    return specialFlags[upperCode];
  }
  
  try {
    // ISO 3166-1 alpha-2をUnicode絵文字に変換
    const codePoints = upperCode
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    
    return String.fromCodePoint(...codePoints);
  } catch (error) {
    console.warn(`Failed to generate flag emoji for country code: ${countryCode}`, error);
    return '🌍';
  }
};

/**
 * 国情報と共に国旗を表示するためのフォーマット関数
 * @param country 国情報
 * @returns フォーマットされた国名（国旗 + 国名）
 */
export const formatCountryWithFlag = (country: { code: string; nameJa?: string; name: string }): string => {
  const flag = getFlagEmoji(country.code);
  const name = country.nameJa || country.name;
  return `${flag} ${name}`;
};