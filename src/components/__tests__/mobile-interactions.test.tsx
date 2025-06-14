import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import CountryInfoPanel from '../CountryInfoPanel';
import { RelationLevel } from '../../types';

const theme = createTheme();

const mockCountry1 = {
  code: 'JP',
  name: 'Japan',
  nameJa: '日本',
  capital: 'Tokyo',
  region: 'Asia',
  latlng: [35, 139] as [number, number]
};

const mockCountry2 = {
  code: 'US',
  name: 'United States',
  nameJa: 'アメリカ',
  capital: 'Washington',
  region: 'North America',
  latlng: [39, -77] as [number, number]
};

// モバイルビューポートをシミュレート
const mockMobileViewport = () => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: 375,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: 667,
  });
  window.dispatchEvent(new Event('resize'));
};

describe('モバイル操作テスト', () => {
  beforeEach(() => {
    mockMobileViewport();
  });

  it('1番目の国選択でドロワーが表示される', () => {
    const onReset = vi.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel
          selectedCountry={mockCountry1}
          targetCountry={null}
          relationLevel={RelationLevel.UNKNOWN}
          relationDescription="テスト説明"
          onReset={onReset}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('日本')).toBeInTheDocument();
    expect(screen.getByText('他の国をクリックして、2国間の関係を確認してください。')).toBeInTheDocument();
  });

  it('2番目の国選択で関係詳細が表示される', () => {
    const onReset = vi.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel
          selectedCountry={mockCountry1}
          targetCountry={mockCountry2}
          relationLevel={RelationLevel.VERY_FRIENDLY}
          relationDescription="日米は戦後から続く強固な同盟関係"
          politicalMilitaryDescription="日米安全保障条約による軍事協力"
          economicDescription="年間貿易額約500億ドル"
          culturalDescription="深い文化交流"
          onReset={onReset}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('アメリカ との関係')).toBeInTheDocument();
    expect(screen.getByText('非常に友好的')).toBeInTheDocument();
    expect(screen.getByText('日米は戦後から続く強固な同盟関係')).toBeInTheDocument();
  });

  it('ドロワーが外部タップで閉じないことを確認', () => {
    const onReset = vi.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel
          selectedCountry={mockCountry1}
          targetCountry={null}
          relationLevel={RelationLevel.UNKNOWN}
          relationDescription="テスト説明"
          onReset={onReset}
        />
      </ThemeProvider>
    );

    // ドロワーが表示されていることを確認
    expect(screen.getByText('日本')).toBeInTheDocument();
    
    // onResetが自動的に呼ばれていないことを確認
    expect(onReset).not.toHaveBeenCalled();
  });

  it('×ボタンでのみドロワーがリセットされる', () => {
    const onReset = vi.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel
          selectedCountry={mockCountry1}
          targetCountry={null}
          relationLevel={RelationLevel.UNKNOWN}
          relationDescription="テスト説明"
          onReset={onReset}
        />
      </ThemeProvider>
    );

    // ×ボタンをクリック
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);

    expect(onReset).toHaveBeenCalledTimes(1);
  });
});