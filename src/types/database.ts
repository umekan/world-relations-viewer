export interface Database {
  public: {
    Tables: {
      countries: {
        Row: {
          code: string;
          name_en: string;
          name_ja: string | null;
          capital: string | null;
          region: string | null;
          created_at: string;
        };
        Insert: {
          code: string;
          name_en: string;
          name_ja?: string | null;
          capital?: string | null;
          region?: string | null;
          created_at?: string;
        };
        Update: {
          code?: string;
          name_en?: string;
          name_ja?: string | null;
          capital?: string | null;
          region?: string | null;
          created_at?: string;
        };
      };
      relations: {
        Row: {
          id: number;
          country_a: string;
          country_b: string;
          relation_level: number;
          description: string;
          last_updated: string;
          data_source: string | null;
        };
        Insert: {
          country_a: string;
          country_b: string;
          relation_level: number;
          description: string;
          last_updated?: string;
          data_source?: string | null;
        };
        Update: {
          id?: number;
          country_a?: string;
          country_b?: string;
          relation_level?: number;
          description?: string;
          last_updated?: string;
          data_source?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}