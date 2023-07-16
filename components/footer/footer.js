import AbstractComponent from '../../utils/rendering/AbstractComponent';
import github from '../../assets/img/github.svg';

export class Footer extends AbstractComponent {

  prepareRsLink () {
    const link = document.createElement('a');
    const img = document.createElement('img');
    img.classList.add('footer__rs');
    link.href = 'https://rs.school/js/';
    img.src = 'https://rs.school/images/rs_school_js.svg';
    link.append(img);
    return link;
  }

  prepareSignature () {
    const signature = document.createElement('p');
    signature.textContent = '2022 © Shutikate';
    return signature;
  }

  prepareGithubLink () {
    const link = document.createElement('a');
    const img = document.createElement('img');
    img.classList.add('footer__github');
    link.href = 'https://github.com/shutikate';
    img.src = github;
    link.append(img);
    return link;
  }

  prepareLayout () {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    footer.append(this.prepareRsLink());
    footer.append(this.prepareSignature());
    footer.append(this.prepareGithubLink());
    return footer;
  }

}
