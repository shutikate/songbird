import { Observer } from '../utils/observer/Observer';
import { localization } from '../utils/localization/Localization';


const MAX_TRIES = 5;

const getRandomItemFromArr = items => items[Math.floor(Math.random()*items.length)];

const prepareInitialState = () => ({
  isFinished: false,
  score: 0,
  level: 0,
  levelState: {
    isFinished: false,
    correctAnswer: getRandomItemFromArr(localization.getData().birds[0].data),
    chosenAnswer: null,
    answers: localization.getData().birds[0].data
  }
});

class GameStore {
  constructor() {
    this.localization = localization;
    localization.observer.attachListener(this.onChangeLanguage);
    this.state = prepareInitialState();
    this.observer = new Observer();
  }

  onChangeLanguage = () => {
    const newAnswers = this.localization.getData().birds[this.state.level].data;
    this.state = {
      ...this.state,
      levelState: {
        ...this.state.levelState,
        chosenAnswer: this.state.levelState.chosenAnswer ? this.localization.getData().birds[this.state.level].data.find(bird => bird.id === this.state.levelState.chosenAnswer.id) : this.state.levelState.chosenAnswer,
        answers: newAnswers.map((newAnswer, id) => ({ ...newAnswer, isChosen: this.state.levelState.answers[id].isChosen })),
        correctAnswer: this.localization.getData().birds[this.state.level].data.find(bird => bird.id === this.state.levelState.correctAnswer.id)
      }
    }
  }

  getState() {
    return this.state;
  }

  updateState(newState) {
    const prevState = this.state;
    this.state = newState;
    this.observer.notifyListeners(newState, prevState);
  }

  nextLevel() {
    const isGameFinished = this.state.level === 5;
    const newState = {
      ...this.state,
      isFinished: isGameFinished,
      level: isGameFinished ? this.state.level : this.state.level + 1,
      levelState: {
        isFinished: isGameFinished,
        correctAnswer: isGameFinished ? this.state.levelState.correctAnswer : getRandomItemFromArr(this.localization.getData().birds[this.state.level + 1].data),
        chosenAnswer: isGameFinished ? this.state.levelState.chosenAnswer : null,
        answers: isGameFinished ? this.state.levelState.answers : this.localization.getData().birds[this.state.level + 1].data
      }
    }
    this.updateState(newState);
  }

  startNewGame() {
    this.updateState(prepareInitialState());
  }

  calculateScoreOnAnswer(answers) {
    const tries = answers.reduce((acc, answer) => answer.isChosen ? acc + 1 : acc, 0);
    const answerScore = MAX_TRIES - tries;
    return this.state.score + answerScore;
  }

  makeAnswer(id) {
    const chosenAnswer = this.state.levelState.answers.find(answer => answer.id === Number(id));
    const isAnswerCorrect = chosenAnswer.id === this.state.levelState.correctAnswer.id;
    const score = isAnswerCorrect && !this.state.levelState.isFinished ? this.calculateScoreOnAnswer(this.state.levelState.answers) : this.state.score;
    const isRoundFinished = this.state.levelState.isFinished || isAnswerCorrect;
    const newState = {
      ...this.state,
      score,
      levelState: {
        ...this.state.levelState,
        isFinished: isRoundFinished,
        chosenAnswer,
        answers: this.state.levelState.answers.map(answer => (answer.id === Number(id) && (!isRoundFinished || isAnswerCorrect)) ? { ...answer, isChosen: true } : answer)
      }
    };
    this.updateState(newState);
    return isAnswerCorrect;
  }
}

export const gameStore = new GameStore();
