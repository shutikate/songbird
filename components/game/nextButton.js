import AbstractComponent from '../../utils/rendering/AbstractComponent';
import { gameStore } from '../../store/gameStore';

export class NextButton extends AbstractComponent {
  constructor(...args) {
    super(...args);
    this.gameStore = gameStore;
    this.gameStore.observer.attachListener(this.onUpdateGameStore);
  }

  onDestroy() {
    super.onDestroy();
    this.gameStore.observer.detachListener(this.onUpdateGameStore);
  }

  onUpdateGameStore = (newState, prevState) => {
    if (newState.levelState.isFinished !== prevState.levelState.isFinished) {
      this.rerender();
    }
  }

  onNextButton = () => {
    this.gameStore.nextLevel();
    const state = this.gameStore.getState();
    if (state.isFinished) {
      window.location.href = '#results';
    }
  }

  prepareLayout() {
    const state = this.gameStore.getState();
    const nextButton = document.createElement('button');
    nextButton.classList.add('next-button');
    nextButton.textContent = this.localization.getData().nextLevel;
    nextButton.disabled = !state.levelState.isFinished;
    nextButton.addEventListener('click', this.onNextButton);
    return nextButton;
  }
}