import { createElement } from 'lwc';
import Button from 'x/button';

function createButton(props = {}) {
    const element = createElement('x-button', { is: Button });
    Object.assign(element, props);
    return element;
}

describe('c-button', () => {
    it('should render the label within the <button>', () => {
        const element = createButton();
        document.body.appendChild(element);
        const label = element.shadowRoot
            .querySelector('c-button')
            .shadowRoot.querySelector('button').textContent;
        expect(label).toBe('Click here!');
    });
});
