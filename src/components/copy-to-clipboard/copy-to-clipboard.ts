import { autoinject, bindable } from 'aurelia-framework';
import { Clipboard } from '@capacitor/clipboard';
@autoinject
export class CopyToClipboard {
    @bindable public name: string;
    public textCopied = false;

    async copyToClipboard() {
        if (this.textCopied === true) {
            return;
        }

        await Clipboard.write({
            string: this.name
        });

        this.textCopied = true;

        setTimeout(() => {
            this.textCopied = false;
        }, 3000);
    }
}
