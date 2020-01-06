import { LightningElement, track } from 'lwc';

export default class Button extends LightningElement {
    @track label = 'Click here!';

    handleClick() {
        this.label = 'Clicked!';
    }

    handleFocus() {
        this.label = 'Focused!';
    }

    handleBlur() {
        this.label = 'Blurred!';
    }
}
