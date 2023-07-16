import AbstractComponent from '../../utils/rendering/AbstractComponent';
import { audioStore } from '../../store/audioStore';

export class AudioPlayer extends AbstractComponent {
  constructor(...args) {
    super(...args);
    this.audio = new Audio();
    this.isPlay = false;
    this.progressInterval;
    this.audio.currentTime = 0;
    this.audioStore = audioStore;
    this.audioStore.observer.attachListener(this.onStartPlaying);
  }

  onDestroy = () => {
    super.onDestroy();
    this.stopHandleTimingOfSong();
  }

  onStartPlaying = () => {
    if (this.isPlay) {
      this.isPlay = false;
      this.playButton.classList.toggle('player__pause');
      this.audio.pause();
    }
  }

  changeVolume = (event) => {
    this.audio.volume = Number(event.target.value) / 100;
    if (Number(event.target.value) && this.volumeButton.classList.contains('volume_mute')) {
      this.volumeButton.classList.remove('volume_mute');
    }
    if (!Number(event.target.value) && !this.volumeButton.classList.contains('volume_mute')) {
      this.volumeButton.classList.add('volume_mute');
    }
    this.volumeProgress.style = `background-image: -webkit-gradient(linear, left top, right top, color-stop(${event.target.value}%, #5dc062), color-stop(${event.target.value}%, #a1a79f));`;
  }

  toggleVolumeButton = () => {
    this.audio.muted = !this.audio.muted;
    if (this.audio.muted) {
      this.volumeButton.classList.add('volume_mute');
      this.volumeProgress.value = 0;
      this.volumeProgress.style = `background-image: -webkit-gradient(linear, left top, right top, color-stop(${this.volumeProgress.value}%, #5dc062), color-stop(${this.volumeProgress.value}%, #a1a79f));`;
    } else {
      this.volumeButton.classList.remove('volume_mute');
      this.volumeProgress.value = this.audio.volume * 100;
      this.volumeProgress.style = `background-image: -webkit-gradient(linear, left top, right top, color-stop(${this.volumeProgress.value}%, #5dc062), color-stop(${this.volumeProgress.value}%, #a1a79f));`;
    }
  }

  handleTimingOfSong = () => {
    if (!this.progressInterval) {
      this.progressInterval = setInterval(this.changeProgress, 500);
    }
  }

  stopHandleTimingOfSong = () => {
    if (this.progressInterval) {
      this.progressInterval = clearInterval(this.progressInterval);
    }
  }

  getTime(num) {
    this.seconds = parseInt(num);
    this.minutes = parseInt(this.seconds / 60);
    this.seconds -= this.minutes * 60;
    return `${String(this.minutes).padStart(2, 0)}:${String(this.seconds % 60).padStart(2, 0)}`;
  }

  changeProgress = () => {
      this.progress.value = this.audio.currentTime / this.audio.duration * 100;
      this.progress.style = `background-image: -webkit-gradient(linear, left top, right top, color-stop(${this.progress.value}%, #5dc062), color-stop(${this.progress.value}%, #a1a79f));`;
      this.currentTime.textContent = this.getTime(this.audio.currentTime);
    }

  changeStateOfProgress = () => {
    this.audio.currentTime = Math.ceil(this.audio.duration) * this.progress.value / 100;
    this.currentTime.textContent = this.getTime(this.audio.currentTime);
    if (Number(this.progress.value) === 100) {
      this.returnInitialState();
    }
    this.changeProgress();
  }

  returnInitialState = () => {
    this.playButton.classList.remove('player__pause');
    this.playButton.classList.add('player__play');
    this.isPlay = false;
    this.stopHandleTimingOfSong();
  }

  togglePlayButton = () => {
    this.playButton.classList.toggle('player__pause');
    if (!this.isPlay) {
      this.audioStore.startPlaying();
    }
    this.isPlay = !this.isPlay;
    this.isPlay ? this.audio.play() : this.audio.pause();
    this.isPlay ? this.handleTimingOfSong() : this.stopHandleTimingOfSong();
  }

  prepareVolume() {
    const playerVolume = document.createElement('div');
    playerVolume.classList.add('player__volume', 'volume');
    this.volumeButton = document.createElement('div');
    this.volumeButton.classList.add('volume__button');
    this.volumeProgress = document.createElement('input');
    this.volumeProgress.type = 'range';
    this.volumeProgress.classList.add('volume__progress');
    this.volumeProgress.addEventListener('input', this.changeVolume);
    this.volumeButton.addEventListener('click', this.toggleVolumeButton);
    playerVolume.append(this.volumeButton, this.volumeProgress);
    this.audio.volume = 0.5;
    return playerVolume;
  }

  prepareTimer() {
    const time = document.createElement('div');
    time.classList.add('player__time');
    this.currentTime = document.createElement('span');
    this.currentTime.textContent = this.getTime(this.audio.currentTime);
    const divider = document.createElement('span');
    divider.textContent = '/';
    const durationTime = document.createElement('span');
    durationTime.textContent = this.getTime(this.audio.duration)
    time.append(this.currentTime, divider, durationTime);
    return time;
  }

  prepareAudio() {
    const player = document.createElement('div');
    player.classList.add('question__player', 'player');
    this.playButton = document.createElement('div');
    this.playButton.classList.add('player__play');
    this.progress = document.createElement('input');
    this.progress.type = 'range';
    this.progress.value = 0;
    this.progress.classList.add('player__progress');
    const timer = this.prepareTimer();
    this.playButton.addEventListener('click', this.togglePlayButton);
    this.progress.addEventListener('input', this.changeStateOfProgress);
    this.audio.addEventListener('ended', this.returnInitialState);
    player.append(this.playButton, this.progress, timer);
    return player;
  }

  prepareLoading () {
    const loading = document.createElement('span');
    loading.classList.add('player__loading')
    loading.textContent = this.localization.getData().loading;
    return loading;
  }

  prepareLayout({ src }) {
    this.audio.src = src;
    const audioWrapper = document.createElement('div');
    audioWrapper.classList.add('audio-wrapper');
    this.loading = this.prepareLoading();
    audioWrapper.append(this.loading);
    this.audio.addEventListener('loadeddata', () => {
      this.loading.remove();
      audioWrapper.append(this.prepareAudio(), this.prepareVolume());
    });
    return audioWrapper;
  }
}


