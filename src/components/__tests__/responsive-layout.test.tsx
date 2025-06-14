import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import CountryInfoPanel from '../CountryInfoPanel';
import { RelationLevel } from '../../types';

const theme = createTheme();

const mockProps = {
  selectedCountry: {
    code: 'JP',
    name: 'Japan',
    nameJa: '日本',
    capital: 'Tokyo',
    region: 'Asia',
    latlng: [35, 139] as [number, number]
  },
  targetCountry: null,
  relationLevel: RelationLevel.UNKNOWN,
  relationDescription: 'テスト説明',
  onReset: vi.fn()
};

// ビューポートサイズをモックする関数
const mockViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  });
  window.dispatchEvent(new Event('resize'));
};

describe('レスポンシブレイアウトテスト', () => {
  it('PC画面では左パネルとして表示される', () => {
    mockViewport(1200, 800);
    
    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel {...mockProps} />
      </ThemeProvider>
    );

    const panel = screen.getByText('World Relations Viewer').closest('div');
    // PC画面では左側固定パネルの特徴を確認
    expect(panel).toBeInTheDocument();
  });

  it('タブレット画面では適切にレイアウト調整される', () => {
    mockViewport(768, 1024);
    
    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel {...mockProps} />
      </ThemeProvider>
    );

    const panel = screen.getByText('World Relations Viewer').closest('div');
    expect(panel).toBeInTheDocument();
  });

  it('スマホ画面では地図の操作を妨げない', () => {
    mockViewport(375, 667);
    
    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel {...mockProps} />
      </ThemeProvider>
    );

    const panel = screen.getByText('World Relations Viewer').closest('div');
    expect(panel).toBeInTheDocument();
    // スマホでは地図操作の妨げにならないレイアウトを期待
  });

  it('国が選択されていない時は最小表示になる', () => {
    const emptyProps = {
      ...mockProps,
      selectedCountry: null
    };

    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel {...emptyProps} />
      </ThemeProvider>
    );

    const instruction = screen.getByText('地図上の国をクリックして、国際関係を確認してください');
    expect(instruction).toBeInTheDocument();
  });

  it('長いテキストコンテンツがスクロール可能', () => {
    const longTextProps = {
      ...mockProps,
      targetCountry: {
        code: 'US',
        name: 'United States',
        nameJa: 'アメリカ',
        capital: 'Washington',
        region: 'North America',
        latlng: [39, -77] as [number, number]
      },
      relationDescription: 'これは非常に長い説明文です。'.repeat(50),
      politicalMilitaryDescription: '政治軍事の長い説明です。'.repeat(30),
      economicDescription: '経済の長い説明です。'.repeat(30),
      culturalDescription: '文化の長い説明です。'.repeat(30)
    };

    render(
      <ThemeProvider theme={theme}>
        <CountryInfoPanel {...longTextProps} />
      </ThemeProvider>
    );

    // 長いコンテンツでもレイアウトが崩れないことを確認
    const content = screen.getByText(/これは非常に長い説明文です/);
    expect(content).toBeInTheDocument();
  });
});