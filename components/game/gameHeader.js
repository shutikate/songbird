import AbstractComponent  from '../../utils/rendering/AbstractComponent';
import { gameStore } from '../../store/gameStore';

export class GameHeader extends AbstractComponent {
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
    if (newState.score !== prevState.score || newState.level !== prevState.level) {
      this.rerender();
    }
  }

  prepareScore() {
    const score = document.createElement('div');
    score.classList.add('questions__score', 'score');
    const scoreName = document.createElement('p');
    scoreName.classList.add('score__name');
    scoreName.textContent = this.localization.getData().score;
    const scoreNum = document.createElement('div');
    scoreNum.classList.add('score__number');
    scoreNum.textContent = this.gameStore.getState().score;
    score.append(scoreName, scoreNum);
    return score;
  }

  prepareAllQuestions() {
    const indexItem = this.gameStore.getState().level;
    const list = document.createElement('ul');
    list.classList.add('questions__list');
    const localizationData = this.localization.getData().birds;
    for (let i = 0; i < localizationData.length; i++) {
      const listItem = document.createElement('li');
      listItem.classList.add('questions__item');
      if (i === indexItem) {
        listItem.classList.add('item_current');
      }
      listItem.textContent = localizationData[i].question;
      list.append(listItem);
    }
    return list;
  }

  prepareLayout() {
    const questions = document.createElement('div');
    questions.classList.add('questions');
    questions.append(this.prepareScore());
    questions.append(this.prepareAllQuestions());
    return questions;
  }

}