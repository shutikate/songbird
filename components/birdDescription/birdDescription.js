import AbstractComponent  from '../../utils/rendering/AbstractComponent';
import { AudioPlayer } from '../audio/Audio';

export class BirdDescription extends AbstractComponent {
  prepareImg() {
    const { birdData } = this.renderData;
    const image = document.createElement('img');
    image.classList.add('description__image');
    if (birdData !== null) {
      image.src = birdData.image;
    } else {
      image.style.display = 'none';
    }
    return image;
  }

  prepareMediaDescription() {
    const { birdData } = this.renderData;
    const wrapperMediaDescription = document.createElement('div');
    wrapperMediaDescription.classList.add('description__wrapper');
    const nameOfBird = document.createElement('p');
    nameOfBird.classList.add('description__name');
    const playerNameWrapper = document.createElement('div');
    playerNameWrapper.append(nameOfBird)
    this.audioPlayer = new AudioPlayer(playerNameWrapper);
    this.children.push(this.audioPlayer);
    wrapperMediaDescription.append(this.prepareImg(), playerNameWrapper);
    if (birdData) {
      this.audioPlayer.render({ src: birdData.audio });
      nameOfBird.textContent = `${birdData.name} (${birdData.species})`;
    } else {
      nameOfBird.textContent = this.localization.getData().descriptionText;
    }
    return wrapperMediaDescription;
  }


  prepareTextDescription() {
    const { birdData } = this.renderData;
    const textDescription = document.createElement('div');
    textDescription.classList.add('description-text');
    if (birdData) {
      textDescription.textContent = birdData.description;
    } else {
      textDescription.textContent = '';
    }
    return textDescription;
  }

  prepareWrapperDescription() {
    const wrapperDescription = document.createElement('div');
    wrapperDescription.classList.add('description');
    wrapperDescription.append(this.prepareMediaDescription(), this.prepareTextDescription());
    return wrapperDescription;
  }

  prepareLayout() {
    const wrapperDescription = this.prepareWrapperDescription();
    return wrapperDescription;
  }
}