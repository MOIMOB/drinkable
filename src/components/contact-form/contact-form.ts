import { inject, observable, NewInstance } from 'aurelia-framework';
import { ValidationRules, ValidationController } from 'aurelia-validation';
import { Preferences } from '@capacitor/preferences';
import { ContactData } from 'models/contact-data';
import { KeyValue } from 'models/key-value';

@inject(NewInstance.of(ValidationController))
export class ContactForm {
    @observable public selectedReason: string;

    public email = '';
    public message = '';
    public isBusy = false;
    public formSent = false;
    public formSendFailed = false;

    public reasons: string[] = [
        'General Question',
        'Cocktail Request',
        'Feature Request',
        'Language Request',
        'Bug report',
        'Other',
    ];

    constructor(private _controller: ValidationController) {
        ValidationRules.ensure('email')
            .required()
            .email()
            .ensure('selectedReason')
            .required()
            .ensure('message')
            .required()
            .on(this);
    }

    public async submit(): Promise<void> {
        if (this.isBusy === true) {
            return;
        }

        this.isBusy = true;

        const result = await this._controller.validate();
        if (result.valid) {
            const data: ContactData = {
                email: this.email,
                appName: 'Cocktail App',
                messageType: this.selectedReason,
                message: this.message,
                jsonData: await this.getAllFromCapacitorStorage(),
                createdAt: new Date().toISOString(),
            };

            const response = await fetch('https://api.apispreadsheets.com/data/gjO3Qg2eyhqolKgT/', {
                method: 'POST',
                body: JSON.stringify({ data }),
            });

            this.formSent = true;
            this.formSendFailed = !(response.status === 201);
        }
        this.isBusy = false;
    }

    private async getAllFromCapacitorStorage(): Promise<string> {
        const values: KeyValue[] = [];

        const keysResult = await Preferences.keys();

        for (let i = 0; i < keysResult.keys.length; i++) {
            const element = keysResult.keys[i];
            const getResult = await Preferences.get({ key: element });
            values.push({ key: element, value: getResult.value });
        }

        return JSON.stringify(values);
    }
}
