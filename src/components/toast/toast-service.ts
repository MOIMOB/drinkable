export class ToastService {
    public readonly toastElements: ToastElement[] = [];

    /**
     * Adds a toast element to the list of toast elements.
     *
     * @param {CreateToastElementRequest} toastElement - The toast element to be added.
     */
    public addToastElement(toastElement: CreateToastElementRequest) {
        const id = this.generateId();

        this.toastElements.push({
            id,
            ...toastElement
        });

        setTimeout(() => {
            const element = document.getElementById(id);

            this.addTransitionClasses(element);
            this.removeElementAfterDelay(id);
        }, 3500);
    }

    public removeToastElement(id: string) {
        const element = document.getElementById(id);

        this.addTransitionClasses(element);
        this.removeElementAfterDelay(id);
    }

    private generateId(): string {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    private addTransitionClasses(element: HTMLElement | null): void {
        element?.classList.add('transition-opacity');
        element?.classList.add('ease-out');
        element?.classList.add('duration-500');
        element?.classList.add('opacity-0');
    }

    private removeElementAfterDelay(id: string): void {
        setTimeout(() => {
            const index = this.toastElements.findIndex(x => x.id === id);
            if (index !== -1) {
                this.toastElements.splice(index, 1);
            }
        }, 500);
    }
}

export type ToastElement = {
    id: string;
    text: string;
    className: 'alert-info' | 'alert-success' | 'alert-warning' | 'alert-error';
};

export type CreateToastElementRequest = Omit<ToastElement, 'id'>;
