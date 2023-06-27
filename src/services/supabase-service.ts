import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactFormModel } from '@moimob/common';

export class SupabaseService {
    private client: SupabaseClient;

    constructor() {
        const supabaseUrl = 'https://raausfwxehchgttjcffm.supabase.co';
        const supabaseKey = process.env.SUPABASE_KEY;
        if (supabaseKey) {
            this.client = createClient(supabaseUrl, supabaseKey);
        }
    }

    async createContactForm(data: ContactFormModel) {
        return await this.client.from('ContactForm').insert([data]);
    }
}
