'use strict';

import { Context } from './constants';

const AudioContext = window.AudioContext || window.webkitAudioContext;

const getAudioState = (audioSource = {}) => (audioSource.context || {} ).state || null;
const isClosed = value => value === Context.State.CLOSED;
const isRunning = value => value === Context.State.RUNNING;
const isSuspended = value => value === Context.State.SUSPENDED;

class Soundwave {
  constructor() {
    this.audioContext = null;

    this.close = this.close.bind(this);
    this.initAudioSource = this.initAudioSource.bind(this);
    this.load = this.load.bind(this);
    this.pause = this.pause.bind(this);
    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
  }

  close() {
    this.audioContext.close();
  }

  initAudioSource() {
    if (this.audioContext) {
      this.audioSource = this.audioContext.createBufferSource();
      this.audioSource.connect(this.audioContext.destination);
      this.audioSource.buffer = this.buffer;
      this.audioSource.start(0);
      const state = getAudioState(this.audioSource);
      if (isSuspended(state)) {
        this.audioContext.resume();
      }
    }
  }

  load(file) {
    this.audioContext = new AudioContext();

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.file = fileReader.result;
    };

    fileReader.readAsArrayBuffer(file);

    fileReader.onloadend = () => {
      this.audioContext.decodeAudioData(this.file, buffer => {
        this.buffer = buffer;
      }, error => {
        console.log(`Error decoding audio: ${error}`);
      });
    };

    fileReader.onerror = () => {
      console.log(fileReader.error);
    };

  }

  pause() {
    const state = getAudioState(this.audioSource);
    if (isRunning(state)) {
      this.audioContext.suspend();
    } else if (isSuspended(state)) {
      this.audioContext.resume();
    }
  }

  play() {
    if (this.audioSource) {
      this.audioSource.disconnect();
    }
    this.initAudioSource();
  }

  stop() {
    const state = getAudioState(this.audioSource);
    if (state) {
      this.audioSource.stop();
      this.audioSource.currentTime = 0;
    }
  }
}

const soundwave = new Soundwave();

export default soundwave;
