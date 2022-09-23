import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ContactData } from 'domain/models/contact-data';
import { decode } from 'base64-arraybuffer';
import { v4 as uuidv4 } from 'uuid';
import { Cocktail, ExtendedIngredientGroup } from 'domain/entities/cocktail';

export class SupabaseService {
    private client: SupabaseClient;

    constructor() {
        const supabaseUrl = 'https://raausfwxehchgttjcffm.supabase.co';
        const supabaseKey = process.env.SUPABASE_KEY;
        if (supabaseKey) {
            this.client = createClient(supabaseUrl, supabaseKey);
        }
    }

    async createContactForm(data: ContactData) {
        try {
            return await this.client.from('ContactForm').insert([data], { returning: 'minimal' });
        } catch (error) {
            alert(error);
            alert(process.env.SUPABASE_KEY);
        }
    }

    async createCocktailSubmission(
        cocktail: Cocktail,
        extendedIngredientGroup: ExtendedIngredientGroup[],
        email: string
    ) {
        const cocktailCopy = { ...cocktail };

        let imagePath = '';
        if (cocktail.imageSrc) {
            const { data } = await this.client.storage
                .from('cocktail-submission')
                .upload(
                    `public/${cocktailCopy.name}-${uuidv4()}.png`,
                    decode(cocktailCopy.imageSrc.split('base64,')[1]),
                    {
                        contentType: 'image/png',
                    }
                );
            imagePath = data.Key;
        }

        cocktailCopy.imageSrc = null;
        cocktailCopy.ingredientGroups = null;

        const json = {
            cocktail: cocktailCopy,
            ingredientGroup: extendedIngredientGroup,
        };

        const request = {
            email: email,
            imagePath: imagePath,
            json: JSON.stringify(json),
        };

        return await this.client.from('CocktailSubmission').insert([request], { returning: 'minimal' });
    }
}
