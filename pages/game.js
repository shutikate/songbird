import AbstractComponent from '../utils/rendering/AbstractComponent';
import { Footer } from '../components/footer/footer';
import { Header } from '../components/header/header';
import { GameHeader } from '../components/game/gameHeader';
import { GameQuestions } from '../components/game/gameQuestion';
import { GameAnswers } from '../components/game/gameAnswers';
import { NextButton } from '../components/game/nextButton';

export class Game extends AbstractComponent {
  prepareLayout () {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    this.children.push(new Header(wrapper).render());
    const gameWrapper = document.createElement('div');
    gameWrapper.classList.add('game-wrapper');
    this.children.push(new GameHeader(gameWrapper).render());
    this.children.push(new GameQuestions(gameWrapper).render());
    this.children.push(new GameAnswers(gameWrapper).render());
    this.children.push(new NextButton(gameWrapper).render());
    wrapper.append(gameWrapper);
    this.children.push(new Footer(wrapper).render());
    return wrapper;
  }
}
