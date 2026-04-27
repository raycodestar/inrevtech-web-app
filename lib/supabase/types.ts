export interface Database {
  public: {
    Tables: {
      inquiries: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          phone: string | null;
          service: string | null;
          budget: string | null;
          timeline: string | null;
          message: string;
          type: 'contact' | 'quote';
          status: 'new' | 'in_review' | 'responded' | 'closed';
          created_at: string;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string | null;
          phone?: string | null;
          service?: string | null;
          budget?: string | null;
          timeline?: string | null;
          message: string;
          type: 'contact' | 'quote';
          status?: 'new' | 'in_review' | 'responded' | 'closed';
          created_at?: string;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          status?: 'new' | 'in_review' | 'responded' | 'closed';
          updated_at?: string;
        };
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          is_active: boolean;
          subscribed_at: string;
          unsubscribed_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name?: string | null;
          is_active?: boolean;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
        };
        Update: {
          name?: string | null;
          is_active?: boolean;
          unsubscribed_at?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
