import { LightningElement, api } from 'lwc';

/**
 * A clickable element used to perform an action.
 */
export default class CButton extends LightningElement {
    static delegatesFocus = true;

    /**
     * The name for the button element.
     * This value is optional and can be used to identify the button in a callback.
     *
     * @type {string}
     */
    @api name;

    /**
     * The value for the button element.
     * This value is optional and can be used when submitting a form.
     *
     * @type {string}
     */
    @api value;

    /**
     * The text to be displayed inside the button.
     *
     * @type {string}
     */
    @api label;
}

CButton.interopMap = {
    exposeNativeEvent: {
        click: true,
        focus: true,
        blur: true,
    },
};
