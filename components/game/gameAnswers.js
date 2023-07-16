import AbstractComponent  from '../../utils/rendering/AbstractComponent';
import { gameStore } from '../../store/gameStore';
import { AudioPlayer } from '../audio/Audio';
import correct from '../../assets/mp3/correct.mp3';
import wrong from '../../assets/mp3/wrong.mp3';
import { BirdDescription } from '../birdDescription/birdDescription';

export class GameAnswers extends AbstractComponent {
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
    if (
      (newState.levelState.isFinished !== prevState.levelState.isFinished) ||
      (newState.levelState.answers !== prevState.levelState.answers) ||
      (newState.levelState.chosenAnswer !== prevState.levelState.chosenAnswer)
    ) {
      if(this.birdDescription?.audioPlayer?.audio?.src) {
        this.birdDescription.audioPlayer.audio.src = '';
      }
      this.rerender();
    }
  }

  changeCorrectAnswer = (event) => {
    const levelState = this.gameStore.getState().levelState;
    const id = event.target.id;
    if (id) {
      this.gameStore.makeAnswer(event.target.id);
      const isAnswerCorrect = this.gameStore.makeAnswer(event.target.id);
      const audioAnswer = new Audio();
      audioAnswer.volume = 0.5;
      if (isAnswerCorrect && !levelState.isFinished) {
        audioAnswer.src = correct;
        audioAnswer.play();
      } else if (!isAnswerCorrect && !levelState.isFinished) {
        audioAnswer.src = wrong;
        audioAnswer.play();
      } else {
        audioAnswer.src = '';
      }
    }
  }

  prepareAnswers() {
    const levelState = this.gameStore.getState().levelState;
    const answers = document.createElement('div');
    answers.classList.add('answers');
    const answerList = document.createElement('ul');
    answerList.classList.add('answers__list');
    const answersArr = levelState.answers;
    for (let i = 0; i < answersArr.length; i++) {
      const answerItem = document.createElement('li');
      answerItem.classList.add('answers__item');
      answerItem.textContent = answersArr[i].name;
      answerItem.id = answersArr[i].id;
      if (answersArr[i].isChosen) {
        if (answersArr[i].id === levelState.correctAnswer.id) {
          answerItem.classList.add('answer_correct');
        } else {
          answerItem.classList.add('answer_wrong');
        }
      }
      answerList.append(answerItem);
    }
    answerList.addEventListener('click', this.changeCorrectAnswer);
    answers.append(answerList);
    return answers;
  }

  prepareLayout() {
    const answersWrapper = document.createElement('div');
    answersWrapper.classList.add('answers-wrapper');
    answersWrapper.append(this.prepareAnswers());
    this.birdDescription = new BirdDescription(answersWrapper);
    this.children.push(this.birdDescription.render({ birdData: this.gameStore.getState().levelState.chosenAnswer }));

    return answersWrapper;
  }
}