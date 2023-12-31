import { autoinject, computedFrom } from 'aurelia-framework';
import { ToastElement, ToastService } from './toast-service';

@autoinject
export class ToastContainer {
    constructor(private toastService: ToastService) {}

    removeToast(toast: ToastElement) {
        this.toastService.removeToastElement(toast.id);
    }

    @computedFrom('toastService.toastElements')
    get toasts() {
        return this.toastService.toastElements;
    }
}
