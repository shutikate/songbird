import AbstractComponent from '../utils/rendering/AbstractComponent';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { gameStore } from '../store/gameStore';

const MAX_SCORE = 30;

export class Results extends AbstractComponent {

  constructor (...args) {
    super(...args);
    this.gameStore = gameStore;
    this.gameStore.observer.attachListener(this.onUpdateGameStore);
  }

  onDestroy() {
    super.onDestroy();
    this.gameStore.observer.detachListener(this.onUpdateGameStore);
  }

  onUpdateGameStore = (newState, prevState) => {
    if (newState.score !== prevState.score) {
      this.rerender();
    }
  }

  restartGame() {
    window.location.href = '#game';
    gameStore.startNewGame();
  }

  prepareResults() {
    const score = this.gameStore.getState().score;
    const localization = this.localization.getData();
    const resultsWrapper = document.createElement('div');
    resultsWrapper.classList.add('results');
    const congratulationText = document.createElement('p');
    congratulationText.classList.add('results__congratulation');
    congratulationText.textContent = localization.congratulation;
    const congratulationDescription = document.createElement('p');
    congratulationDescription.classList.add('results__text');
    congratulationDescription.textContent = score === MAX_SCORE
      ? localization.resultFinishedDescription
      : localization.resultsDescription.replace('{{score}}', score);
    const restartButton = document.createElement('button');
    restartButton.classList.add('results__button');
    restartButton.textContent = localization.tryAgain;
    resultsWrapper.append(congratulationText, congratulationDescription, restartButton);
    restartButton.addEventListener('click', this.restartGame);
    return resultsWrapper;
  }

  prepareLayout () {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    this.children.push(new Header(wrapper).render());
    wrapper.append(this.prepareResults());
    this.children.push(new Footer(wrapper).render());
    return wrapper;
  }
}