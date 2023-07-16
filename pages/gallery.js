import AbstractComponent from '../utils/rendering/AbstractComponent';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { BirdDescription } from '../components/birdDescription/birdDescription';

export class Gallery extends AbstractComponent {
  getAllBirds () {
    const birdsChunks = this.localization.getData().birds;
    return birdsChunks.flatMap(el => el.data);
  }

  prepareLayout () {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    this.children.push(new Header(wrapper).render());
    const allBirds = document.createElement('div');
    allBirds.classList.add('gallery');
    this.getAllBirds().forEach(birdData => this.children.push(new BirdDescription(allBirds).render({ birdData })));
    wrapper.append(allBirds);
    this.children.push(new Footer(wrapper).render());
    return wrapper;
  }
}