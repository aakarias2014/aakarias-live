/**
 * Supabase TypeScript types (auto-generated shape).
 *
 * This is a hand-written minimal version matching our schema.
 * For a full auto-generated version, run:
 *   npx supabase gen types typescript --project-id <your-project-id> > src/lib/supabase/types.ts
 */

export type Locale = "hi" | "en";

export interface Database {
  public: {
    Tables: {
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          locale: string;
          source: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          locale?: string;
          source?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          email?: string;
          locale?: string;
          source?: string | null;
          active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      whatsapp_subscribers: {
        Row: {
          id: string;
          phone: string;
          locale: string;
          source: string | null;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          locale?: string;
          source?: string | null;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          phone?: string;
          locale?: string;
          source?: string | null;
          active?: boolean;
          updated_at?: string;
        };
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string | null;
          message: string;
          locale: string;
          user_agent: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject?: string | null;
          message: string;
          locale?: string;
          user_agent?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          status?: string;
        };
        Relationships: [];
      };
      downloads: {
        Row: {
          id: string;
          resource_slug: string;
          title: string;
          kind: string;
          locale: string;
          url: string;
          count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          resource_slug: string;
          title: string;
          kind?: string;
          locale?: string;
          url: string;
          count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          count?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_profiles: {
        Row: {
          id: string;
          full_name: string | null;
          target_exam: "UPSC" | "MPPSC" | "Both";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          target_exam?: "UPSC" | "MPPSC" | "Both";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          full_name?: string | null;
          target_exam?: "UPSC" | "MPPSC" | "Both";
          updated_at?: string;
        };
        Relationships: [];
      };
      bookmarks: {
        Row: {
          id: string;
          user_id: string;
          article_id: string;
          title: string;
          slug: string;
          type: string;
          locale: "hi" | "en";
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          article_id: string;
          title: string;
          slug: string;
          type?: string;
          locale?: "hi" | "en";
          created_at?: string;
        };
        Update: {
          title?: string;
          slug?: string;
          type?: string;
          locale?: "hi" | "en";
        };
        Relationships: [];
      };
      quiz_history: {
        Row: {
          id: string;
          user_id: string;
          article_slug: string;
          score: number;
          total: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          article_slug: string;
          score: number;
          total: number;
          created_at?: string;
        };
        Update: {
          score?: number;
          total?: number;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      upsert_download: {
        Args: {
          p_slug: string;
          p_title: string;
          p_kind: string;
          p_url: string;
          p_locale: string;
        };
        Returns: number;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
