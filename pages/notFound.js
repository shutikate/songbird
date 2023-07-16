import AbstractComponent from '../utils/rendering/AbstractComponent';

export class NotFound extends AbstractComponent {
  prepareLayout () {
    const wrapper = document.createElement('p');
    wrapper.textContent = 'Page not found';
    return wrapper;
  }
}
