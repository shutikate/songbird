import AbstractComponent from '../../utils/rendering/AbstractComponent';
import { gameStore } from '../../store/gameStore';
import { AudioPlayer } from '../audio/Audio';
import cardBack from '../../assets/img/back-card.jpg';

export class GameQuestions extends AbstractComponent {
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
      this.audioPlayer.audio.src = '';
      this.rerender();
    }
  }

  prepareImg() {
    const state = this.gameStore.getState();
    const image = document.createElement('img');
    image.classList.add('question__image');
    if (state.levelState.isFinished) {
      image.src = state.levelState.correctAnswer.image;
    } else {
      image.src = cardBack;
    }
    return image;
  }

  prepareQuestion() {
    const state = this.gameStore.getState();
    const wrapperQuestion = document.createElement('div');
    wrapperQuestion.classList.add('question__wrapper');
    const nameOfBird = document.createElement('p');
    nameOfBird.classList.add('question__name');
    wrapperQuestion.append(nameOfBird);
    this.audioPlayer = new AudioPlayer(wrapperQuestion);
    this.children.push(this.audioPlayer.render({ src: state.levelState.correctAnswer.audio }));
    if (state.levelState.isFinished) {
      nameOfBird.textContent = state.levelState.correctAnswer.name;
    } else {
      nameOfBird.textContent = '* * * * * *';
    }
    return wrapperQuestion;
  }

  prepareLayout() {
    const currentQuestion = document.createElement('div');
    currentQuestion.classList.add('current-question');
    currentQuestion.append(this.prepareImg(), this.prepareQuestion());
    return currentQuestion;
  }
}