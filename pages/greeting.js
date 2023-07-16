import AbstractComponent from '../utils/rendering/AbstractComponent';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { gameStore } from '../store/gameStore';

const getRandomItemFromArr = items => items[Math.floor(Math.random()*items.length)];

export class Greeting extends AbstractComponent {
  onDestroy = () => {
    super.onDestroy();
    clearInterval(this.intervalId);
  }

  startGame() {
    window.location.href = '#game';
    gameStore.startNewGame();
  }

  getBirdsForPage() {
    const allBirds = this.localization.getData().birds;
    const birdsChunks = allBirds.flatMap(el => el.data);
    const bird = getRandomItemFromArr(birdsChunks);
    return bird;
  }

  prepareGreeting() {
    const greeting = document.createElement('div');
    greeting.classList.add('greeting');
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image-wrapper');
    const backImg = document.createElement('img');
    backImg.classList.add('greeting__image');
    backImg.src = this.getBirdsForPage().image;
    this.intervalId = setInterval (() => {
      backImg.src = this.getBirdsForPage().image;
    }, 3000);
    const greetingText = document.createElement('div');
    greetingText.classList.add('greeting__text');
    greetingText.innerHTML = this.localization.getData().greeting;
    const startButton = document.createElement('button');
    startButton.classList.add('greeting__button');
    startButton.textContent = this.localization.getData().startGame;
    imageWrapper.append(backImg, greetingText);
    greeting.append(imageWrapper, startButton);
    startButton.addEventListener('click', this.startGame);
    return greeting;
  }

  prepareLayout () {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    this.children.push(new Header(wrapper).render());
    wrapper.append(this.prepareGreeting());
    this.children.push(new Footer(wrapper).render());
    return wrapper;
  }
}