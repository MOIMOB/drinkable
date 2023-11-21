import { autoinject } from 'aurelia-framework';

@autoinject
export class DevToolsService {
    public isDevelopment = false;

    constructor() {
        if (PRODUCTION !== true) {
            document.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.ctrlKey && event.key === '1') {
                    this.isDevelopment = !this.isDevelopment;
                }
            });
        }
    }
}
