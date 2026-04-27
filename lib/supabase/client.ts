import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function submitInquiry(data: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  type: 'contact' | 'quote';
}) {
  const { error } = await supabase.from('inquiries').insert([
    {
      ...data,
      created_at: new Date().toISOString(),
      status: 'new',
    },
  ]);

  if (error) throw error;
  return { success: true };
}

export async function subscribeToNewsletter(email: string, name?: string) {
  const { error } = await supabase.from('newsletter_subscribers').upsert(
    [
      {
        email,
        name,
        subscribed_at: new Date().toISOString(),
        is_active: true,
      },
    ],
    { onConflict: 'email' }
  );

  if (error) throw error;
  return { success: true };
}
