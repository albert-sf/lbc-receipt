import { createElement } from 'lwc';
import Element from 'c/button';

const createButton = (props = {}) => {
    const element = createElement('c-button', { is: Element });
    Object.assign(element, props);
    document.body.appendChild(element);
    return element;
};

describe('c-button attributes', () => {
    it('should set title attribute on the button', () => {
        const title = 'Click here';
        const element = createButton({ title });

        const btn = element.shadowRoot.querySelector('button');

        expect(btn.getAttribute('title')).toBe(title);
    });
});
