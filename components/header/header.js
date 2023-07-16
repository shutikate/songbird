import AbstractComponent from '../../utils/rendering/AbstractComponent';
import logo from '../../assets/img/logo.png';
import { gameStore } from '../../store/gameStore';

export class Header extends AbstractComponent {
  onClickLanguage = () => {
    const currentLanguage = this.localization.getCurrentLanguage();
    this.localization.setCurrentLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
  }

  prepareLogo () {
    const link = document.createElement('a');
    link.classList.add('header__logo', 'logo');
    link.href = '#';
    const img = document.createElement('img');
    img.classList.add('logo__img');
    const logoName = document.createElement('p');
    logoName.classList.add('logo__name');
    const nameColor = document.createElement('span');
    nameColor.classList.add('logo_color');
    nameColor.textContent = 'Bird';
    img.src = logo;
    logoName.textContent = 'Song';
    logoName.append(nameColor);
    link.append(img);
    link.append(logoName);
    return link;
  }

  onClickLink = () => {
    gameStore.startNewGame();
  }

  prepareMenu () {
    this.localization.getData();
    const menu = document.createElement('nav');
    menu.classList.add('header__navigation', 'navigation');
    const list = document.createElement('ul');
    list.classList.add('navigation__list');
    const localizationHeaderData = this.localization.getData().header;
    for (let i = 0; i < localizationHeaderData.length; i++) {
      const listItem = document.createElement('li');
      listItem.classList.add('navigation__item');
      const listLink = document.createElement('a');
      listLink.classList.add('navigation__link');
      listLink.href = localizationHeaderData[i].link;
      listLink.textContent = localizationHeaderData[i].title;
      listLink.addEventListener('click', this.onClickLink);
      listItem.append(listLink);
      list.append(listItem);
      if (`#${new URL(document.URL).hash.slice(1)}` === localizationHeaderData[i].link) {
        listLink.classList.add('navigation_current');
      }
    }
    menu.append(list);
    return menu;
  }

  prepareLanguage () {
    const language = document.createElement('div');
    language.classList.add('header__language');
    language.textContent = this.localization.getData().language;
    language.addEventListener('click', this.onClickLanguage);
    return language;
  }

  prepareLayout () {
    const header = document.createElement('header');
    header.classList.add('header');
    header.append(this.prepareLogo(), this.prepareMenu(), this.prepareLanguage());
    return header;
  }
}



